import MetricCard from '../MetricCard';
import { STATUS } from '../../data/constants';

export default function GridStats({ frequency, status, totalFlexibleMW, totalCapacityMW, totalCurrentDraw, dataCenters, avgResponseLatency }) {
  const respondingCount = dataCenters.filter(dc => dc.status === STATUS.RESPONDING).length;
  const freqColor = status === STATUS.RESPONDING ? '#f59e0b' : '#3b82f6';

  return (
    <div className="grid grid-cols-5 gap-3">
      <MetricCard
        label="Grid Frequency"
        value={frequency.toFixed(3)}
        unit="Hz"
        color={freqColor}
      />
      <MetricCard
        label="Flexible Capacity"
        value={totalFlexibleMW.toFixed(0)}
        unit="MW"
        color="#3b82f6"
        subtext={`of ${totalCapacityMW} MW total`}
      />
      <MetricCard
        label="Current Draw"
        value={totalCurrentDraw.toFixed(1)}
        unit="MW"
        color={status === STATUS.RESPONDING ? '#f59e0b' : '#22c55e'}
      />
      <MetricCard
        label="DCs Responding"
        value={`${respondingCount} / ${dataCenters.length}`}
        color={respondingCount > 0 ? '#f59e0b' : '#22c55e'}
        subtext={respondingCount > 0 ? 'ACTIVE RESPONSE' : 'ALL STANDBY'}
      />
      <MetricCard
        label="Response Latency"
        value={avgResponseLatency}
        unit="ms"
        color="#e0e0e8"
        subtext="AVG ACROSS FLEET"
      />
    </div>
  );
}
