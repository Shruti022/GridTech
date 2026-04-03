import MetricCard from '../MetricCard';
import { STATUS_COLORS } from '../../data/constants';

export default function GridStats({ frequency, status, totalCurtailedMW, facilities, avgResponseLatency }) {
  const respondingCount = facilities.filter(f => f.status !== 'NOMINAL').length;
  const freqColor = STATUS_COLORS[status];

  return (
    <div className="grid grid-cols-4 gap-3">
      <MetricCard
        label="Grid Frequency"
        value={frequency.toFixed(3)}
        unit="Hz"
        color={freqColor}
      />
      <MetricCard
        label="Total Curtailed"
        value={totalCurtailedMW.toFixed(1)}
        unit="MW"
        color={totalCurtailedMW > 0 ? '#f59e0b' : '#22c55e'}
      />
      <MetricCard
        label="Facilities Responding"
        value={`${respondingCount} / ${facilities.length}`}
        color={respondingCount > 0 ? '#f59e0b' : '#22c55e'}
        subtext={respondingCount > 0 ? 'ACTIVE RESPONSE' : 'ALL NOMINAL'}
      />
      <MetricCard
        label="Avg Response Latency"
        value={avgResponseLatency}
        unit="ms"
        color="#e0e0e8"
        subtext="SIMULATED"
      />
    </div>
  );
}
