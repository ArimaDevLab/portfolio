// セクションの見出し：左に英字の小見出しと日本語の見出し、右に説明
export default function SectionHead({ eyebrow, title, lead, dark, accent }: { eyebrow: string; title: string; lead?: string; dark?: boolean; accent?: string }) {
  const parts = accent && title.includes(accent) ? title.split(accent) : null;
  return (
    <div className={`section-head${dark ? " dark" : ""}`} data-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{parts ? (<>{parts[0]}<em className="h-accent">{accent}</em>{parts[1]}</>) : title}</h2>
      </div>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}
