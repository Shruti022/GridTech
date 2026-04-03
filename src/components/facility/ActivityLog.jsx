import { EVENT_TYPE_COLORS } from '../../data/constants';

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function ResponseLog({ events }) {
  // Filter to primary facility events
  const facilityEvents = events.filter(e => e.dcId === 'buffalo-ai-hub');

  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm flex flex-col flex-1 min-h-0">
      <div className="px-4 py-2.5 border-b border-grid-border shrink-0">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
          Response Log
        </span>
      </div>
      <div className="overflow-y-auto flex-1 px-2 py-1">
        {facilityEvents.length === 0 ? (
          <div className="px-2 py-4 text-xs font-mono text-grid-dim text-center">
            No response events yet
          </div>
        ) : (
          facilityEvents.slice(0, 15).map(e => (
            <div
              key={e.id}
              className="px-2 py-1.5 border-b border-grid-border/30 text-[11px] font-mono"
            >
              <div className="flex items-center gap-2">
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
                <span className="text-grid-dim tabular-nums">{e.frequency.toFixed(3)} Hz</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-grid-dim">
                <span>{e.action}</span>
                <span className="text-grid-dim">|</span>
                <span>{e.mwChange} MW</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
