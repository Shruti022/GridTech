import StatusIndicator from '../StatusIndicator';

export default function FacilityTable({ facilities }) {
  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm">
      <div className="px-4 py-2.5 border-b border-grid-border">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
          Registered Facilities
        </span>
      </div>
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-grid-dim border-b border-grid-border">
            <th className="text-left px-4 py-2 font-normal">Status</th>
            <th className="text-left px-4 py-2 font-normal">Facility</th>
            <th className="text-left px-4 py-2 font-normal">Zone</th>
            <th className="text-right px-4 py-2 font-normal">Capacity</th>
            <th className="text-right px-4 py-2 font-normal">Flexible</th>
            <th className="text-right px-4 py-2 font-normal">Curtailed</th>
            <th className="text-left px-4 py-2 font-normal w-32">Load</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map(f => {
            const loadPct = (f.currentLoad / f.totalMW) * 100;
            return (
              <tr
                key={f.id}
                className="border-b border-grid-border/50 hover:bg-grid-panel transition-colors"
              >
                <td className="px-4 py-2.5">
                  <StatusIndicator status={f.status} color={f.statusColor} />
                </td>
                <td className="px-4 py-2.5 text-grid-text">{f.name}</td>
                <td className="px-4 py-2.5 text-grid-dim">{f.zone}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{f.totalMW} MW</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-grid-dim">{f.flexibleMW} MW</td>
                <td className="px-4 py-2.5 text-right tabular-nums" style={{ color: f.curtailedMW > 0 ? '#f59e0b' : '#6b6b80' }}>
                  {f.curtailedMW > 0 ? `-${f.curtailedMW.toFixed(1)}` : '0.0'} MW
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-grid-bg rounded-sm overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${loadPct}%`,
                          backgroundColor: f.statusColor,
                          boxShadow: `0 0 4px ${f.statusColor}`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] tabular-nums text-grid-dim w-8 text-right">
                      {loadPct.toFixed(0)}%
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
