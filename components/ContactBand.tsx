import Link from "next/link";
import { site } from "@/site.config";
import { Robot } from "./about/Doodles";

// ページの最後に置く相談の帯
export default function ContactBand() {
  const [first, ...rest] = site.contact.title.split("、");
  return (
    <section id="contact" className="contact">
      <div className="contact-inner" data-reveal>
        <div className="contact-text">
          <p className="eyebrow">CONTACT</p>
          <h2>
            {rest.length ? (<><span>{first}、</span><span>{rest.join("、")}</span></>) : first}
          </h2>
          <p>{site.contact.body}</p>
        </div>
        <div className="contact-action">
          <span className="press">
            <span className="press-bot" aria-hidden="true"><Robot /></span>
            <span className="press-pochi" aria-hidden="true">ポチッ</span>
            <span className="press-ripple" aria-hidden="true" />
            <Link className="button primary large arrow" href="/contact">
              フォームで相談する
            </Link>
          </span>
          <p className="contact-mail">
            メール：<a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
