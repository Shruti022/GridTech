import { STATUS_COLORS } from '../data/constants';

export default function Header({ frequency, status, view, onViewChange }) {
  const freqColor = STATUS_COLORS[status] || '#e0e0e8';

  return (
    <header className="border-b border-grid-border bg-grid-surface px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-mono font-bold tracking-tight">
          <span className="text-accent">GRID</span>
          <span className="text-grid-text">SHIFT</span>
        </h1>
        <div className="flex items-center gap-2 border-l border-grid-border pl-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
            FREQ
          </span>
          <span
            className="text-lg font-mono font-bold tabular-nums"
            style={{ color: freqColor }}
          >
            {frequency.toFixed(3)}
          </span>
          <span className="text-xs font-mono text-grid-dim">Hz</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: freqColor,
              boxShadow: `0 0 8px ${freqColor}`,
            }}
          />
          <span
            className="text-[10px] font-mono uppercase tracking-[0.15em]"
            style={{ color: freqColor }}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-grid-bg rounded-sm border border-grid-border overflow-hidden">
          <button
            onClick={() => onViewChange('grid')}
            className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              view === 'grid'
                ? 'bg-grid-surface text-accent'
                : 'text-grid-dim hover:text-grid-text'
            }`}
          >
            Grid Operator
          </button>
          <button
            onClick={() => onViewChange('facility')}
            className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border-l border-grid-border ${
              view === 'facility'
                ? 'bg-grid-surface text-accent'
                : 'text-grid-dim hover:text-grid-text'
            }`}
          >
            Facility
          </button>
        </div>
        <span className="text-xs font-mono text-grid-dim tabular-nums">
          {new Date().toLocaleTimeString('en-US', { hour12: false })}
        </span>
      </div>
    </header>
  );
}
