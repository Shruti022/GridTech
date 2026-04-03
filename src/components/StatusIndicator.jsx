export default function StatusIndicator({ status, color, size = 'sm' }) {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
  };

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`${sizes[size]} rounded-full inline-block`}
        style={{
          backgroundColor: color,
          boxShadow: `0 0 6px ${color}`,
        }}
      />
      {status && (
        <span className="text-xs font-mono uppercase tracking-wider" style={{ color }}>
          {status}
        </span>
      )}
    </span>
  );
}
