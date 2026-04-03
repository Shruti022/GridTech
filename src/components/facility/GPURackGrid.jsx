import { STATUS, COMMITTED_RACKS, FLEXIBLE_RACKS } from '../../data/constants';

export default function GPURackGrid({ dvfsScale, status, eventType }) {
  const isResponding = status === STATUS.RESPONDING;
  const dvfsPct = Math.round(dvfsScale * 100);

  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
          GPU Rack Status
        </span>
        <span className="text-[10px] font-mono text-grid-dim">
          {COMMITTED_RACKS} committed + {FLEXIBLE_RACKS} flexible
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {/* Committed racks */}
        {Array.from({ length: COMMITTED_RACKS }, (_, i) => (
          <div
            key={`c-${i}`}
            className="border border-committed/40 rounded-sm p-2 flex flex-col items-center gap-1"
            style={{ backgroundColor: 'rgba(99, 102, 241, 0.08)' }}
          >
            <div className="text-[9px] font-mono text-grid-dim uppercase">C{i + 1}</div>
            <div className="w-full h-8 rounded-sm overflow-hidden bg-grid-bg relative">
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                style={{
                  height: '100%',
                  backgroundColor: '#6366f1',
                  opacity: 0.6,
                }}
              />
            </div>
            <div className="text-[10px] font-mono text-committed font-bold tabular-nums">100%</div>
            <div className="text-[8px] font-mono text-grid-dim">COMMITTED</div>
          </div>
        ))}

        {/* Flexible racks */}
        {Array.from({ length: FLEXIBLE_RACKS }, (_, i) => {
          const rackColor = isResponding ? '#f59e0b' : '#3b82f6';
          return (
            <div
              key={`f-${i}`}
              className={`border rounded-sm p-2 flex flex-col items-center gap-1 transition-colors duration-300 ${
                isResponding ? 'border-flexible-active/50' : 'border-flexible/40'
              }`}
              style={{
                backgroundColor: isResponding
                  ? 'rgba(245, 158, 11, 0.08)'
                  : 'rgba(59, 130, 246, 0.08)',
              }}
            >
              <div className="text-[9px] font-mono text-grid-dim uppercase">F{i + 1}</div>
              <div className="w-full h-8 rounded-sm overflow-hidden bg-grid-bg relative">
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                  style={{
                    height: `${dvfsPct}%`,
                    backgroundColor: rackColor,
                    opacity: 0.7,
                    boxShadow: isResponding ? `0 0 8px ${rackColor}40` : 'none',
                  }}
                />
              </div>
              <div
                className="text-[10px] font-mono font-bold tabular-nums transition-colors duration-300"
                style={{ color: rackColor }}
              >
                {dvfsPct}%
              </div>
              <div className="text-[8px] font-mono text-grid-dim">FLEXIBLE</div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-between border-t border-grid-border pt-3">
        <div className="flex gap-4 text-[10px] font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-committed" />
            <span className="text-grid-dim">Committed ({COMMITTED_RACKS} racks @ 100%)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: isResponding ? '#f59e0b' : '#3b82f6' }} />
            <span className="text-grid-dim">Flexible ({FLEXIBLE_RACKS} racks @ {dvfsPct}%)</span>
          </span>
        </div>
        {isResponding && eventType && (
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm ${
            eventType === 'DEMAND'
              ? 'bg-event-demand/20 text-event-demand'
              : 'bg-event-supply/20 text-event-supply'
          }`}>
            {eventType === 'DEMAND' ? 'SCALING DOWN' : 'RAMPING UP'}
          </span>
        )}
      </div>
    </div>
  );
}
