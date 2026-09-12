const nodes = [
  { label: "Projects", angle: -55, dist: 168 },
  { label: "Content", angle: 35, dist: 168 },
  { label: "Analytics", angle: 145, dist: 168 },
  { label: "Sites", angle: 235, dist: 168 },
];

function polar(angleDeg, dist, cx = 250, cy = 250) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + dist * Math.cos(rad), y: cy + dist * Math.sin(rad) };
}

export default function OrbitGraphic() {
  return (
    <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[420px] md:max-w-[520px] mx-auto">
      <svg viewBox="0 0 500 500" className="w-full h-full" role="img" aria-label="On3ra's four connected modules orbiting a central workspace">
        <defs>
          <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* slow decorative outer rotation */}
        <g className="orbit-ring-slow" style={{ transformBox: "fill-box" }}>
          <circle cx="250" cy="250" r="215" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="2 10" />
        </g>
        <g className="orbit-ring" style={{ transformBox: "fill-box" }}>
          <circle cx="250" cy="250" r="168" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
        </g>

        {/* connecting lines from core to each node */}
        {nodes.map((n) => {
          const p = polar(n.angle, n.dist);
          return (
            <line key={n.label} x1="250" y1="250" x2={p.x} y2={p.y} stroke="#E2E8F0" strokeWidth="1.5" />
          );
        })}

        {/* central core with star, matching the logo mark */}
        <circle cx="250" cy="250" r="58" fill="url(#coreGrad)" />
        <path
          d="M250 222 L258 244 L282 244 L262 258 L270 280 L250 266 L230 280 L238 258 L218 244 L242 244 Z"
          fill="white"
          opacity="0.95"
        />

        {/* module nodes */}
        {nodes.map((n) => {
          const p = polar(n.angle, n.dist);
          return (
            <g key={n.label}>
              <circle cx={p.x} cy={p.y} r="30" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
              <circle cx={p.x} cy={p.y} r="6" fill="#2563EB" />
            </g>
          );
        })}
      </svg>

      {/* Labels as HTML, positioned over the SVG so text stays crisp and upright */}
      {nodes.map((n) => {
        const p = polar(n.angle, n.dist);
        return (
          <div
            key={n.label}
            className="absolute text-xs font-display font-semibold text-navy bg-white px-2 py-1 rounded-md border border-line -translate-x-1/2"
            style={{ left: `${(p.x / 500) * 100}%`, top: `${((p.y + 42) / 500) * 100}%` }}
          >
            {n.label}
          </div>
        );
      })}
    </div>
  );
}
