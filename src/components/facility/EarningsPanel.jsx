import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis,
} from 'recharts';

export default function EarningsPanel({ earnings, earningsHistory }) {
  const netGain = earnings.gridRevenue - earnings.miningLost;

  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm p-4">
      <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
        Grid Service Revenue
      </span>

      <div className="mt-3 mb-3">
        <span className="text-3xl font-mono font-bold tabular-nums text-accent">
          ${earnings.gridRevenue.toFixed(2)}
        </span>
        <span className="text-xs font-mono text-grid-dim ml-2">earned</span>
      </div>

      {earningsHistory && earningsHistory.length > 2 && (
        <ResponsiveContainer width="100%" height={60}>
          <AreaChart data={earningsHistory} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff88" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#00ff88" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00ff88"
              strokeWidth={1}
              fill="url(#earningsGrad)"
              isAnimationActive={false}
            />
            <XAxis dataKey="time" hide />
            <YAxis hide />
          </AreaChart>
        </ResponsiveContainer>
      )}

      <div className="mt-3 space-y-1 border-t border-grid-border pt-3">
        <div className="flex justify-between text-[11px] font-mono">
          <span className="text-grid-dim">Grid Services</span>
          <span className="text-accent tabular-nums">+${earnings.gridRevenue.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[11px] font-mono">
          <span className="text-grid-dim">Mining Revenue Lost</span>
          <span className="text-status-shedding tabular-nums">-${earnings.miningLost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[11px] font-mono border-t border-grid-border pt-1">
          <span className="text-grid-text">Net Gain</span>
          <span className={`tabular-nums font-bold ${netGain >= 0 ? 'text-accent' : 'text-status-shedding'}`}>
            {netGain >= 0 ? '+' : ''}${netGain.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
