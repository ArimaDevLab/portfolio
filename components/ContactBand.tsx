import Link from "next/link";
import { site } from "@/site.config";

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
          <Link className="button primary large arrow" href="/contact">
            フォームで相談する
          </Link>
          <p className="contact-mail">
            メール：<a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
