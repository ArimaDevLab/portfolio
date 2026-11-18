import Link from "next/link";

type Item = { icon: string; title: string; body: string[]; href?: string };
type Props = { headline: string[]; accent: string; lead: string; bubbles: string[]; items: Item[] };

const icons: Record<string, React.ReactNode> = {
  code: <><path d="M8 9l-4 3 4 3M16 9l4 3-4 3" /><path className="a" d="M13.5 6l-3 12" /></>,
  plug: <><path d="M9 3v5M15 3v5" /><path d="M6 8h12v3a6 6 0 0 1-12 0z" /><path className="a" d="M12 17v4" /></>,
  link: <><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="6" r="2.6" /><circle cx="18" cy="18" r="2.6" /><path className="a" d="M8.4 10.8l7.2-3.6M8.4 13.2l7.2 3.6" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /><path className="a" d="M9 12h6M9 16h4" /></>,
  check: <><rect x="4" y="3" width="13" height="18" rx="2" /><path d="M8 8h5M8 12h5" /><circle className="a" cx="17" cy="16" r="3.2" /><path className="a" d="M19.3 18.3L21 20" /></>,
  talk: <><path d="M4 5h16v10H9l-5 4z" /><path className="a" d="M9 10h.01M12 10h.01M15 10h.01" /></>,
};

// 6つを円周上に置く（上から時計回り）
const R = 38;
const at = (i: number, n: number, r = R) => {
  const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
};

export default function ServiceRing({ headline, accent, lead, bubbles, items }: Props) {
  return (
    <div className="sr-wrap">
      <div className="sr-text" data-reveal>
        <p className="sr-eb">できること</p>
        <h2 className="sr-h">
          {headline.map((l) => <span key={l}>{l}</span>)}
          <em>{accent}</em>
        </h2>
        <p className="sr-lead">{lead}</p>
        <div className="sr-ill">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/illust/service-blue.svg" alt="" loading="lazy" />
          {bubbles.map((b, i) => <span key={b} className={`sr-bub b${i + 1}`}>{b}</span>)}
        </div>
      </div>

      <div className="sr-ring" data-reveal>
        <svg className="sr-lines" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r={R} />
          {items.map((it, i) => {
            const p = at(i, items.length, 24);
            return <line key={it.title} x1="50" y1="50" x2={p.x} y2={p.y} />;
          })}
        </svg>
        <div className="sr-core">
          <small>kintoneの相談窓口</small>
          <b>Arima<br />Dev Lab</b>
          <span>kintone専門</span>
        </div>
        <ul className="sr-nodes">
          {items.map((it, i) => {
            const p = at(i, items.length);
            const body = (
              <>
                <span className="sr-ic"><svg viewBox="0 0 24 24" aria-hidden="true">{icons[it.icon]}</svg></span>
                <h3>{it.title}</h3>
                <p>{it.body.map((l) => <span key={l}>{l}</span>)}</p>
              </>
            );
            return (
              <li key={it.title} className={it.href ? "hl" : undefined} style={{ "--x": `${p.x}%`, "--y": `${p.y}%`, "--k": i } as React.CSSProperties}>
                {it.href ? <Link href={it.href}>{body}</Link> : body}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
