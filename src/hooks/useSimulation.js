import { useState, useRef, useEffect, useCallback } from 'react';
import { facilities as facilityDefs, FACILITY_PRIMARY } from '../data/facilities';
import {
  FREQ_NOMINAL, FREQ_HIGH, FREQ_LOW, FREQ_CRITICAL,
  TICK_MS, HISTORY_LENGTH, TRIGGER_MAGNITUDE, TRIGGER_DECAY,
  STATUS, STATUS_COLORS,
  MINING_REVENUE_PER_SEC, GRID_SERVICE_PER_MW_SEC,
  BATTERY_INITIAL, BATTERY_DRAIN_CURTAILING, BATTERY_DRAIN_SHEDDING,
  BATTERY_RECHARGE, BATTERY_MIN, BATTERY_MAX,
} from '../data/constants';

function getStatus(freq) {
  if (freq > FREQ_HIGH) return STATUS.ABSORBING;
  if (freq >= FREQ_LOW) return STATUS.NOMINAL;
  if (freq >= FREQ_CRITICAL) return STATUS.CURTAILING;
  return STATUS.SHEDDING;
}

function getCurtailmentMW(flexibleMW, freq) {
  if (freq >= FREQ_LOW) return 0;
  if (freq >= FREQ_CRITICAL) {
    const ratio = (FREQ_LOW - freq) / (FREQ_LOW - FREQ_CRITICAL);
    return flexibleMW * 0.5 * ratio;
  }
  const ratio = Math.min(1, (FREQ_CRITICAL - freq) / 0.03);
  return flexibleMW * (0.5 + 0.5 * ratio);
}

function getAbsorptionMW(flexibleMW, freq) {
  if (freq <= FREQ_HIGH) return 0;
  const ratio = Math.min(1, (freq - FREQ_HIGH) / 0.03);
  return flexibleMW * ratio;
}

function computeFrequency(tick, triggerTick) {
  const t = tick;
  let noise = 0.008 * Math.sin(t / 30)
    + 0.005 * Math.sin(t / 7.3)
    + 0.003 * Math.sin(t / 2.1)
    + 0.002 * Math.sin(t / 13.7)
    + 0.001 * Math.sin(t / 3.3);

  let freq = FREQ_NOMINAL + noise;

  // Apply trigger event decay
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
    earnings: { gridRevenue: 0, miningLost: 0 },
    battery: BATTERY_INITIAL,
  });

  const [snapshot, setSnapshot] = useState(() => buildSnapshot(simRef.current, FREQ_NOMINAL));

  const triggerEvent = useCallback(() => {
    const sim = simRef.current;
    if (sim.triggerTick !== null && (sim.tick - sim.triggerTick) < 25) return; // cooldown
    sim.triggerTick = sim.tick;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const sim = simRef.current;
      sim.tick += 1;

      const freq = computeFrequency(sim.tick, sim.triggerTick);
      const status = getStatus(freq);

      // Update facilities
      const facilityStates = facilityDefs.map(f => {
        const curtailedMW = getCurtailmentMW(f.flexibleMW, freq);
        const absorptionMW = getAbsorptionMW(f.flexibleMW, freq);
        const currentLoad = f.totalMW - curtailedMW + absorptionMW;
        const facilityStatus = getStatus(freq);
        const prevStatus = sim.prevStatuses[f.id];

        // Generate event on status transition
        if (prevStatus && prevStatus !== facilityStatus) {
          sim.events.unshift({
            id: ++eventIdCounter,
            timestamp: new Date(),
            facilityId: f.id,
            facilityName: f.name,
            fromStatus: prevStatus,
            toStatus: facilityStatus,
            mwChange: facilityStatus === STATUS.NOMINAL ? curtailedMW : -curtailedMW,
            frequency: freq,
          });
          if (sim.events.length > 50) sim.events.length = 50;
        }

        sim.prevStatuses[f.id] = facilityStatus;

        return {
          ...f,
          status: facilityStatus,
          statusColor: STATUS_COLORS[facilityStatus],
          curtailedMW,
          absorptionMW,
          currentLoad,
          responseLatency: 200 + Math.floor(Math.random() * 300),
        };
      });

      // Update primary facility earnings & battery
      const primary = facilityStates.find(f => f.id === FACILITY_PRIMARY);
      if (primary) {
        const curtailRatio = primary.curtailedMW / primary.flexibleMW;
        const miningRevenue = MINING_REVENUE_PER_SEC * (1 - curtailRatio * 0.8);
        const gridRevenue = GRID_SERVICE_PER_MW_SEC * primary.curtailedMW;
        sim.earnings.gridRevenue += gridRevenue;
        sim.earnings.miningLost += MINING_REVENUE_PER_SEC * curtailRatio * 0.8;

        // Battery
        if (primary.status === STATUS.SHEDDING) {
          sim.battery = Math.max(BATTERY_MIN, sim.battery - BATTERY_DRAIN_SHEDDING);
        } else if (primary.status === STATUS.CURTAILING) {
          sim.battery = Math.max(BATTERY_MIN, sim.battery - BATTERY_DRAIN_CURTAILING);
        } else {
          sim.battery = Math.min(BATTERY_MAX, sim.battery + BATTERY_RECHARGE);
        }
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
        frequencyHistory: [...sim.frequencyHistory],
        facilities: facilityStates,
        events: [...sim.events],
        triggerEvent: null, // placeholder, overwritten below
        isEventActive,
        totalCurtailedMW: facilityStates.reduce((sum, f) => sum + f.curtailedMW, 0),
        totalAbsorptionMW: facilityStates.reduce((sum, f) => sum + f.absorptionMW, 0),
        earnings: { ...sim.earnings },
        battery: sim.battery,
        avgResponseLatency: Math.round(
          facilityStates.reduce((sum, f) => sum + f.responseLatency, 0) / facilityStates.length
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
    status: STATUS.NOMINAL,
    frequencyHistory: [],
    facilities: facilityDefs.map(f => ({
      ...f,
      status: STATUS.NOMINAL,
      statusColor: STATUS_COLORS[STATUS.NOMINAL],
      curtailedMW: 0,
      absorptionMW: 0,
      currentLoad: f.totalMW,
      responseLatency: 0,
    })),
    events: [],
    isEventActive: false,
    totalCurtailedMW: 0,
    totalAbsorptionMW: 0,
    earnings: { gridRevenue: 0, miningLost: 0 },
    battery: BATTERY_INITIAL,
    avgResponseLatency: 0,
  };
}
