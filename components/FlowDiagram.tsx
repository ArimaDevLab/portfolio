// 紹介スライドの図：バラバラな入力が kintone にまとまり、Zapier・Make・API で必要な所へ流れていく様子
const L = [
  { y: 92, label: "Webフォーム" },
  { y: 220, label: "メール・添付" },
  { y: 348, label: "Excel・CSV" },
];
const R = [
  { y: 92, label: "Slack 通知" },
  { y: 220, label: "会計ソフト" },
  { y: 348, label: "帳票・PDF" },
];
const inPath = (y: number) => `M134 ${y} C 190 ${y}, 186 220, 236 220`;
const outPath = (y: number) => `M364 220 C 414 220, 410 ${y}, 466 ${y}`;

function Node({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g className="fd-node">
      <rect x={x - 62} y={y - 22} width={124} height={44} rx={22} />
      <text x={x} y={y + 5}>{label}</text>
    </g>
  );
}

export default function FlowDiagram() {
  return (
    <svg className="fd" viewBox="0 0 600 440" role="img" aria-label="フォームやメール、Excelなどバラバラな入力がkintoneにまとまり、Zapier・Make・APIでSlackや会計ソフト、帳票へ自動で流れていく図">
      <defs>
        <filter id="fd-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="fd-line" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <text className="fd-cap" x={72} y={40}>バラバラな入力</text>
      <text className="fd-cap" x={528} y={40}>必要な所へ自動で</text>

      {L.map((n, i) => <path key={`lp${i}`} id={`fd-in${i}`} className="fd-line" d={inPath(n.y)} stroke="url(#fd-line)" />)}
      {R.map((n, i) => <path key={`rp${i}`} id={`fd-out${i}`} className="fd-line out" d={outPath(n.y)} />)}

      {/* 線の上を流れる光の粒 */}
      <g className="fd-dots" filter="url(#fd-glow)">
        {L.map((_, i) => [0, 1].map((k) => (
          <circle key={`ld${i}${k}`} r={k ? 2.6 : 4}>
            <animateMotion dur="2.6s" begin={`-${(2.6 - (i * 0.55 + k * 1.3) % 2.6).toFixed(2)}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.6 1">
              <mpath href={`#fd-in${i}`} />
            </animateMotion>
          </circle>
        )))}
        {R.map((_, i) => [0, 1].map((k) => (
          <circle key={`rd${i}${k}`} r={k ? 2.6 : 4} className="warm">
            <animateMotion dur="2.6s" begin={`-${(2.6 - (1.4 + i * 0.55 + k * 1.3) % 2.6).toFixed(2)}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.4 0 0.6 1">
              <mpath href={`#fd-out${i}`} />
            </animateMotion>
          </circle>
        )))}
      </g>

      {L.map((n) => <Node key={n.label} x={72} y={n.y} label={n.label} />)}
      {R.map((n) => <Node key={n.label} x={528} y={n.y} label={n.label} />)}

      {/* まんなかの kintone */}
      <g className="fd-hub">
        <circle className="fd-ring" cx={300} cy={220} r={70} />
        <circle className="fd-ring r2" cx={300} cy={220} r={70} />
        <rect x={236} y={156} width={128} height={128} rx={30} />
        <text className="t1" x={300} y={218}>kintone</text>
        <text className="t2" x={300} y={244}>ひとつにまとめる</text>
      </g>

      <g className="fd-chip">
        <rect x={232} y={318} width={136} height={30} rx={15} />
        <text x={300} y={338}>Zapier・Make・API</text>
      </g>
    </svg>
  );
}
