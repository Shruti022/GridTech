import { STATUS_COLORS } from '../../data/constants';

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function ActivityLog({ events }) {
  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm flex flex-col" style={{ maxHeight: 220 }}>
      <div className="px-4 py-2.5 border-b border-grid-border shrink-0">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
          Activity Log
        </span>
      </div>
      <div className="overflow-y-auto flex-1 px-2 py-1">
        {events.length === 0 ? (
          <div className="px-2 py-4 text-xs font-mono text-grid-dim text-center">
            No activity yet
          </div>
        ) : (
          events.slice(0, 15).map(e => (
            <div
              key={e.id}
              className="px-2 py-1.5 border-b border-grid-border/30 flex items-start gap-2 text-[11px] font-mono"
            >
              <span className="text-grid-dim tabular-nums shrink-0">
                {formatTime(e.timestamp)}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: STATUS_COLORS[e.toStatus] }}
              />
              <span className="text-grid-text">
                <span style={{ color: STATUS_COLORS[e.fromStatus] }}>{e.fromStatus}</span>
                {' -> '}
                <span style={{ color: STATUS_COLORS[e.toStatus] }}>{e.toStatus}</span>
                <span className="text-grid-dim"> | {e.frequency.toFixed(3)} Hz</span>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
