import { zones } from '../data/zones';
import { RISK_COLORS, STATUS } from '../data/constants';

export default function NYMap({ dataCenters }) {
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

  // Long Island shape
  const liPath = `M 365,300 L 375,295 L 395,298 L 420,305 L 450,310 L 460,315 L 450,320 L 420,318 L 395,315 L 375,312 L 365,308 Z`;

  return (
    <div className="bg-grid-surface border border-grid-border rounded-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-grid-dim">
          NYISO -- Curtailment Risk Map
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: RISK_COLORS.HIGH }} />
            <span className="text-[9px] font-mono text-grid-dim">HIGH</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: RISK_COLORS.MEDIUM }} />
            <span className="text-[9px] font-mono text-grid-dim">MED</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: RISK_COLORS.LOW }} />
            <span className="text-[9px] font-mono text-grid-dim">LOW</span>
          </div>
        </div>
      </div>
      <svg viewBox="0 0 470 350" className="w-full" style={{ maxHeight: 300 }}>
        {/* Grid lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="470" y2={i * 50} stroke="#1e1e2e" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`v${i}`} x1={i * 52} y1="0" x2={i * 52} y2="350" stroke="#1e1e2e" strokeWidth="0.5" />
        ))}

        {/* NY State outline */}
        <path d={nyPath} fill="rgba(30, 30, 46, 0.3)" stroke="#2a2a40" strokeWidth="1.5" />
        <path d={liPath} fill="rgba(30, 30, 46, 0.3)" stroke="#2a2a40" strokeWidth="1.5" />

        {/* Curtailment risk zones */}
        {zones.map(z => (
          <g key={z.id}>
            <ellipse
              cx={z.svgX}
              cy={z.svgY}
              rx={z.rx}
              ry={z.ry}
              fill={RISK_COLORS[z.risk]}
              opacity={0.12}
              stroke={RISK_COLORS[z.risk]}
              strokeWidth="0.8"
              strokeOpacity={0.3}
            />
            <text
              x={z.svgX}
              y={z.svgY - 3}
              textAnchor="middle"
              fill={RISK_COLORS[z.risk]}
              fontSize="9"
              fontFamily="JetBrains Mono"
              fontWeight="600"
              opacity={0.7}
            >
              {z.id}
            </text>
            <text
              x={z.svgX}
              y={z.svgY + 8}
              textAnchor="middle"
              fill="#6b6b80"
              fontSize="7"
              fontFamily="JetBrains Mono"
            >
              {z.dcCount} DC
            </text>
          </g>
        ))}

        {/* Data center locations */}
        {dataCenters.map(dc => {
          const isResponding = dc.status === STATUS.RESPONDING;
          const color = isResponding ? '#f59e0b' : '#3b82f6';
          return (
            <g key={dc.id}>
              {isResponding && (
                <circle cx={dc.svgX} cy={dc.svgY} r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" from="6" to="16" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={dc.svgX} cy={dc.svgY} r="5" fill={color} opacity={0.2} />
              <circle cx={dc.svgX} cy={dc.svgY} r="3" fill={color} style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
              <text
                x={dc.svgX + 8}
                y={dc.svgY - 3}
                fill="#e0e0e8"
                fontSize="8"
                fontFamily="JetBrains Mono"
              >
                {dc.name}
              </text>
              <text
                x={dc.svgX + 8}
                y={dc.svgY + 6}
                fill="#6b6b80"
                fontSize="7"
                fontFamily="JetBrains Mono"
              >
                {dc.totalMW} MW | {dc.zone}
              </text>
            </g>
          );
        })}

        {/* Region labels */}
        <text x="75" y="150" fill="#2a2a40" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">WESTERN NY</text>
        <text x="270" y="50" fill="#2a2a40" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">NORTH COUNTRY</text>
        <text x="200" y="200" fill="#2a2a40" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">CENTRAL NY</text>
        <text x="330" y="145" fill="#2a2a40" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">CAPITAL</text>
        <text x="150" y="255" fill="#2a2a40" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">SOUTHERN TIER</text>
        <text x="365" y="295" fill="#2a2a40" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">NYC</text>
        <text x="415" y="335" fill="#2a2a40" fontSize="9" fontFamily="JetBrains Mono" fontWeight="700">LONG ISLAND</text>
      </svg>
    </div>
  );
}
