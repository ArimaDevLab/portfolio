import type { Metadata } from "next";
import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import { getWork } from "@/lib/works";
import { site } from "@/site.config";
import "./local.css";

export const metadata: Metadata = {
  title: `ローカルツール | ${site.name}`,
  description: "通帳、PDF、スクショ、録音。読み取りや変換を、インターネットに送らずパソコンの中だけで行うツールと、社内導入の支援です。",
};

const CONTACT = "/contact?topic=local";

function Icon({ name }: { name: string }) {
  const p = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "pc") return <svg {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>;
  if (name === "web") return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>;
  return <svg {...p}><path d="M4 7h16v13H4z" /><path d="M9 7V4h6v3M9 13h6" /></svg>;
}

export default function LocalPage() {
  const l = site.local;
  const tools = l.tools.flatMap((t) => {
    const w = getWork(t.slug);
    if (!w) return [];
    return [{ ...t, cover: "cover" in t && t.cover ? t.cover : w.cover, url: w.url, detail: `/works/${w.slug}` }];
  });
  const first = tools[0];

  return (
    <main className="lc">
      <RevealObserver />

      <section className="lc-hero">
        <div className="section-inner lc-hero-in">
          <div>
            <p className="lc-eb">LOCAL TOOLS</p>
            <h1>{l.headline[0]}<br /><em>{l.headline[1]}</em><br />{l.headline[2]}</h1>
            <p className="lc-lead">{l.lead}</p>
            <div className="lc-ctas">
              <a className="button lc-pri" href="#tools">ツールを見る</a>
              <Link className="button ghost" href={CONTACT}>導入の相談をする</Link>
            </div>
            <ul className="lc-chips">{l.chips.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          {first && (
            <div className="lc-pc" aria-hidden="true">
              <div className="lc-screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={first.cover} alt="" />
              </div>
              <div className="lc-base" />
              <div className="lc-shield">
                <svg width="34" height="38" viewBox="0 0 34 38"><path d="M17 2 31 7v11c0 9-6 15-14 18C9 33 3 27 3 18V7z" fill="#e6f0f9" stroke="#0b3f68" strokeWidth="2.5" /><path d="m11 19 4.5 4.5L24 14" fill="none" stroke="#1f6fb8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span><b>ファイルの中身は</b>外に送りません</span>
              </div>
              <div className="lc-cloud"><s>クラウドへアップロード</s> → この中で完結</div>
            </div>
          )}
        </div>
      </section>

      <section className="lc-sec">
        <div className="section-inner">
          <p className="lc-eb">WHY LOCAL</p>
          <h2>{l.whyTitle}</h2>
          <p className="lc-sub">{l.whyLead}</p>
          <div className="lc-why">
            {l.why.map((w) => (
              <article key={w.title} data-reveal>
                <span className="lc-ico"><Icon name={w.icon} /></span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lc-sec lc-mist" id="tools">
        <div className="section-inner">
          <p className="lc-eb">TOOLS</p>
          <h2>いま使えるツール</h2>
          <div className="lc-tools">
            {tools.map((t) => (
              <article key={t.slug} className="lc-tool" data-reveal>
                <div className="lc-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.cover} alt={`${t.name}の画面`} loading="lazy" />
                  <span className="lc-who">{t.who}</span>
                </div>
                <div className="lc-tbody">
                  <ul className="lc-tags">{t.tags.map((g) => <li key={g} className={g === "無料" ? "free" : ""}>{g}</li>)}</ul>
                  <h3>{t.name}</h3>
                  <p>{t.body}</p>
                  <div className="lc-go">
                    {t.url && <a href={t.url} target="_blank" rel="noopener noreferrer">ブラウザで試す →<span className="sr">（新しいタブで開きます）</span></a>}
                    <Link href={t.detail}>詳しく見る</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lc-sec">
        <div className="section-inner lc-pack">
          <div>
            <p className="lc-eb">SUPPORT PACK</p>
            <h2>{l.pack.name}</h2>
            <p className="lc-sub">{l.pack.lead}</p>
            <div className="lc-scope"><b>「外に送らない」の範囲について</b>{l.scope}</div>
          </div>
          <div className="lc-box" data-reveal>
            <h3>{l.pack.name}</h3>
            <p className="lc-price"><b>{l.pack.price}</b>{l.pack.priceNote}</p>
            <ol>
              {l.pack.steps.map((s) => <li key={s.t}><span>{s.t}<small>{s.d}</small></span></li>)}
            </ol>
            <p className="lc-note">{l.pack.note}</p>
          </div>
        </div>
      </section>

      <section className="lc-cta">
        <div className="section-inner">
          <h2>まずは、気になるツールを試してみてください</h2>
          <p>「この書類にも使える？」といったご相談も歓迎です。</p>
          <Link className="button lc-pri" href={CONTACT}>導入の相談をする</Link>
        </div>
      </section>
    </main>
  );
}
