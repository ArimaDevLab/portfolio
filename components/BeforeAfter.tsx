import Link from "next/link";

export type BA = { slug: string; name: string; kind: string; before: string; after: string; metric?: string };

/** 手作業（BEFORE）が、プロダクトでどう変わるか（AFTER）。画面に入ると打ち消し線が引かれ、AFTER が出てくる */
export default function BeforeAfter({ items }: { items: BA[] }) {
  return (
    <ul className="ba-list">
      {items.map((x, i) => {
        const [amount, time] = x.metric?.split("|") ?? [];
        return (
          <li key={x.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
            <Link href={`/works/${x.slug}`} className="ba-card">
              <span className="ba-head">
                <span className="ba-kind">{x.kind}</span>
                <span className="ba-name">{x.name}</span>
              </span>
              <span className="ba-before">
                <span className="ba-tag">BEFORE</span>
                <span className="ba-text"><s>{x.before}</s></span>
              </span>
              <span className="ba-arrow" aria-hidden="true" />
              <span className="ba-after">
                <span className="ba-tag">AFTER</span>
                <span className="ba-text">{x.after}</span>
                {amount && (
                  <span className="ba-metric">
                    <b>{amount}</b><span>を</span><b>{time}</b><small>（テスト用kintoneでの実測）</small>
                  </span>
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
