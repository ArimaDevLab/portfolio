import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import ChatReplay from "@/components/about/ChatReplay";
import EasterEggs from "@/components/about/EasterEggs";
import Favorites from "@/components/about/Favorites";
import StickerBoard from "@/components/about/StickerBoard";
import Timeline from "@/components/about/Timeline";
import ContactBand from "@/components/ContactBand";
import RevealObserver from "@/components/RevealObserver";
import SectionHead from "@/components/SectionHead";
import { getHobbyWorks, getWorks } from "@/lib/works";
import { site } from "@/site.config";
import "./about.css";

export const metadata: Metadata = {
  title: `私について | ${site.name}`,
  description: site.profile.lead,
};

export default function AboutPage() {
  const hobby = getHobbyWorks();
  const all = [...getWorks()].sort((a, b) => a.date.localeCompare(b.date) || a.title.localeCompare(b.title));

  return (
    <main className="ab">
      <RevealObserver />
      <EasterEggs />

      <AboutHero lead={site.profile.lead} name={site.name} />

      <section className="section ab-style">
        <div className="section-inner">
          <SectionHead eyebrow="STYLE" title="人が決めて、AIが書く" lead="何をつくるか、どう動くべきか、何を正解とするかは自分で決めます。AIには実装と測定を任せ、出てきた数字を見て次を決めます。" />
          <div className="ab-style-grid">
            <div className="ab-style-text" data-reveal>
              <h3>{site.about.title}</h3>
              {site.about.body.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div data-reveal><ChatReplay /></div>
          </div>
          <ul className="ab-points">
            {site.profile.points.map((pt, i) => (
              <li key={pt.title} data-reveal>
                <span className="about-no">{String(i + 1).padStart(2, "0")}</span>
                <h4>{pt.title}</h4>
                <p>{pt.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section ab-fav">
        <div className="section-inner">
          <SectionHead eyebrow="FAVORITES" title="好きなもの・こと" lead="仕事の話ばかりでもなんなので、好きなものとハマっていることを少しだけ。カードは触ると動きます。" />
          <Favorites />
        </div>
      </section>

      <section className="section ab-tl">
        <div className="section-inner">
          <SectionHead eyebrow="TIMELINE" title="つくったもの年表" lead="仕事の道具も趣味の作品も、日付順に並べました。ロボットと一緒にスクロールしてみてください。" />
          <Timeline items={all.map((w) => ({ slug: w.slug, title: w.title, date: w.date, cover: w.cover, hobby: w.hobby, link: w.link }))} />
        </div>
      </section>

      <section id="hobby" className="section ab-hobby">
        <div className="section-inner">
          <SectionHead eyebrow="HOBBY" title={site.profile.hobby.title} lead={site.profile.hobby.body} />
          <StickerBoard items={hobby.map((w) => ({ slug: w.slug, title: w.title, summary: w.summary, cover: w.cover, link: w.link }))} />
          <p className="ab-secret" aria-hidden="true">ヒント：↑↑↓↓←→←→BA</p>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
