"use client";

import { useState } from "react";

const TOPICS = ["kintoneのカスタマイズ・プラグイン開発", "kintoneアプリの診断・見直し", "外部サービスとの連携", "その他"];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ endpoint, email }: { endpoint: string; email: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // ボット対策: 人には見えない欄に入力があれば送らない
    if (data.get("_gotcha")) return;

    // 送信先が未設定のあいだは、入力内容入りでメールアプリを開く
    if (!endpoint) {
      const body = [
        `お名前：${data.get("name")}`,
        `会社名：${data.get("company") || "（なし）"}`,
        `メールアドレス：${data.get("email")}`,
        `ご相談の種類：${data.get("topic")}`,
        "",
        String(data.get("message")),
      ].join("\n");
      const subject = `【ご相談】${data.get("topic")}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <h2>送信しました</h2>
        <p>お問い合わせありがとうございます。内容を確認し、通常2営業日以内にメールでお返事します。</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="name">
          お名前<span className="req">必須</span>
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="company">
          会社名<span className="opt">任意</span>
        </label>
        <input id="company" name="company" type="text" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="email">
          メールアドレス<span className="req">必須</span>
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <fieldset className="field">
        <legend>
          ご相談の種類<span className="req">必須</span>
        </legend>
        <div className="topics">
          {TOPICS.map((t, i) => (
            <label key={t} className="topic">
              <input type="radio" name="topic" value={t} required defaultChecked={i === 0} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label htmlFor="message">
          ご相談の内容<span className="req">必須</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={8}
          required
          placeholder="例：取引先ごとに違う締め日から支払日を自動で出したい。kintoneの申請アプリから、承認されたらSlackに通知したい。など"
        />
      </div>
      {/* ボット対策用の見えない欄 */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <input type="hidden" name="_subject" value="ポートフォリオからのお問い合わせ" />
      {status === "error" && (
        <p className="form-error" role="alert">
          送信できませんでした。時間をおいてもう一度お試しいただくか、{" "}
          <a href={`mailto:${email}`}>{email}</a> までメールでご連絡ください。
        </p>
      )}
      <button className="button primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "送信しています…" : endpoint ? "送信する" : "メールアプリで送信する"}
      </button>
    </form>
  );
}
