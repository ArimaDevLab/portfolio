import Link from "next/link";
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

export default function Home() {
  const works = getMainWorks();
  const STATUS = ["販売準備中", "試作", "無料サンプル"];
  const slides: Slide[] = site.heroSlides.flatMap((h) => {
    const w = getWork(h.slug);
    if (!w) return [];
    return [{
      key: w.slug, kind: h.kind, name: h.name, catch: h.catch, title: w.title, summary: w.summary, cover: w.cover,
      href: w.link ?? `/works/${w.slug}`, external: Boolean(w.link),
      status: w.tags.find((t) => STATUS.includes(t)),
    }];
  });
  return (
    <main>
      <RevealObserver />

      <HeroSlider intro={{ headline: site.hero.headline, lead: site.hero.lead }} slides={slides} />

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
                  {s.points.map((p, k) => (
                    <li key={p} style={{ "--k": k } as React.CSSProperties}>{p}</li>
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
          <div className="section-head" data-reveal>
            <h2>プロダクト</h2>
            <p>自分で企画し、公開まで担当したkintone向けのツールや、そのほかのサービスです。</p>
          </div>
          <WorkGrid
            works={works.map((w) => ({
              slug: w.slug, title: w.title, summary: w.summary, cover: w.cover, tags: w.tags, link: w.link,
              demo: w.demo, still: w.firstImage ?? w.image, highlights: w.highlights,
            }))}
          />
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
