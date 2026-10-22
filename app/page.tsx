import Image from "next/image";
import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import { getWorks } from "@/lib/works";
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
  const works = getWorks();
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
              <a className="button primary" href="#contact">
                相談する
              </a>
              <a className="button ghost" href="#works">
                作品を見る
              </a>
            </div>
          </div>

          {/* 何をつくる人かが一目で伝わるよう、APIの計算例とノーコードの流れを見せる */}
          <div className="hero-visual" aria-label="APIの計算例と、ノーコードでの業務の流れの例">
            <figure className="code-card">
              <figcaption>営業日・納期計算API（製作中）の計算例</figcaption>
              <pre>
                <code>
                  <span className="c-method">POST</span> /business-days/add{"\n"}
                  {"{"} <span className="c-key">&quot;date&quot;</span>: <span className="c-str">&quot;2026-12-29&quot;</span>,{"\n"}
                  {"  "}<span className="c-key">&quot;days&quot;</span>: <span className="c-num">3</span>,{"\n"}
                  {"  "}<span className="c-key">&quot;calendar&quot;</span>: <span className="c-str">&quot;bank&quot;</span> {"}"}
                </code>
              </pre>
              <pre className="response">
                <code>
                  <span className="c-ok">200 OK</span>{"\n"}
                  {"{"} <span className="c-key">&quot;result&quot;</span>: <span className="c-str">&quot;2027-01-05&quot;</span>,{"\n"}
                  {"  "}<span className="c-key">&quot;skipped&quot;</span>: [<span className="c-str">&quot;12-31&quot;</span>, <span className="c-str">&quot;01-01&quot;</span>,{"\n"}
                  {"    "}<span className="c-str">&quot;01-02&quot;</span>, <span className="c-str">&quot;01-03&quot;</span>] {"}"}
                </code>
              </pre>
            </figure>
            <figure className="flow-card">
              <figcaption>ノーコードでの業務の流れ（例）</figcaption>
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
            <p>システムをつなぐAPIと、手作業を減らすノーコードの仕組みを中心に、業務のための道具をつくります。</p>
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
            <h2>作品</h2>
            <p>企画から公開まで担当した、ツール・API・サービスです。</p>
          </div>
          <ul className="work-list">
            {works.map((w, i) => (
              <li key={w.slug} data-reveal>
                <Link href={`/works/${w.slug}`} className="card">
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
                    <h3>{w.title}</h3>
                    <p>{w.summary}</p>
                  </div>
                </Link>
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
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-inner" data-reveal>
          <h2>{site.contact.title}</h2>
          <p>{site.contact.body}</p>
          <a className="button light" href={`mailto:${site.email}`}>
            メールで相談する
          </a>
          <p className="contact-mail">{site.email}</p>
        </div>
      </section>
    </main>
  );
}
