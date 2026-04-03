export default function BatteryGauge({ battery, status }) {
  const color = battery > 60 ? '#22c55e' : battery > 30 ? '#f59e0b' : '#ef4444';
  const segments = 20;
  const filledSegments = Math.round((battery / 100) * segments);

  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm p-4">
      <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
        UPS Battery Status
      </span>

      <div className="flex items-center gap-4 mt-3">
        {/* Battery visual */}
        <div className="flex flex-col-reverse gap-[2px] w-12">
          {Array.from({ length: segments }, (_, i) => (
            <div
              key={i}
              className="h-2 rounded-[1px] transition-all duration-300"
              style={{
                backgroundColor: i < filledSegments ? color : '#1e1e2e',
                boxShadow: i < filledSegments ? `0 0 4px ${color}40` : 'none',
              }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <span
            className="text-3xl font-mono font-bold tabular-nums"
            style={{ color }}
          >
            {battery.toFixed(1)}%
          </span>
          <span className="text-[10px] font-mono text-grid-dim uppercase">
            {status === 'SHEDDING' ? 'DISCHARGING - FAST' :
             status === 'CURTAILING' ? 'DISCHARGING' :
             'CHARGING'}
          </span>
          <span className="text-[10px] font-mono text-grid-dim">
            {status === 'NOMINAL' || status === 'ABSORBING' ? '+0.3%/s' :
             status === 'CURTAILING' ? '-0.5%/s' : '-1.5%/s'}
          </span>
        </div>
      </div>
    </div>
  );
}
