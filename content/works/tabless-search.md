---
title: "タブ無し検索（Seamless Region Search）"
date: 2026-10-07
summary: "Altを押しながらページの一部をドラッグすると、その場で検索結果が開くChrome拡張。"
cover: /works/tabless-search.png
url: "https://chromewebstore.google.com/detail/seamless-region-search/ijfanfmkkahbkpnnmelmloddfihfpmkj"
tags: ["ブラウザ拡張", "検索"]
order: 8
draft: false
---

読んでいるページを離れずに調べものができるChrome拡張です。Alt(MacはOption)を押しながら気になる部分をドラッグすると、その範囲の文字で検索し、結果をすぐ横の小さなウィンドウに表示します。新しいタブは開きません。Chromeウェブストアで公開しています。

## 使い方

Altを押しながら、調べたい部分をドラッグで囲みます。

![記事の一部を赤い枠で囲んでいるところ](/works/tabless-search-select.png)

囲んだ文字から検索語がつくられ、結果がすぐ横に開きます。検索語はその場で直して再検索できます。

![選んだ部分の横に検索結果のウィンドウが開いたところ](/works/tabless-search-results.png)

結果をクリックすると、同じウィンドウの中で本文を読みやすい形でプレビューできます。

![ウィンドウの中で記事の本文をプレビューしているところ](/works/tabless-search-preview.png)

ウィンドウは複数開いたままにでき、移動・大きさの変更・ピン留めができます。ピン留めしたものは、外側をクリックしても閉じません。

![ピン留めしたウィンドウと新しい検索結果を並べているところ](/works/tabless-search-pinned.png)

## できること

- 検索語や結果のURLをワンタップでコピーできます
- Escキーか外側のクリックで閉じます
- 表示は英語と日本語に対応しています

## 仕組み

検索にはBrave Search APIを使い、利用者が自分のAPIキーを設定します。ドラッグした範囲の文字とAPIキーだけがBrave Search APIに送られます。

![APIキーを入力する設定画面](/works/tabless-search-settings.png)
