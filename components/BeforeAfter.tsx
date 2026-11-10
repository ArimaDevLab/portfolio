import Link from "next/link";

export type BA = { slug: string; name: string; kind: string; before: string; after: string; metric?: string; win?: string };

// 種類ごとの色（kind の文字で決める）
const KINDS: { key: string; label: string; match: RegExp }[] = [
  { key: "check", label: "診断ツール", match: /診断/ },
  { key: "plugin", label: "プラグイン", match: /プラグイン/ },
  { key: "free", label: "無料サンプルJS", match: /無料/ },
  { key: "js", label: "カスタマイズJS", match: /JS/ },
];
const kindKey = (k: string) => KINDS.find((x) => x.match.test(k))?.key ?? "plugin";

// プロダクトごとのアイコン（線画）
const ICONS: Record<string, React.ReactNode> = {
  "kintone-check": (<><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></>),
  "address-cleaner": (<><path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.4" /></>),
  "kintone-business-days": (<><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4M8.5 14h2M13.5 14h2M8.5 17h2" /></>),
  "pdf-compare-viewer": (<><rect x="3.5" y="5" width="8" height="14" rx="1.5" /><rect x="12.5" y="5" width="8" height="14" rx="1.5" /><path d="M6 9h3M6 12h3M15 9h3M15 12h3" /></>),
  "kintone-cross-search": (<><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.6-4.6" /></>),
  "kintone-redact": (<><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M8 8h8" /><rect x="8" y="11" width="8" height="3" rx="0.5" fill="currentColor" /><path d="M8 17h5" /></>),
};

/** 手作業（BEFORE）が、プロダクトでどう変わるか（AFTER） */
export default function BeforeAfter({ items }: { items: BA[] }) {
  const used = KINDS.filter((k) => items.some((x) => kindKey(x.kind) === k.key));
  return (
    <>
      <p className="ba-legend" data-reveal>
        <span>種類</span>
        {used.map((k) => <span key={k.key} className={`ba-chip k-${k.key}`}>{k.label}</span>)}
      </p>
      <ul className="ba-list">
        {items.map((x, i) => {
          const k = kindKey(x.kind);
          const [amount, time] = x.metric?.split("|") ?? [];
          return (
            <li key={x.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <Link href={`/works/${x.slug}`} className={`ba-card k-${k}`}>
                <span className="ba-head">
                  <span className="ba-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">{ICONS[x.slug] ?? ICONS["address-cleaner"]}</svg>
                  </span>
                  <span>
                    <span className={`ba-chip k-${k}`}>{x.kind}</span>
                    <span className="ba-name">{x.name}</span>
                  </span>
                </span>

                <span className="ba-before">
                  <span className="ba-tag">BEFORE</span>
                  <span className="ba-text">{x.before}</span>
                </span>
                <span className="ba-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 6v12M7 13l5 5 5-5" /></svg>
                </span>
                <span className="ba-after">
                  <span className="ba-tag">AFTER</span>
                  <span className="ba-text">{x.after}</span>
                  {(amount || x.win) && (
                    <span className="ba-win">
                      {amount ? (<><b>{amount}</b>を<b>{time}</b><small>テスト用kintoneでの実測</small></>) : <b>{x.win}</b>}
                    </span>
                  )}
                </span>
                <span className="ba-more">詳しく見る</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
