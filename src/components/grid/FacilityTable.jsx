import { STATUS } from '../../data/constants';

export default function DataCenterTable({ dataCenters }) {
  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm flex-1 min-h-0 flex flex-col">
      <div className="px-4 py-2.5 border-b border-grid-border shrink-0">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
          Enrolled Data Centers
        </span>
      </div>
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-grid-dim border-b border-grid-border">
              <th className="text-left px-4 py-2 font-normal">Status</th>
              <th className="text-left px-4 py-2 font-normal">Data Center</th>
              <th className="text-left px-4 py-2 font-normal">Zone</th>
              <th className="text-right px-4 py-2 font-normal">Capacity</th>
              <th className="text-right px-4 py-2 font-normal">Flexible</th>
              <th className="text-right px-4 py-2 font-normal">DVFS</th>
              <th className="text-right px-4 py-2 font-normal">Draw</th>
              <th className="text-right px-4 py-2 font-normal">Latency</th>
            </tr>
          </thead>
          <tbody>
            {dataCenters.map(dc => {
              const isResponding = dc.status === STATUS.RESPONDING;
              const statusColor = isResponding ? '#f59e0b' : '#3b82f6';
              const dvfsPct = Math.round(dc.dvfsScale * 100);
              return (
                <tr
                  key={dc.id}
                  className="border-b border-grid-border/50 hover:bg-grid-panel transition-colors"
                >
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: statusColor, boxShadow: `0 0 6px ${statusColor}` }}
                      />
                      <span className="text-[10px] uppercase" style={{ color: statusColor }}>
                        {dc.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-grid-text">{dc.name}</td>
                  <td className="px-4 py-2 text-grid-dim">{dc.zone}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{dc.totalMW} MW</td>
                  <td className="px-4 py-2 text-right tabular-nums text-accent">{dc.flexibleMW} MW</td>
                  <td className="px-4 py-2 text-right tabular-nums" style={{ color: dvfsPct < 100 ? '#f59e0b' : '#6b6b80' }}>
                    {dvfsPct}%
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {dc.currentDraw.toFixed(1)} MW
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums text-grid-dim">
                    {dc.responseLatency} ms
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
