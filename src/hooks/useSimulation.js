import { useState, useRef, useEffect, useCallback } from 'react';
import { dataCenters, PRIMARY_FACILITY } from '../data/dataCenters';
import {
  FREQ_NOMINAL, FREQ_HIGH, FREQ_LOW,
  TICK_MS, HISTORY_LENGTH, TRIGGER_MAGNITUDE, TRIGGER_DECAY,
  STATUS, EVENT_TYPE,
  DVFS_MIN, DVFS_MAX,
  CAPACITY_PAYMENT_PER_DAY, RESPONSE_EVENT_RATE, REGULATION_RATE_PER_SEC,
} from '../data/constants';

function getStatus(freq) {
  if (freq > FREQ_HIGH || freq < FREQ_LOW) return STATUS.RESPONDING;
  return STATUS.STANDBY;
}

function getEventType(freq) {
  if (freq > FREQ_HIGH) return EVENT_TYPE.SUPPLY;
  if (freq < FREQ_LOW) return EVENT_TYPE.DEMAND;
  return null;
}

// DVFS scaling for flexible racks during DEMAND event
// freq below 59.98 → scale down toward 40%
function getDVFSScale(freq) {
  if (freq >= FREQ_LOW && freq <= FREQ_HIGH) return DVFS_MAX; // 100%
  if (freq > FREQ_HIGH) return DVFS_MAX; // supply → ramp up to 100%
  // demand → scale down proportionally
  const ratio = Math.min(1, (FREQ_LOW - freq) / 0.05);
  return DVFS_MAX - ratio * (DVFS_MAX - DVFS_MIN);
}

// During SUPPLY events, flexible racks ramp up to absorb extra power
function getSupplyScale(freq) {
  if (freq <= FREQ_HIGH) return 0;
  const ratio = Math.min(1, (freq - FREQ_HIGH) / 0.03);
  return ratio; // 0 to 1, fraction of additional absorption
}

function computeFrequency(tick, triggerTick) {
  const t = tick;
  let noise = 0.008 * Math.sin(t / 30)
    + 0.005 * Math.sin(t / 7.3)
    + 0.003 * Math.sin(t / 2.1)
    + 0.002 * Math.sin(t / 13.7)
    + 0.001 * Math.sin(t / 3.3);

  let freq = FREQ_NOMINAL + noise;

  if (triggerTick !== null) {
    const elapsed = (tick - triggerTick);
    if (elapsed >= 0 && elapsed < 40) {
      const offset = TRIGGER_MAGNITUDE * Math.exp(-elapsed / TRIGGER_DECAY);
      freq -= offset;
    }
  }

  return Math.max(59.90, Math.min(60.10, freq));
}

let eventIdCounter = 0;

export function useSimulation() {
  const simRef = useRef({
    tick: 0,
    triggerTick: null,
    frequencyHistory: [],
    events: [],
    prevStatuses: {},
    revenue: {
      capacityPayment: 0,
      responseEvents: 0,
      frequencyRegulation: 0,
      eventCount: 0,
    },
  });

  const [snapshot, setSnapshot] = useState(() => buildSnapshot(simRef.current, FREQ_NOMINAL));

  const triggerEvent = useCallback(() => {
    const sim = simRef.current;
    if (sim.triggerTick !== null && (sim.tick - sim.triggerTick) < 25) return;
    sim.triggerTick = sim.tick;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const sim = simRef.current;
      sim.tick += 1;

      const freq = computeFrequency(sim.tick, sim.triggerTick);
      const status = getStatus(freq);
      const eventType = getEventType(freq);
      const dvfsScale = getDVFSScale(freq);
      const supplyScale = getSupplyScale(freq);

      // Update data centers
      const dcStates = dataCenters.map(dc => {
        const dcStatus = getStatus(freq);
        const dcEventType = getEventType(freq);
        const prevStatus = sim.prevStatuses[dc.id];

        // Calculate current power draw
        let currentDraw;
        if (dcEventType === EVENT_TYPE.DEMAND) {
          currentDraw = dc.committedMW + dc.flexibleMW * dvfsScale;
        } else if (dcEventType === EVENT_TYPE.SUPPLY) {
          currentDraw = dc.committedMW + dc.flexibleMW * (1 + supplyScale * 0.2);
        } else {
          currentDraw = dc.totalMW;
        }

        const mwChange = currentDraw - dc.totalMW;

        // Generate event on status transition
        if (prevStatus && prevStatus !== dcStatus && dcStatus === STATUS.RESPONDING) {
          sim.events.unshift({
            id: ++eventIdCounter,
            timestamp: new Date(),
            dcId: dc.id,
            dcName: dc.name,
            zone: dc.zone,
            eventType: dcEventType,
            frequency: freq,
            dvfsScale,
            mwChange: Math.abs(mwChange).toFixed(1),
            action: dcEventType === EVENT_TYPE.DEMAND
              ? `Scaled to ${Math.round(dvfsScale * 100)}%`
              : `Ramped to ${Math.round((1 + supplyScale * 0.2) * 100)}%`,
          });
          if (sim.events.length > 50) sim.events.length = 50;
          sim.revenue.eventCount += 1;
          sim.revenue.responseEvents += RESPONSE_EVENT_RATE;
        }

        sim.prevStatuses[dc.id] = dcStatus;

        return {
          ...dc,
          status: dcStatus,
          eventType: dcEventType,
          dvfsScale,
          currentDraw: +currentDraw.toFixed(2),
          mwChange: +mwChange.toFixed(2),
          responseLatency: 80 + Math.floor(Math.random() * 40),
        };
      });

      // Revenue accumulation
      sim.revenue.capacityPayment = (CAPACITY_PAYMENT_PER_DAY / 86400) * sim.tick;
      if (status === STATUS.RESPONDING) {
        sim.revenue.frequencyRegulation += REGULATION_RATE_PER_SEC;
      }

      // Frequency history
      sim.frequencyHistory.push({ time: sim.tick, value: freq });
      if (sim.frequencyHistory.length > HISTORY_LENGTH) {
        sim.frequencyHistory.shift();
      }

      const isEventActive = sim.triggerTick !== null && (sim.tick - sim.triggerTick) < 25;

      setSnapshot({
        tick: sim.tick,
        frequency: freq,
        status,
        eventType,
        dvfsScale,
        frequencyHistory: [...sim.frequencyHistory],
        dataCenters: dcStates,
        events: [...sim.events],
        isEventActive,
        totalFlexibleMW: dcStates.reduce((sum, dc) => sum + dc.flexibleMW, 0),
        totalCapacityMW: dcStates.reduce((sum, dc) => sum + dc.totalMW, 0),
        totalCurrentDraw: dcStates.reduce((sum, dc) => sum + dc.currentDraw, 0),
        revenue: { ...sim.revenue },
        primaryFacility: dcStates.find(dc => dc.id === PRIMARY_FACILITY),
        avgResponseLatency: Math.round(
          dcStates.reduce((sum, dc) => sum + dc.responseLatency, 0) / dcStates.length
        ),
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  return { ...snapshot, triggerEvent };
}

function buildSnapshot(sim, freq) {
  return {
    tick: 0,
    frequency: freq,
    status: STATUS.STANDBY,
    eventType: null,
    dvfsScale: 1.0,
    frequencyHistory: [],
    dataCenters: dataCenters.map(dc => ({
      ...dc,
      status: STATUS.STANDBY,
      eventType: null,
      dvfsScale: 1.0,
      currentDraw: dc.totalMW,
      mwChange: 0,
      responseLatency: 0,
    })),
    events: [],
    isEventActive: false,
    totalFlexibleMW: dataCenters.reduce((sum, dc) => sum + dc.flexibleMW, 0),
    totalCapacityMW: dataCenters.reduce((sum, dc) => sum + dc.totalMW, 0),
    totalCurrentDraw: dataCenters.reduce((sum, dc) => sum + dc.totalMW, 0),
    revenue: { capacityPayment: 0, responseEvents: 0, frequencyRegulation: 0, eventCount: 0 },
    primaryFacility: { ...dataCenters.find(dc => dc.id === PRIMARY_FACILITY), status: STATUS.STANDBY, eventType: null, dvfsScale: 1.0, currentDraw: 50, mwChange: 0, responseLatency: 0 },
    avgResponseLatency: 0,
  };
}
