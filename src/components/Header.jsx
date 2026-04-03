import { STATUS } from '../data/constants';

export default function Header({ frequency, status, eventType, view, onViewChange, triggerEvent, isEventActive }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-grid-surface border-b border-grid-border relative z-10">
      {/* Brand */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-semibold tracking-wide text-grid-text">HIVEMIND</span>
        </div>
        <span className="text-[10px] font-mono text-grid-dim uppercase tracking-[0.15em]">
          AI Grid Coordination
        </span>
      </div>

      {/* Frequency display */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-grid-dim uppercase">FREQ</span>
          <span className={`text-xl font-mono font-bold ${
            status === STATUS.RESPONDING ? 'text-status-responding' : 'text-accent'
          }`}>
            {frequency.toFixed(3)}
            <span className="text-xs text-grid-dim ml-1">Hz</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${
            status === STATUS.RESPONDING ? 'bg-status-responding animate-pulse' : 'bg-accent'
          }`} />
          <span className={`text-[11px] font-mono font-medium ${
            status === STATUS.RESPONDING ? 'text-status-responding' : 'text-accent'
          }`}>
            {status}
          </span>
          {eventType && (
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm ${
              eventType === 'SUPPLY' ? 'bg-event-supply/20 text-event-supply' : 'bg-event-demand/20 text-event-demand'
            }`}>
              {eventType}
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={triggerEvent}
          disabled={isEventActive}
          className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border rounded-sm transition-colors ${
            isEventActive
              ? 'border-grid-border text-grid-dim cursor-not-allowed'
              : 'border-event-demand text-event-demand hover:bg-event-demand/10 cursor-pointer'
          }`}
        >
          {isEventActive ? 'Event Active' : 'Trigger Demand'}
        </button>

        <div className="flex border border-grid-border rounded-sm overflow-hidden">
          <button
            onClick={() => onViewChange('grid')}
            className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              view === 'grid'
                ? 'bg-accent text-grid-bg'
                : 'text-grid-dim hover:text-grid-text'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => onViewChange('facility')}
            className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              view === 'facility'
                ? 'bg-accent text-grid-bg'
                : 'text-grid-dim hover:text-grid-text'
            }`}
          >
            Facility
          </button>
        </div>
      </div>
    </header>
  );
}
