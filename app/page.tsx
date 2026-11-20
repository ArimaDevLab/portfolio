import Link from "next/link";
import BeforeAfter from "@/components/BeforeAfter";
import ContactBand from "@/components/ContactBand";
import ProductShowcase, { type ProductCategory } from "@/components/ProductShowcase";
import SectionHead from "@/components/SectionHead";
import ServiceRing from "@/components/ServiceRing";
import { Robot } from "@/components/about/Doodles";
import IllustFlow from "@/components/IllustFlow";
import HeroShowcase, { type ShowItem } from "@/components/HeroShowcase";
import RevealObserver from "@/components/RevealObserver";
import { fmtDate, getNews, KIND_LABEL } from "@/lib/news";
import { getMainWorks, getWork } from "@/lib/works";
import { site } from "@/site.config";


// 「そのほかのツール」のアイコン（線画）
const STATUS = ["販売準備中", "試作", "無料サンプル", "製作中"];

export default function Home() {
  const works = getMainWorks();
  const news = getNews().slice(0, 3);
  const kindOf = new Map(site.heroSlides.map((h) => [h.slug, h]));
  const showItems: ShowItem[] = site.heroSlides.flatMap((h) => {
    const w = getWork(h.slug);
    if (!w) return [];
    return [{ key: w.slug, name: h.name, title: w.title, say: h.say, screen: h.screen ?? w.cover, href: w.link ?? `/works/${w.slug}`, external: Boolean(w.link) }];
  });

  // プロダクト：kintone のものを上に大きく、そのほかは一覧で
  const kintone = works.filter((w) => w.tags.includes("kintone"));
  // つくったもの：系統ごとのタブ（site.config の productCategories の順）
  const categories: ProductCategory[] = site.productCategories.map((c) => ({
    key: c.key, label: c.label, lead: c.lead, main: "main" in c ? c.main : undefined,
    items: c.items.flatMap((it) => {
      const w = getWork(it.slug);
      if (!w) return [];
      const status = w.tags.find((t) => STATUS.includes(t));
      const badges = [
        ...("isNew" in it && it.isNew ? [{ text: "NEW", hot: true }] : []),
        ...(status ? [{ text: status === "無料サンプル" ? "無料" : status }] : w.tags.includes("無料") ? [{ text: "無料" }] : []),
      ];
      return [{
        slug: w.slug, name: it.name, summary: w.summary, cover: w.cover ?? "/og.jpg",
        href: w.link ?? `/works/${w.slug}`, external: Boolean(w.link), badges, press: w.press?.name, usage: w.usage,
      }];
    }),
  }));
  const total = categories.reduce((n, c) => n + c.items.length, 0);
  const pressWork = categories.flatMap((c) => c.items).find((i) => i.press);
  const pressSource = pressWork ? getWork(pressWork.slug) : undefined;
  const pressHighlight = pressWork && pressSource?.press ? {
    name: pressSource.press.name, work: pressWork.name, href: pressWork.href, usage: pressWork.usage,
    article: "2026年11月9日のダイジェストニュースで、記事の見出しに",
  } : undefined;
  const badges = site.hero.badges.map((b) => ({ ...b, big: b.big === "products" ? String(total) : b.big }));

  return (
    <main>
      <RevealObserver />

      <HeroShowcase notice={site.hero.notice} headline={site.hero.headline} accent={site.hero.accent} lead={site.hero.lead} chips={site.hero.chips} badges={badges} items={showItems} />

      <section id="service" className="section service">
        <div className="section-inner">
          <ServiceRing {...site.service} />
        </div>
      </section>

      <section id="process" className="section process">
        <div className="section-inner">
          <SectionHead dark eyebrow="PROCESS" title="進め方" lead="ご相談から公開後の改善まで、窓口はひとつです。伝言で話がずれることがありません。" />
          <div className="process-track" data-reveal>
          <span className="robot" aria-hidden="true">
            <Robot />
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
          <SectionHead eyebrow="BEFORE / AFTER" title="手作業が、こう変わる" accent="こう変わる" lead="kintone でよくある手作業が、それぞれのプロダクトでどう変わるかをまとめました。カードを押すと、詳しい説明を見られます。" />
          <BeforeAfter
            items={kintone.filter((w) => w.before && w.after).map((w) => ({
              slug: w.slug, before: w.before!, after: w.after!, metric: w.metric, win: w.win,
              name: kindOf.get(w.slug)?.name ?? w.title, kind: kindOf.get(w.slug)?.kind ?? "",
            }))}
          />
        </div>
      </section>

      <section id="works" className="section works">
        <div className="section-inner">
          <span className="pd-ghost" aria-hidden="true">PR<i>O</i>DUCTS</span>
          <div className="pd-intro">
            <SectionHead eyebrow="PRODUCTS" title="つくったもの" lead="本業はkintone。そのほかにも、業務効率化のツールやゲームを作っています。" />
            <p className="pd-count"><b>{total}</b>products</p>
          </div>

          <ProductShowcase categories={categories} total={total} press={pressHighlight} />
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

      {news.length > 0 && (
        <section id="news" className="section home-news">
          <div className="section-inner">
            <SectionHead eyebrow="NEWS" title="お知らせ" lead="新しいプロダクトの公開や、kintone の開発で分かったことのメモです。" />
            <ul className="hn-list">
              {news.map((n) => (
                <li key={n.slug} data-reveal>
                  <Link href={`/news/${n.slug}`} className="hn-card">
                    <span className="hn-meta">
                      <time dateTime={n.date}>{fmtDate(n.date)}</time>
                      <span className={`news-kind k-${n.kind}`}>{KIND_LABEL[n.kind]}</span>
                    </span>
                    <span className="hn-title">{n.title}</span>
                    <span className="hn-sum">{n.summary}</span>
                    <span className="hn-more">読む</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="hn-all" data-reveal><Link href="/news" className="text-link">お知らせをすべて見る</Link></p>
          </div>
        </section>
      )}

      <ContactBand />
    </main>
  );
}
