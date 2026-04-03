export default function PowerAllocation({ facility }) {
  const mining = facility.currentLoad - facility.absorptionMW;
  const curtailed = facility.curtailedMW;
  const absorption = facility.absorptionMW;
  const total = facility.totalMW + facility.absorptionMW;

  const miningPct = (mining / total) * 100;
  const curtailedPct = (curtailed / total) * 100;
  const absorptionPct = (absorption / total) * 100;

  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm p-4">
      <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
        Power Allocation
      </span>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-2xl font-mono font-bold tabular-nums text-grid-text">
          {facility.currentLoad.toFixed(1)}
        </span>
        <span className="text-xs font-mono text-grid-dim">MW current load</span>
      </div>

      {/* Stacked bar */}
      <div className="mt-3 h-6 flex rounded-sm overflow-hidden bg-grid-bg">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${miningPct}%`,
            backgroundColor: '#22c55e',
          }}
        />
        {curtailedPct > 0 && (
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${curtailedPct}%`,
              backgroundColor: '#f59e0b',
            }}
          />
        )}
        {absorptionPct > 0 && (
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${absorptionPct}%`,
              backgroundColor: '#3b82f6',
            }}
          />
        )}
      </div>

      {/* Legend */}
      <div className="mt-2 flex gap-4 text-[10px] font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-status-nominal rounded-sm" />
          Mining: {mining.toFixed(1)} MW
        </span>
        {curtailed > 0 && (
          <span className="flex items-center gap-1.5 text-status-curtailing">
            <span className="w-2 h-2 bg-status-curtailing rounded-sm" />
            Curtailed: {curtailed.toFixed(1)} MW
          </span>
        )}
        {absorption > 0 && (
          <span className="flex items-center gap-1.5 text-status-absorbing">
            <span className="w-2 h-2 bg-status-absorbing rounded-sm" />
            Absorbing: {absorption.toFixed(1)} MW
          </span>
        )}
      </div>
    </div>
  );
}
