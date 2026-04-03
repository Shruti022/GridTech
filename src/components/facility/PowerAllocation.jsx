import { TOTAL_CAPACITY_MW, COMMITTED_MW, FLEXIBLE_MW, STATUS } from '../../data/constants';

export default function PowerDisplay({ primaryFacility }) {
  const currentDraw = primaryFacility?.currentDraw || TOTAL_CAPACITY_MW;
  const dvfsScale = primaryFacility?.dvfsScale || 1.0;
  const flexibleDraw = FLEXIBLE_MW * dvfsScale;
  const isResponding = primaryFacility?.status === STATUS.RESPONDING;

  const committedPct = (COMMITTED_MW / TOTAL_CAPACITY_MW) * 100;
  const flexiblePct = (flexibleDraw / TOTAL_CAPACITY_MW) * 100;

  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm p-4">
      <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
        Power Allocation
      </span>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-2xl font-mono font-bold tabular-nums text-grid-text">
          {currentDraw.toFixed(1)}
        </span>
        <span className="text-xs font-mono text-grid-dim">MW current draw</span>
      </div>

      {/* Stacked bar */}
      <div className="mt-3 h-6 flex rounded-sm overflow-hidden bg-grid-bg">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${committedPct}%`,
            backgroundColor: '#6366f1',
          }}
        />
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${flexiblePct}%`,
            backgroundColor: isResponding ? '#f59e0b' : '#3b82f6',
          }}
        />
      </div>

      {/* Legend */}
      <div className="mt-2 grid grid-cols-4 gap-2 text-[10px] font-mono">
        <div className="flex flex-col gap-0.5">
          <span className="text-grid-dim">Total Capacity</span>
          <span className="text-grid-text font-bold">{TOTAL_CAPACITY_MW} MW</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-grid-dim">Committed</span>
          <span className="text-committed font-bold">{COMMITTED_MW} MW</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-grid-dim">Flexible</span>
          <span className="text-accent font-bold">{FLEXIBLE_MW} MW</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-grid-dim">Current Draw</span>
          <span className={`font-bold ${isResponding ? 'text-status-responding' : 'text-grid-text'}`}>
            {currentDraw.toFixed(1)} MW
          </span>
        </div>
      </div>
    </div>
  );
}
