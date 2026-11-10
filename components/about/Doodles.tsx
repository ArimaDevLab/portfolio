// 「私について」ページのイラスト（すべて手描きのSVG）。色は about.css の変数で決める

export function Cake({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle cake ${className}`} viewBox="0 0 120 120" aria-hidden="true">
      <ellipse cx="60" cy="102" rx="46" ry="8" className="d-plate" />
      <g className="cake-body">
        <rect x="22" y="58" width="76" height="40" rx="7" className="d-sponge" />
        <rect x="22" y="72" width="76" height="6" className="d-cream" />
        <rect x="22" y="86" width="76" height="5" className="d-cream" />
        {[30, 44, 58, 72, 86].map((x) => <circle key={x} cx={x} cy="75" r="3" className="d-berry" />)}
        <path d="M22 64c4-9 8-9 12 0 4-9 8-9 12 0 4-9 8-9 12 0 4-9 8-9 12 0 4-9 8-9 12 0 4-9 8-9 12 0v-4H22z" className="d-cream" />
        <rect x="22" y="58" width="76" height="40" rx="7" className="d-line" />
      </g>
      <g className="cake-berry">
        <path d="M44 44c-6 0-10 5-8 11 2 5 6 7 8 9 2-2 6-4 8-9 2-6-2-11-8-11z" className="d-berry d-stroke" />
        <path d="M40 44c2-3 6-3 8 0M44 44v-4" className="d-leaf-line" />
      </g>
      <g className="cake-candle">
        <rect x="70" y="30" width="7" height="26" rx="2" className="d-candle d-stroke" />
        <path d="M70 37l7-3M70 45l7-3M70 53l7-3" className="d-candle-stripe" />
        <path d="M73.5 18c-4 5-4 9 0 10 4-1 4-5 0-10z" className="d-flame" />
      </g>
      <g className="sparkles">
        <path d="M102 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
        <path d="M18 34l1.5 3.5 3.5 1.5-3.5 1.5L18 44l-1.5-3.5L13 39l3.5-1.5z" />
      </g>
    </svg>
  );
}

export function Dango({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle dango ${className}`} viewBox="0 0 120 120" aria-hidden="true">
      <path d="M20 104L96 22" className="d-stick" />
      <g className="dango-ball b3"><circle cx="40" cy="82" r="15" className="d-matcha d-stroke" /></g>
      <g className="dango-ball b2"><circle cx="58" cy="62" r="15" className="d-mochi d-stroke" /></g>
      <g className="dango-ball b1"><circle cx="76" cy="42" r="15" className="d-sakura d-stroke" /></g>
      <path d="M71 37a6 6 0 0 1 6-3M53 57a6 6 0 0 1 6-3M35 77a6 6 0 0 1 6-3" className="d-shine" />
    </svg>
  );
}

export function Dumbbell({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle dumbbell ${className}`} viewBox="0 0 120 120" aria-hidden="true">
      <g className="bell">
        <rect x="30" y="56" width="60" height="8" rx="3" className="d-bar d-stroke" />
        <rect x="18" y="40" width="12" height="40" rx="4" className="d-plate-w d-stroke" />
        <rect x="8" y="46" width="10" height="28" rx="3" className="d-plate-w2 d-stroke" />
        <rect x="90" y="40" width="12" height="40" rx="4" className="d-plate-w d-stroke" />
        <rect x="102" y="46" width="10" height="28" rx="3" className="d-plate-w2 d-stroke" />
      </g>
      <g className="sweat">
        <path d="M60 22c-3 4-3 7 0 8 3-1 3-4 0-8z" />
        <path d="M76 26c-2 3-2 5 0 6 2-1 2-3 0-6z" />
      </g>
    </svg>
  );
}

export function Baseball({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle baseball ${className}`} viewBox="0 0 120 120" aria-hidden="true">
      <g className="bat">
        <path d="M24 100l58-58c4-4 10-4 13 0s4 9 0 13l-58 58c-3 3-8 3-11 0s-3-9-2-13z" className="d-wood d-stroke" />
        <path d="M22 104l6 6" className="d-grip" />
      </g>
      <g className="ball">
        <circle cx="86" cy="86" r="16" className="d-ball d-stroke" />
        <path d="M76 74c4 4 5 10 3 17M96 98c-4-4-5-10-3-17" className="d-seam" />
        <path d="M77 78l3-1M78 83l3-1M78 88l3 0M93 82l3 0M92 87l3 1M92 92l3 1" className="d-seam-x" />
      </g>
    </svg>
  );
}

export function Laptop({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={`laptop ${className}`}>
      <div className="laptop-screen">{children}</div>
      <div className="laptop-base" />
      <span className="laptop-tag" aria-hidden="true">格安</span>
    </div>
  );
}

export function Robot({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle robot-svg ${className}`} viewBox="0 0 40 40" aria-hidden="true">
      <g className="r-waves">
        <path d="M27 6.5a6 6 0 0 1 0 7" />
        <path d="M30 4a10 10 0 0 1 0 12" />
      </g>
      <g className="r-body">
        <line x1="20" y1="9" x2="20" y2="4" />
        <circle className="r-tip" cx="20" cy="3.5" r="2" />
        <rect className="r-head" x="10" y="9" width="20" height="15" rx="5" />
        <circle className="r-eye" cx="16" cy="16.5" r="2" />
        <circle className="r-eye" cx="24" cy="16.5" r="2" />
        <rect className="r-base" x="12" y="25" width="16" height="6" rx="2" />
      </g>
      <circle className="r-wheel" cx="15" cy="34" r="3.2" />
      <circle className="r-wheel" cx="25" cy="34" r="3.2" />
    </svg>
  );
}

export function PatrolCar() {
  return (
    <svg className="patrol" viewBox="0 0 160 80" aria-hidden="true">
      <rect x="62" y="8" width="16" height="7" rx="2" className="siren-l" />
      <rect x="80" y="8" width="16" height="7" rx="2" className="siren-r" />
      <path d="M40 34l14-18h52l16 18z" className="pc-white d-stroke" />
      <path d="M58 20h18v14H50zM82 20h18l10 14H82z" className="pc-glass" />
      <rect x="14" y="34" width="132" height="16" rx="6" className="pc-white d-stroke" />
      <rect x="14" y="48" width="132" height="12" rx="5" className="pc-black d-stroke" />
      <circle cx="44" cy="62" r="11" className="pc-tire d-stroke" />
      <circle cx="44" cy="62" r="4" className="pc-hub" />
      <circle cx="118" cy="62" r="11" className="pc-tire d-stroke" />
      <circle cx="118" cy="62" r="4" className="pc-hub" />
      <rect x="140" y="38" width="8" height="5" rx="2" className="pc-light" />
    </svg>
  );
}
