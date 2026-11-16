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

// サイトのマスコットのロボット（白い体が背景に溶けないよう、紺のふちどりを付けている）
export function Robot({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle robot-svg ${className}`} viewBox="250 168 320 440" aria-hidden="true">
      <g className="rb-all">
        {/* 下げている腕 */}
        <path d="M318 420 Q280 450 290 500" fill="none" stroke="#0b3f68" strokeWidth="42" strokeLinecap="round" />
        <path d="M318 420 Q280 450 290 500" fill="none" stroke="#fff" strokeWidth="30" strokeLinecap="round" />
        <circle cx="290" cy="505" r="20" fill="#5ee0c8" stroke="#0b3f68" strokeWidth="6" />
        {/* 手を振る腕 */}
        <g className="rb-wave">
          <path d="M482 410 Q530 380 540 330" fill="none" stroke="#0b3f68" strokeWidth="42" strokeLinecap="round" />
          <path d="M482 410 Q530 380 540 330" fill="none" stroke="#fff" strokeWidth="30" strokeLinecap="round" />
          <circle cx="542" cy="322" r="20" fill="#5ee0c8" stroke="#0b3f68" strokeWidth="6" />
        </g>
        {/* 胴体 */}
        <path d="M330 390 L470 390 Q500 390 498 420 L486 520 Q482 556 446 556 L354 556 Q318 556 314 520 L302 420 Q300 390 330 390 Z" fill="#fff" stroke="#0b3f68" strokeWidth="6" />
        <rect x="356" y="430" width="88" height="58" rx="14" fill="#0b3f68" />
        <rect className="rb-bar b1" x="368" y="446" width="14" height="28" rx="4" fill="#5ee0c8" />
        <rect className="rb-bar b2" x="388" y="456" width="14" height="18" rx="4" fill="#f5a524" />
        <rect className="rb-bar b3" x="408" y="440" width="14" height="34" rx="4" fill="#ff7a6b" />
        <circle cx="372" cy="520" r="7" fill="#c9d8ea" />
        <circle cx="400" cy="520" r="7" fill="#c9d8ea" />
        <circle cx="428" cy="520" r="7" fill="#c9d8ea" />
        {/* 首と頭 */}
        <g className="rb-head">
          <rect x="380" y="368" width="40" height="28" rx="8" fill="#c9d8ea" stroke="#0b3f68" strokeWidth="5" />
          <path d="M360 232 L344 196" stroke="#1f6fb8" strokeWidth="7" strokeLinecap="round" />
          <circle className="rb-tip t1" cx="342" cy="190" r="12" fill="#ff7a6b" stroke="#0b3f68" strokeWidth="4" />
          <path d="M440 232 L456 196" stroke="#1f6fb8" strokeWidth="7" strokeLinecap="round" />
          <circle className="rb-tip t2" cx="458" cy="190" r="12" fill="#f5a524" stroke="#0b3f68" strokeWidth="4" />
          <rect x="280" y="278" width="26" height="54" rx="12" fill="#1f6fb8" stroke="#0b3f68" strokeWidth="5" />
          <rect x="494" y="278" width="26" height="54" rx="12" fill="#1f6fb8" stroke="#0b3f68" strokeWidth="5" />
          <rect x="300" y="230" width="200" height="150" rx="40" fill="#fff" stroke="#0b3f68" strokeWidth="6" />
          <rect x="326" y="258" width="148" height="96" rx="30" fill="#0b3f68" />
          <g className="rb-eyes">
            <path d="M356 306 Q370 290 384 306" fill="none" stroke="#5ee0c8" strokeWidth="9" strokeLinecap="round" />
            <path d="M416 306 Q430 290 444 306" fill="none" stroke="#5ee0c8" strokeWidth="9" strokeLinecap="round" />
          </g>
          <path d="M384 326 Q400 338 416 326" fill="none" stroke="#5ee0c8" strokeWidth="6" strokeLinecap="round" />
          <circle cx="346" cy="330" r="7" fill="#ff7a6b" opacity="0.85" />
          <circle cx="454" cy="330" r="7" fill="#ff7a6b" opacity="0.85" />
        </g>
      </g>
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
