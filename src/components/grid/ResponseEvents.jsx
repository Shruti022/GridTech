import { EVENT_TYPE_COLORS } from '../../data/constants';

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function EventLog({ events }) {
  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm flex flex-col flex-1 min-h-0">
      <div className="px-4 py-2.5 border-b border-grid-border shrink-0">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
          Event Log
        </span>
      </div>
      <div className="overflow-y-auto flex-1 px-2 py-1">
        {events.length === 0 ? (
          <div className="px-2 py-4 text-xs font-mono text-grid-dim text-center">
            Waiting for frequency deviation...
          </div>
        ) : (
          events.slice(0, 25).map(e => (
            <div
              key={e.id}
              className="px-2 py-1.5 border-b border-grid-border/30 flex items-start gap-2 text-[11px] font-mono"
            >
              <span className="text-grid-dim tabular-nums shrink-0">
                {formatTime(e.timestamp)}
              </span>
              <span
                className="px-1 py-0.5 rounded-sm text-[9px] font-bold shrink-0"
                style={{
                  backgroundColor: `${EVENT_TYPE_COLORS[e.eventType]}20`,
                  color: EVENT_TYPE_COLORS[e.eventType],
                }}
              >
                {e.eventType}
              </span>
              <span className="text-grid-text">
                <span className="text-grid-dim">{e.dcName}</span>{' '}
                <span className="text-grid-text">{e.action}</span>
                <span className="text-grid-dim"> @ {e.frequency.toFixed(3)} Hz</span>
                <span className="text-grid-dim"> ({e.mwChange} MW)</span>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
