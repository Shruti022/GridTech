import MetricCard from '../MetricCard';
import FrequencyChart from '../FrequencyChart';
import BatteryGauge from './BatteryGauge';
import EarningsPanel from './EarningsPanel';
import PowerAllocation from './PowerAllocation';
import ActivityLog from './ActivityLog';
import { STATUS_COLORS } from '../../data/constants';

export default function FacilityDashboard({
  frequency, status, frequencyHistory, facilities, events,
  earnings, battery, triggerEvent, isEventActive,
}) {
  const facility = facilities.find(f => f.id === 'coinmint');
  if (!facility) return null;

  const facilityEvents = events.filter(e => e.facilityId === 'coinmint');
  const freqColor = STATUS_COLORS[status];

  return (
    <div className="flex flex-col gap-3 p-4 flex-1 overflow-hidden">
      {/* Facility header */}
      <div className="flex items-center justify-between bg-grid-surface border border-grid-border rounded-sm px-4 py-3">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-lg font-mono font-bold text-grid-text">{facility.name}</h2>
            <span className="text-[10px] font-mono text-grid-dim uppercase tracking-wider">
              Zone {facility.zone} | {facility.totalMW} MW Capacity | {facility.flexibleMW} MW Flexible
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: freqColor, boxShadow: `0 0 8px ${freqColor}` }}
          />
          <span className="font-mono text-sm" style={{ color: freqColor }}>
            {facility.status}
          </span>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard
          label="Current Load"
          value={facility.currentLoad.toFixed(1)}
          unit="MW"
          color={freqColor}
        />
        <MetricCard
          label="Grid Revenue (Session)"
          value={`$${earnings.gridRevenue.toFixed(2)}`}
          color="#00ff88"
        />
        <MetricCard
          label="Net Gain"
          value={`$${(earnings.gridRevenue - earnings.miningLost).toFixed(2)}`}
          color={(earnings.gridRevenue - earnings.miningLost) >= 0 ? '#00ff88' : '#ef4444'}
        />
        <MetricCard
          label="Battery"
          value={`${battery.toFixed(1)}%`}
          color={battery > 60 ? '#22c55e' : battery > 30 ? '#f59e0b' : '#ef4444'}
          subtext={facility.status === 'NOMINAL' || facility.status === 'ABSORBING' ? 'CHARGING' : 'DISCHARGING'}
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-5 gap-3 flex-1 min-h-0">
        {/* Left - 3/5 */}
        <div className="col-span-3 flex flex-col gap-3">
          <FrequencyChart data={frequencyHistory} height={180} />
          <PowerAllocation facility={facility} />
        </div>

        {/* Right - 2/5 */}
        <div className="col-span-2 flex flex-col gap-3">
          <BatteryGauge battery={battery} status={facility.status} />
          <EarningsPanel earnings={earnings} />
          <ActivityLog events={facilityEvents} />
        </div>
      </div>

      {/* Trigger button */}
      <button
        onClick={triggerEvent}
        disabled={isEventActive}
        className={`
          w-full py-3 rounded-sm font-mono text-sm uppercase tracking-wider
          border-2 transition-all cursor-pointer
          ${isEventActive
            ? 'border-red-900 text-red-900 bg-red-950/20 cursor-not-allowed'
            : 'border-red-600 text-red-500 bg-red-950/30 hover:bg-red-950/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
          }
        `}
      >
        {isEventActive ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            EVENT IN PROGRESS
          </span>
        ) : (
          'TRIGGER FREQUENCY EVENT'
        )}
      </button>
    </div>
  );
}
