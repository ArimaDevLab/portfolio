// セクションの見出し：左に英字の小見出しと日本語の見出し、右に説明
export default function SectionHead({ eyebrow, title, lead, dark }: { eyebrow: string; title: string; lead?: string; dark?: boolean }) {
  return (
    <div className={`section-head${dark ? " dark" : ""}`} data-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}
