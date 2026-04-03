import {
  LineChart, Line, XAxis, YAxis, ReferenceLine, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import { FREQ_HIGH, FREQ_LOW, FREQ_CRITICAL } from '../data/constants';

export default function FrequencyChart({ data, height = 220 }) {
  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
          Grid Frequency -- Real-Time
        </span>
        <span className="text-[10px] font-mono text-grid-dim">
          120s window
        </span>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
          <defs>
            <linearGradient id="freqGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ff88" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#00ff88" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            tick={false}
            axisLine={{ stroke: '#1e1e2e' }}
            tickLine={false}
          />
          <YAxis
            domain={[59.92, 60.08]}
            ticks={[59.92, 59.95, 59.98, 60.00, 60.02, 60.05, 60.08]}
            tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: '#6b6b80' }}
            axisLine={{ stroke: '#1e1e2e' }}
            tickLine={false}
            width={45}
            tickFormatter={(v) => v.toFixed(2)}
          />
          <ReferenceLine
            y={60.0}
            stroke="#6b6b80"
            strokeDasharray="3 3"
            strokeOpacity={0.5}
          />
          <ReferenceLine
            y={FREQ_HIGH}
            stroke="#3b82f6"
            strokeDasharray="4 4"
            strokeOpacity={0.4}
            label={{ value: 'HIGH', position: 'right', fontSize: 9, fill: '#3b82f6' }}
          />
          <ReferenceLine
            y={FREQ_LOW}
            stroke="#f59e0b"
            strokeDasharray="4 4"
            strokeOpacity={0.4}
            label={{ value: 'LOW', position: 'right', fontSize: 9, fill: '#f59e0b' }}
          />
          <ReferenceLine
            y={FREQ_CRITICAL}
            stroke="#ef4444"
            strokeDasharray="4 4"
            strokeOpacity={0.4}
            label={{ value: 'CRIT', position: 'right', fontSize: 9, fill: '#ef4444' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill="url(#freqGradient)"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00ff88"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
