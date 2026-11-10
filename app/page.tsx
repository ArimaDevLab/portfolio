import Link from "next/link";
import AutoVideo from "@/components/AutoVideo";
import BeforeAfter from "@/components/BeforeAfter";
import ContactBand from "@/components/ContactBand";
import OthersList from "@/components/OthersList";
import SectionHead from "@/components/SectionHead";
import IllustFlow from "@/components/IllustFlow";
import HeroSlider, { type Slide } from "@/components/HeroSlider";
import RevealObserver from "@/components/RevealObserver";
import WorkGrid from "@/components/WorkGrid";
import { getMainWorks, getWork } from "@/lib/works";
import { site } from "@/site.config";

const icons: Record<string, React.ReactNode> = {
  api: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path pathLength={1} d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
    </svg>
  ),
  flow: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect pathLength={1} x="3" y="4" width="6" height="5" rx="1.5" />
      <rect pathLength={1} x="15" y="4" width="6" height="5" rx="1.5" />
      <rect pathLength={1} x="9" y="15" width="6" height="5" rx="1.5" />
      <path pathLength={1} d="M9 6.5h6M18 9v3.5H12V15" />
    </svg>
  ),
  tool: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect pathLength={1} x="3" y="4" width="18" height="14" rx="2" />
      <path pathLength={1} d="M3 8h18M8 21h8M12 18v3" />
    </svg>
  ),
};

// 「そのほかのツール」のアイコン（線画）
const toolIcons: Record<string, React.ReactNode> = {
  "passbook-ocr": (<><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" /><path d="M5 17a3 3 0 0 1 3-3h11" /><path d="M9 8h6M9 11h4" /></>),
  "jp-address-api": (<><path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.4" /></>),
  "pdf-seamless": (<><rect x="3.5" y="5" width="8" height="14" rx="1.5" /><rect x="12.5" y="5" width="8" height="14" rx="1.5" /><path d="M6 9h3M6 12h3M15 9h3M15 12h3" /></>),
  "ai-subtitle": (<><rect x="3" y="4.5" width="18" height="13" rx="2" /><path d="M7 14h5M14 14h3M7 11h3M12 11h5" /><path d="M9 20.5h6" /></>),
  "trend-watcher": (<><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" /><path d="M10 20.5a2 2 0 0 0 4 0" /><path d="M19.5 5.5l1.5-1.5M4.5 5.5L3 4" /></>),
  "tabless-search": (<><path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M4 16v2.5A1.5 1.5 0 0 0 5.5 20H8" /><circle cx="13.5" cy="13.5" r="3.5" /><path d="M16 16l4 4" /></>),
  "pasha-copy": (<><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.5-2h5.6l1.5 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" /><circle cx="12" cy="12.5" r="3.4" /></>),
};
const toolIconFallback = (<><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 12h8M12 8v8" /></>);

const STATUS = ["販売準備中", "試作", "無料サンプル", "製作中"];

// 「そのほかのツール」の短い分類名
const shortTag = (t?: string) => (t === "ブラウザ拡張" ? "拡張" : t ?? "");
// 長い英語の別名は一覧では省く
const shortTitle = (t: string) => (t.length > 26 ? t.replace(/（[^）]*）$/, "") : t);

export default function Home() {
  const works = getMainWorks();
  const kindOf = new Map(site.heroSlides.map((h) => [h.slug, h]));
  const slides: Slide[] = site.heroSlides.flatMap((h) => {
    const w = getWork(h.slug);
    if (!w) return [];
    return [{
      key: w.slug, kind: h.kind, name: h.name, catch: h.catch, title: w.title, summary: w.summary, cover: w.cover,
      href: w.link ?? `/works/${w.slug}`, external: Boolean(w.link),
      status: w.tags.find((t) => STATUS.includes(t)),
    }];
  });

  // プロダクト：kintone のものを上に大きく、そのほかは一覧で
  const kintone = works.filter((w) => w.tags.includes("kintone"));
  const others = works.filter((w) => !w.tags.includes("kintone"));
  const [featured, ...restKintone] = kintone;
  const featuredHref = featured ? featured.link ?? `/works/${featured.slug}` : "/";
  const stats = site.stats.map((x) => ({ ...x, value: x.value === "products" ? String(works.length) : x.value }));

  return (
    <main>
      <RevealObserver />

      <HeroSlider intro={{ headline: site.hero.headline, lead: site.hero.lead }} slides={slides} stats={stats} />

      <section id="service" className="section service">
        <div className="section-inner">
          <SectionHead eyebrow="SERVICE" title="できること" lead="kintoneを中心に、標準機能では届かないところを補い、手作業を減らす仕組みをつくります。" />
          <ul className="service-list">
            {site.services.map((s, i) => (
              <li key={s.title} data-reveal className={i === 0 ? "featured" : undefined}>
                <span className="service-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div className="service-icon">{icons[s.icon]}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {i === 0 || !s.chips ? (
                  <ul className="points">
                    {s.points.map((p, k) => (
                      <li key={p} style={{ "--k": k } as React.CSSProperties}>{p}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="chips">
                    {s.chips.map((c, k) => (
                      <li key={c} style={{ "--k": k } as React.CSSProperties}>{c}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="process" className="section process">
        <div className="section-inner">
          <SectionHead dark eyebrow="PROCESS" title="進め方" lead="ご相談から公開後の改善まで、窓口はひとつです。伝言で話がずれることがありません。" />
          <div className="process-track" data-reveal>
          <span className="robot" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <g className="robot-waves">
                <path d="M27 6.5a6 6 0 0 1 0 7" />
                <path d="M30 4a10 10 0 0 1 0 12" />
              </g>
              <g className="robot-body">
                <line x1="20" y1="9" x2="20" y2="4" />
                <circle className="robot-tip" cx="20" cy="3.5" r="2" />
                <rect className="robot-head" x="10" y="9" width="20" height="15" rx="5" />
                <circle className="robot-eye" cx="16" cy="16.5" r="2" />
                <circle className="robot-eye" cx="24" cy="16.5" r="2" />
                <rect className="robot-base" x="12" y="25" width="16" height="6" rx="2" />
              </g>
              <circle className="robot-wheel" cx="15" cy="34" r="3.2" />
              <circle className="robot-wheel" cx="25" cy="34" r="3.2" />
            </svg>
          </span>
          <ol className="process-list">
            {site.process.map((p, i) => (
              <li key={p.title} style={{ "--i": i } as React.CSSProperties}>
                <span className="step">{String(i + 1).padStart(2, "0")}</span>
                <div className="step-body">
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>

      <section id="change" className="section change">
        <div className="section-inner">
          <SectionHead eyebrow="BEFORE / AFTER" title="手作業が、こう変わる" lead="kintoneでよくある手作業が、それぞれのプロダクトでどう変わるかをまとめました。押すと詳しい説明を見られます。" />
          <BeforeAfter
            items={kintone.filter((w) => w.before && w.after).map((w) => ({
              slug: w.slug, before: w.before!, after: w.after!, metric: w.metric,
              name: kindOf.get(w.slug)?.name ?? w.title, kind: kindOf.get(w.slug)?.kind ?? "",
            }))}
          />
        </div>
      </section>

      <section id="works" className="section works">
        <div className="section-inner">
          <SectionHead eyebrow="WORKS" title="プロダクト" lead="自分で企画し、公開まで担当したkintone向けのツールや、そのほかのサービスです。" />

          {featured && (
            <div className="feature" data-reveal>
              <div className="feature-media">
                <div className="browser">
                  <span className="browser-bar" aria-hidden="true"><i /><i /><i /></span>
                  <div className="browser-screen">
                    {featured.demo ? (
                      <AutoVideo src={featured.demo} poster={featured.cover} label={`${featured.title}のデモ動画`} />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={featured.cover} alt="" />
                    )}
                  </div>
                </div>
              </div>
              <div className="feature-body">
                <ul className="card-tags">
                  <li className="hot">注目</li>
                  {featured.demo && <li className="plain">デモ動画あり</li>}
                  {featured.tags.slice(0, 2).map((t) => <li key={t} className="plain">{t}</li>)}
                </ul>
                {kindOf.get(featured.slug) && (
                  <p className="feature-catch">
                    {kindOf.get(featured.slug)!.catch.split("\n").map((l) => <span key={l}>{l}</span>)}
                  </p>
                )}
                <h3>{featured.title}</h3>
                <p>{featured.summary}</p>
                {featured.link ? (
                  <a className="button navy arrow" href={featuredHref} target="_blank" rel="noopener noreferrer">詳しく見る<span className="sr">（新しいタブで開きます）</span></a>
                ) : (
                  <Link className="button navy arrow" href={featuredHref}>詳しく見る</Link>
                )}
              </div>
            </div>
          )}

          <WorkGrid
            works={restKintone.map((w) => {
              const kind = kindOf.get(w.slug)?.kind.replace(/^無料サンプルJS$/, "カスタマイズJS");
              const status = w.tags.find((t) => STATUS.includes(t));
              return {
                slug: w.slug, title: w.title, summary: w.summary, cover: w.cover, link: w.link,
                tags: [kind ?? w.tags[0], status === "無料サンプル" ? "無料" : status ?? w.tags.find((t) => t !== "kintone" && t !== "プラグイン")].filter(Boolean) as string[],
                status,
                demo: w.demo, still: w.firstImage ?? w.image, highlights: w.highlights,
              };
            })}
          />

          {others.length > 0 && (
            <div className="others" data-reveal>
              <h3 className="others-title">
                そのほかのツール<span>{others.length}</span>
              </h3>
              <OthersList
                tools={others.map((w) => ({
                  slug: w.slug, title: shortTitle(w.title), tag: shortTag(w.tags[0]), summary: w.summary,
                  image: w.firstImage ?? w.image ?? w.cover, highlights: w.highlights,
                  icon: toolIcons[w.slug] ?? toolIconFallback,
                }))}
              />
            </div>
          )}
        </div>
      </section>

      <section id="about" className="section about">
        <div className="section-inner about-inner">
          <div className="about-text" data-reveal>
            <p className="eyebrow">ABOUT</p>
            <h2>私について</h2>
            <h3>
              {site.about.title.split("、").map((l, i, a) => <span key={l}>{l}{i < a.length - 1 ? "、" : ""}</span>)}
            </h3>
            <p>{site.about.body[0]}</p>
            <Link href="/about" className="text-link">
              プロフィールと、趣味でつくったものを見る
            </Link>
            <div className="about-illust" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <span className="about-illust-inner">
                <img src="/about-illust.webp" alt="" width={1503} height={964} loading="lazy" decoding="async" />
                <IllustFlow />
              </span>
            </div>
          </div>
          <ol className="about-points">
            {site.aboutPoints.map((pt, i) => (
              <li key={pt.title} data-reveal>
                <span className="about-no">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{pt.title}</h4>
                  <p>{pt.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
