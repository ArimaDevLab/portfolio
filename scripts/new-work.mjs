// 使い方: npm run new-work -- my-new-app "作品タイトル"
import fs from "node:fs";
import path from "node:path";

const [slug, title = "作品タイトル"] = process.argv.slice(2);
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('使い方: npm run new-work -- my-new-app "作品タイトル"\n(1つ目は半角英数字とハイフンのURL用の名前)');
  process.exit(1);
}
const file = path.join("content", "works", `${slug}.md`);
if (fs.existsSync(file)) {
  console.error(`${file} はすでにあります。`);
  process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
date: ${today}
summary: "一覧に表示する1〜2行の説明"
cover: /works/${slug}.png
url: ""
tags: []
# order: 1  ← 一覧での並び順。番号を入れると、その位置に並びます(省略すると番号付きの作品の後ろ)
draft: false
---

ここに作品の説明を書きます(Markdown)。

## 課題

## つくったもの

## 使った技術
`
);
console.log(`作成しました: ${file}\n次に public/works/${slug}.png (推奨 1600×1000) を置いて、git push してください。`);
