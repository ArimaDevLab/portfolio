import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config";
import "./pricing.css";

export const metadata: Metadata = {
  title: `料金 | ${site.name}`,
  description: "kintone健康診断（モニター無料）、ちょい改修パック、連携・業務改善プロジェクト、保守プランの料金の目安です。",
};

const MONITOR_HREF = "/contact?topic=monitor";

export default function PricingPage() {
  const p = site.pricing;
  const m = p.monitor;
  return (
    <main className="pr">
      <section className="pr-hero">
        <div className="section-inner">
          <p className="pr-eb">料金の目安</p>
          <h1>「いくらかかるか分からない」を、<br />なくしたいので。</h1>
          <p className="pr-lead">よくあるご依頼の目安を載せています。正式な金額は、30分のヒアリングのあとにお見積もりでお伝えします。ヒアリングとお見積もりは無料です。</p>
          <Link className="pr-mon" href="#monitor">
            kintone健康診断のモニターを募集しています <b>先着{m.slots}社 無料・{m.until}まで</b>
          </Link>
        </div>
      </section>

      <section className="pr-plans">
        <div className="section-inner">
          <div className="pr-cards">
            {p.plans.map((c) => (
              <article key={c.key} className={`pr-card${"main" in c && c.main ? " main" : ""}`}>
                {"main" in c && c.main && <span className="pr-rib">まずはここから</span>}
                <p className="pr-ask">{c.ask}</p>
                <h2>{c.name}</h2>
                <p className="pr-price">
                  {"was" in c && <s>{c.was}</s>}
                  {c.price}
                  {"unit" in c && <small>{c.unit}</small>}
                </p>
                <p className={`pr-note${"was" in c ? " mon" : ""}`}>{c.priceNote}</p>
                <p className="pr-body">{c.body}</p>
                <div className="pr-ex"><b>{c.exTitle}</b>{c.ex}</div>
                <div className="pr-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
                {"sample" in c && c.sample && (
                  <a className="pr-link" href={c.sample.href} target="_blank" rel="noopener noreferrer">{c.sample.label} →</a>
                )}
              </article>
            ))}
          </div>
          <p className="pr-path"><i>健康診断</i>→<i>改修</i>→<i>保守</i><span>診断のあと1か月以内に改修をご依頼いただくと、診断費用を改修費から差し引きます</span></p>

          <div className="pr-moni" id="monitor">
            <p className="pr-eb">モニター募集</p>
            <h2>kintone健康診断を、無料で。</h2>
            <p className="pr-sub">先着{m.slots}社・{m.until}まで。打ち合わせなしで、申し込みから約1週間でレポートをお届けします。</p>
            <ol className="pr-mflow">
              {p.monitorFlow.map((s, i) => <li key={s.t}><b>{i + 1}. {s.t}</b>{s.d}</li>)}
            </ol>
            <div className="pr-mcond">
              <div><h3>モニターの条件</h3><ul>{p.monitorTerms.map((t) => <li key={t}>{t}</li>)}</ul></div>
              <div><h3>安心して試していただくために</h3><ul>{p.monitorSafety.map((t) => <li key={t}>{t}</li>)}</ul></div>
            </div>
            <div className="pr-mcta">
              <Link className="button primary" href={MONITOR_HREF}>モニターに申し込む</Link>
              <small>モニター終了後の価格は {m.after}（税別）です。</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section pr-care">
        <div className="section-inner">
          <h2 className="pr-h2">作ったあとも、相談できる窓口を。</h2>
          <p className="pr-sub">担当は最初から最後まで同じ1人です。</p>
          <div className="pr-two">
            {p.care.map((c) => (
              <div key={c.name} className="pr-box">
                <h3>{c.name}</h3>
                <p className="pr-price sm">{c.price}<small>円 / 月</small></p>
                <ul>{c.items.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            ))}
            <div className="pr-box"><h3>料金に含まれるもの</h3><ul>{p.includes.map((t) => <li key={t}>{t}</li>)}</ul></div>
            <div className="pr-box"><h3>含まれないもの</h3><ul>{p.excludes.map((t) => <li key={t}>{t}</li>)}</ul></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <h2 className="pr-h2">ご依頼の流れ</h2>
          <p className="pr-sub">ご発注まで、費用はかかりません。</p>
          <ol className="pr-flow">{p.flow.map((s) => <li key={s.t}><b>{s.t}</b>{s.d}</li>)}</ol>
        </div>
      </section>

      <section className="section pr-care">
        <div className="section-inner pr-faq">
          <h2 className="pr-h2">よくある質問</h2>
          {p.faq.map((f, i) => (
            <details key={f.q} open={i < 3}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
          <p className="pr-small">表示価格はすべて税別です。内容や規模によって金額が変わるため、正式な金額はお見積もりでお伝えします。</p>
        </div>
      </section>

      <section className="pr-end">
        <div className="section-inner">
          <h2>まずは、無料の健康診断から。</h2>
          <p>モニターは先着{m.slots}社・{m.until}までです。</p>
          <div className="pr-endbtn">
            <Link className="button primary" href={MONITOR_HREF}>モニターに申し込む</Link>
            <Link className="pr-endlink" href="/contact">ほかのご相談はこちら</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
