export default function FacilityMap({ facilities }) {
  // Simplified NY State outline path
  const nyPath = `
    M 45,175 L 35,185 L 30,200 L 40,215 L 55,225 L 70,235
    L 85,230 L 100,235 L 115,240 L 130,245 L 145,250
    L 160,248 L 180,255 L 200,258 L 215,260 L 230,262
    L 248,265 L 260,258 L 268,250 L 280,252 L 290,248
    L 298,240 L 310,235 L 320,225 L 340,215 L 355,200
    L 365,185 L 372,170 L 378,150 L 380,130 L 375,110
    L 370,95 L 365,80 L 358,68 L 348,58 L 335,52
    L 320,48 L 305,50 L 290,48 L 275,42 L 260,38
    L 240,35 L 220,33 L 200,32 L 180,35 L 160,40
    L 140,45 L 120,52 L 100,60 L 80,70 L 65,85
    L 55,100 L 48,120 L 42,140 L 40,155 L 42,168 Z
  `;

  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
          NYISO -- Facility Locations
        </span>
        <span className="text-[10px] font-mono text-grid-dim">
          Upstate NY
        </span>
      </div>
      <svg viewBox="0 0 420 290" className="w-full" style={{ maxHeight: 260 }}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <line key={`h${i}`} x1="0" y1={i * 48} x2="420" y2={i * 48} stroke="#1e1e2e" strokeWidth="0.5" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="290" stroke="#1e1e2e" strokeWidth="0.5" />
        ))}

        {/* NY State outline */}
        <path
          d={nyPath}
          fill="rgba(30, 30, 46, 0.3)"
          stroke="#2a2a40"
          strokeWidth="1.5"
        />

        {/* Zone labels */}
        <text x="65" y="195" className="text-[11px]" fill="#2a2a40" fontFamily="JetBrains Mono" fontWeight="700">
          ZONE A
        </text>
        <text x="195" y="230" className="text-[11px]" fill="#2a2a40" fontFamily="JetBrains Mono" fontWeight="700">
          ZONE C
        </text>
        <text x="300" y="100" className="text-[11px]" fill="#2a2a40" fontFamily="JetBrains Mono" fontWeight="700">
          ZONE D
        </text>

        {/* Facilities */}
        {facilities.map(f => {
          const radius = Math.max(4, Math.min(12, f.totalMW / 40));
          return (
            <g key={f.id}>
              {/* Pulse ring for non-nominal */}
              {f.status !== 'NOMINAL' && (
                <circle
                  cx={f.svgX}
                  cy={f.svgY}
                  r={radius + 6}
                  fill="none"
                  stroke={f.statusColor}
                  strokeWidth="1"
                  opacity="0.4"
                >
                  <animate
                    attributeName="r"
                    from={radius + 3}
                    to={radius + 12}
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              {/* Glow */}
              <circle
                cx={f.svgX}
                cy={f.svgY}
                r={radius + 3}
                fill={f.statusColor}
                opacity={0.15}
              />
              {/* Dot */}
              <circle
                cx={f.svgX}
                cy={f.svgY}
                r={radius}
                fill={f.statusColor}
                style={{ filter: `drop-shadow(0 0 4px ${f.statusColor})` }}
              />
              {/* Label */}
              <text
                x={f.svgX + radius + 6}
                y={f.svgY - 4}
                fill="#e0e0e8"
                fontSize="9"
                fontFamily="JetBrains Mono"
              >
                {f.name}
              </text>
              <text
                x={f.svgX + radius + 6}
                y={f.svgY + 7}
                fill="#6b6b80"
                fontSize="8"
                fontFamily="JetBrains Mono"
              >
                {f.totalMW} MW | Zone {f.zone}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
