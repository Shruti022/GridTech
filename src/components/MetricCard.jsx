export default function MetricCard({ label, value, unit, color, subtext }) {
  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm p-4 flex flex-col gap-1">
      <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
        {label}
      </span>
      <div className="flex items-baseline gap-1.5">
        <span
          className="text-2xl font-mono font-bold tabular-nums"
          style={{ color: color || 'var(--color-grid-text)' }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-xs font-mono text-grid-dim">{unit}</span>
        )}
      </div>
      {subtext && (
        <span className="text-[10px] font-mono text-grid-dim">{subtext}</span>
      )}
    </div>
  );
}
