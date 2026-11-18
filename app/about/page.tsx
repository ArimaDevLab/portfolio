import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import ChatReplay from "@/components/about/ChatReplay";
import EasterEggs from "@/components/about/EasterEggs";
import ContactBand from "@/components/ContactBand";
import RevealObserver from "@/components/RevealObserver";
import SectionHead from "@/components/SectionHead";
import { site } from "@/site.config";
import "./about.css";

export const metadata: Metadata = {
  title: `私について | ${site.name}`,
  description: site.profile.lead,
};

export default function AboutPage() {
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

      <section className="section ab-ai">
        <div className="section-inner">
          <SectionHead eyebrow="AI REVIEW" title="AIから見た、私" lead="毎日いっしょに作っているAIに、人柄と強みを聞いてみました。" />
          <div className="ab-ai-q" data-reveal>
            <span className="ab-ai-me">私</span>
            <p>{site.aiView.question}</p>
          </div>
          <ul className="ab-ai-list">
            {site.aiView.items.map((it, i) => (
              <li key={it.title} data-reveal style={{ "--k": i } as React.CSSProperties}>
                <span className={`ab-ai-tag${it.tag === "強み" ? " s" : ""}`}>{it.tag}</span>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </li>
            ))}
          </ul>
          <div className="ab-ai-aside" data-reveal>
            <b>{site.aiView.aside.title}</b>
            <p>{site.aiView.aside.body}</p>
          </div>
          <p className="ab-ai-note">{site.aiView.note}</p>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
