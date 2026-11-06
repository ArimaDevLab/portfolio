import Image from "next/image";
import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import { getMainWorks } from "@/lib/works";
import { site } from "@/site.config";

const icons: Record<string, React.ReactNode> = {
  api: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
    </svg>
  ),
  flow: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="6" height="5" rx="1.5" />
      <rect x="15" y="4" width="6" height="5" rx="1.5" />
      <rect x="9" y="15" width="6" height="5" rx="1.5" />
      <path d="M9 6.5h6M18 9v3.5H12V15" />
    </svg>
  ),
  tool: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M8 21h8M12 18v3" />
    </svg>
  ),
};

export default function Home() {
  const works = getMainWorks();
  return (
    <main>
      <RevealObserver />

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>
              {site.hero.headline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="lead">{site.hero.lead}</p>
            <div className="actions">
              <Link className="button primary" href="/contact">
                相談する
              </Link>
              <a className="button ghost" href="#works">
                プロダクトを見る
              </a>
            </div>
          </div>

          {/* 何をつくる人かが一目で伝わるよう、kintoneカスタマイズの設定例と結果、外部連携の流れを見せる */}
          <div className="hero-visual" aria-label="kintoneの営業日計算カスタマイズの設定例と、保存時に期限が自動で入る結果、外部サービスとの連携の流れの例">
            <figure className="code-card">
              <figcaption>kintone 営業日計算サンプルJSの設定例</figcaption>
              <pre>
                <code>
                  <span className="c-method">rules</span>: [{"{"}{"\n"}
                  {"  "}<span className="c-key">from</span>: <span className="c-str">&quot;受付日&quot;</span>, <span className="c-key">to</span>: <span className="c-str">&quot;回答期限&quot;</span>,{"\n"}
                  {"  "}<span className="c-key">days</span>: 3, <span className="c-key">calendar</span>: <span className="c-str">&quot;bank&quot;</span>{"\n"}
                  {"}"}]
                </code>
              </pre>
              <pre className="response">
                <code>
                  <span className="c-ok">保存すると</span>{"\n"}
                  <span className="c-key">受付日</span>{"    "}<span className="c-str">2026-12-29</span>{"\n"}
                  <span className="c-key">回答期限</span>{"  "}<span className="c-str">2027-01-05</span>  <span className="c-ok">← 自動で入力</span>
                </code>
              </pre>
            </figure>
            <figure className="flow-card">
              <figcaption>外部サービスとの連携（例）</figcaption>
              <ol>
                <li>
                  <span className="flow-dot" />
                  フォームから申請
                </li>
                <li>
                  <span className="flow-dot" />
                  kintoneに自動で登録
                </li>
                <li>
                  <span className="flow-dot" />
                  担当者のSlackに通知
                </li>
              </ol>
            </figure>
          </div>
        </div>
      </section>

      <section id="service" className="section service">
        <div className="section-inner">
          <div className="section-head" data-reveal>
            <h2>できること</h2>
            <p>kintoneを中心に、標準機能では届かないところを補い、手作業を減らす仕組みをつくります。</p>
          </div>
          <ul className="service-list">
            {site.services.map((s) => (
              <li key={s.title} data-reveal>
                <div className="service-icon">{icons[s.icon]}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <ul className="points">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="process" className="section process">
        <div className="section-inner">
          <div className="section-head" data-reveal>
            <h2>進め方</h2>
            <p>ご相談から公開後の改善まで、窓口はひとつです。伝言で話がずれることがありません。</p>
          </div>
          <ol className="process-list">
            {site.process.map((p, i) => (
              <li key={p.title} data-reveal>
                <span className="step">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="works" className="section works">
        <div className="section-inner">
          <div className="section-head" data-reveal>
            <h2>プロダクト</h2>
            <p>自分で企画し、公開まで担当したkintone向けのツールや、そのほかのサービスです。</p>
          </div>
          <ul className="work-list">
            {works.map((w, i) => (
              <li key={w.slug} data-reveal>
                {(() => {
                  const body = (<>
                  <div className="thumb">
                    <Image
                      src={w.cover}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                      priority={i < 3}
                    />
                  </div>
                  <div className="card-body">
                    {w.tags.length > 0 && (
                      <ul className="card-tags">
                        {w.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                    <h3>
                      {w.title}
                      {w.link && <span className="ext" aria-hidden="true" />}
                    </h3>
                    <p>{w.summary}</p>
                  </div>
                </>);
                  return w.link ? (
                    <a href={w.link} className="card" target="_blank" rel="noopener noreferrer" aria-label={`${w.title}（新しいタブで開きます）`}>{body}</a>
                  ) : (
                    <Link href={`/works/${w.slug}`} className="card">{body}</Link>
                  );
                })()}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="section-inner about-inner">
          <h2 data-reveal>私について</h2>
          <div data-reveal>
            <h3>{site.about.title}</h3>
            {site.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Link href="/about" className="text-link">
              プロフィールと、趣味でつくったものを見る
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-inner" data-reveal>
          <h2>{site.contact.title}</h2>
          <p>{site.contact.body}</p>
          <Link className="button light" href="/contact">
            フォームで相談する
          </Link>
        </div>
      </section>
    </main>
  );
}
