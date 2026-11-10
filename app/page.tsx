import Link from "next/link";
import AutoVideo from "@/components/AutoVideo";
import ContactBand from "@/components/ContactBand";
import SectionHead from "@/components/SectionHead";
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
          <ol className="process-list" data-reveal>
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
              <ul className="others-list">
                {others.map((w) => (
                  <li key={w.slug}>
                    <Link href={`/works/${w.slug}`}>
                      <span className="others-tag">{shortTag(w.tags[0])}</span>
                      <span className="others-name">{shortTitle(w.title)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
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
              <img src="/about-illust.webp" alt="" width={1503} height={964} loading="lazy" decoding="async" />
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
