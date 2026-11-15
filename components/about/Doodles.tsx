// 「私について」ページのイラスト（すべて手描きのSVG）。色は about.css の変数で決める

export function Car({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle car ${className}`} viewBox="0 0 140 120" aria-hidden="true">
      <path d="M6 96h128" className="road" />
      <path d="M14 104h22M58 104h22M102 104h22" className="road-dash" />
      <g className="car-puff">
        <circle cx="16" cy="80" r="5" />
        <circle cx="8" cy="74" r="3.5" />
      </g>
      <g className="car-speed">
        <path d="M2 56h14M0 66h18M4 76h10" />
      </g>
      <g className="car-body">
        <path d="M30 60l12-18c2-3 5-4 8-4h30c3 0 6 1 8 4l14 18" className="d-car-top d-stroke" />
        <path d="M48 44h14v16H40zM68 44h12c2 0 3 1 4 2l9 14H68z" className="d-car-glass" />
        <rect x="20" y="58" width="104" height="24" rx="10" className="d-car d-stroke" />
        <rect x="114" y="64" width="8" height="6" rx="2" className="d-car-light" />
        <rect x="20" y="64" width="6" height="6" rx="2" className="d-car-tail" />
        <path d="M62 66h8" className="d-car-handle" />
      </g>
      <g className="car-wheel w1"><circle cx="46" cy="84" r="11" className="d-tire d-stroke" /><circle cx="46" cy="84" r="4" className="d-hub" /><path d="M46 76v16M38 84h16" className="d-spoke" /></g>
      <g className="car-wheel w2"><circle cx="100" cy="84" r="11" className="d-tire d-stroke" /><circle cx="100" cy="84" r="4" className="d-hub" /><path d="M100 76v16M92 84h16" className="d-spoke" /></g>
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
