// app/public/co-edit/new/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

// ▼ Markdown を HTML に変換する
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// ▼ カスタム Markdown 変換
import {
  transformColors,
  transformDirectives,
} from "@/app/_utils/markdown";

// ▼ 初期テンプレート
const initialMarkdown = `# 問題タイトル（例：極限と微分の「0/0」の本質を押さえる問題）

## 問題のねらい
この問題を通して、学んでほしいポイント・狙いを書きます。

- 例：0/0 型の極限を、「計算できない」ではなく「関数の形を読み解くサイン」として捉えること
- 例：因数分解やグラフのイメージと結びつけること など

## 問題文
ここに問題文（または概要）を書きます。
実際の画像は別途アップロードされる前提で、「どんな問題か」が分かるようにまとめます。

## 解説
### 1. まずは素直に計算してみる

途中式・考え方・図のイメージを、できるだけ「自分の言葉」で説明してください。

### 2. グラフ・イメージとのつながり

グラフの形、x→a のときの様子など、「頭の中でどう見えているか」も説明すると、
読む人が理解しやすくなります。

### 3. ここが本質！

:::note
ここは注意ポイントの説明！
:::

:::info
補足説明や追加情報を書くときはこちら！
:::

## よくあるミス
- 例：0/0 型になった瞬間に「極限は存在しない」と決めつけてしまう。
- 例：約分できるのに、いきなりロピタルを使おうとする。 など

## ポイントのまとめ
1. この問題で一番大事な一文
2. 他の問題でも使える視点
3. 後輩に一言メッセージがあるとなお良いです。
`;

// ▼ Markdown内の h1/h2/h3 などのスタイルを明示的に指定
const markdownComponents: Components = {
  h1: ({ node, ...props }) => (
    <h1
      className="mt-6 mb-3 text-2xl font-bold text-slate-900"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      className="mt-5 mb-2 text-xl font-semibold text-slate-900 border-b border-slate-200 pb-1"
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3
      className="mt-4 mb-1.5 text-lg font-semibold text-slate-900"
      {...props}
    />
  ),
  p: ({ node, ...props }) => (
    <p className="mb-3 text-sm leading-relaxed text-slate-900" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="mb-3 list-disc pl-5 text-sm text-slate-900" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="mb-3 list-decimal pl-5 text-sm text-slate-900" {...props} />
  ),
  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
  strong: ({ node, ...props }) => (
    <strong className="font-semibold text-slate-900" {...props} />
  ),
};

export default function CoEditNewPage() {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [fullscreen, setFullscreen] = useState(false);

  // ▼ 投稿データ（簡易版）
  const [reviewerCount, setReviewerCount] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [subject, setSubject] = useState<string>("math");
  const [topic, setTopic] = useState<string>("");

  // ▼ Markdown 変換処理（note/info + 色つきテキスト）
  const transformed = transformColors(transformDirectives(markdown));

  const handleSubmit = () => {
    alert(
      "今はデモ版なので投稿は保存されません。\n\n" +
        "以下の内容が送信される想定です：\n" +
        `・添削人数: ${reviewerCount ?? "未選択"}\n` +
        `・教科: ${subject}\n` +
        `・単元: ${topic}\n` +
        `・画像: ${imageFile?.name ?? "なし"}`
    );
  };

  return (
    <main className="relative min-h-screen bg-slate-950 py-8 px-4 text-slate-50">
      <div className="mx-auto max-w-6xl space-y-6 pb-24">
        {/* 上部：戻る導線 */}
        <div className="flex items-center justify-between">
          <Link
            href="/public/co-edit"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-1.5 text-xs font-medium text-slate-300 transition hover:border-fuchsia-500 hover:text-fuchsia-300"
          >
            <span className="text-lg leading-none">←</span>
            <span>Co-Edit に戻る</span>
          </Link>

          <span className="text-[11px] text-slate-500">
            新規解説 / Co-Edit Editor
          </span>
        </div>

        {/* タイトル */}
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Co-Edit Editor</h1>
          <p className="text-sm text-slate-400">
            左側で Markdown を入力し、右側でリアルタイムプレビューを確認できます。
          </p>
        </header>

        {/* 2カラム（入力 / プレビュー） */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* 左：Markdown 入力欄 */}
          <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-slate-100">
              ✍️ 解説入力（Markdown）
            </h2>

            <textarea
              className="mt-3 h-[70vh] w-full flex-1 resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>

          {/* 右：プレビュー表示（通常） */}
          <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                👀 プレビュー
              </h2>

              {/* 全画面トグル */}
              <button
                onClick={() => setFullscreen(true)}
                className="rounded-full p-1.5 text-slate-300 transition hover:bg-slate-800"
                aria-label="全画面でプレビュー"
              >
                {/* 拡大アイコン */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path d="M9 3H5a2 2 0 0 0-2 2v4" />
                  <path d="M15 3h4a2 2 0 0 1 2 2v4" />
                  <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
                  <path d="M15 21h4a2 2 0 0 0 2-2v-4" />
                </svg>
              </button>
            </div>

            {/* プレビュー本体 */}
            <div className="mt-3 h-[70vh] overflow-auto rounded-xl border border-gray-300 bg-white px-4 py-3 text-black">
              {/* ヘッダー（プレビュー用） */}
              <div className="mb-4 rounded-xl border border-slate-200 bg-slate-950 px-4 py-3 text-slate-50">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300">
                      co-study platform
                    </p>
                    <p className="text-sm font-bold tracking-wide">
                      高専から編入せよ！
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-300">
                    解説プレビュー
                  </span>
                </div>
              </div>

              {/* Markdown → HTML */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {transformed}
              </ReactMarkdown>
            </div>
          </div>
        </section>

        {/* 追加設定エリア（添削人数 / 画像 / 教科など） */}
        <section className="mt-4 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h2 className="text-sm font-semibold text-slate-100">
            📌 添削リクエスト設定
          </h2>

          {/* 添削依頼人数 */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-300">添削依頼人数</p>
            <div className="flex flex-wrap gap-3">
              {[2, 3, 4, 5].map((n) => (
                <label
                  key={n}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-600 bg-slate-950/60 px-3 py-1 text-xs text-slate-100 hover:border-fuchsia-500"
                >
                  <input
                    type="checkbox"
                    checked={reviewerCount === n}
                    onChange={() =>
                      setReviewerCount((prev) => (prev === n ? null : n))
                    }
                  />
                  {n}人に添削してほしい
                </label>
              ))}
            </div>
          </div>

          {/* 画像アップロード */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-300">問題画像</p>

            <div className="flex items-center gap-3">
              <input
                id="problem-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
              <label
                htmlFor="problem-image"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-600 bg-slate-950/70 px-4 py-1.5 text-xs font-medium text-slate-100 hover:border-fuchsia-500 hover:text-fuchsia-200"
              >
                🖼 画像を選ぶ
              </label>

              {imageFile ? (
                <p className="text-xs text-slate-400">
                  選択中:{" "}
                  <span className="font-medium">{imageFile.name}</span>
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  例）ホワイトボードをスマホで撮影した画像など
                </p>
              )}
            </div>
          </div>

          {/* 教科・単元（簡易版） */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-slate-300">教科</p>
              <select
                className="w-full rounded-lg border border-slate-600 bg-slate-950/80 px-3 py-2 text-xs text-slate-100"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setTopic("");
                }}
              >
                <option value="math">数学</option>
                <option value="physics">物理</option>
                <option value="chemistry">化学</option>
                <option value="cs">情報</option>
                <option value="essay">小論文</option>
              </select>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-300">単元</p>
              <input
                className="w-full rounded-lg border border-slate-600 bg-slate-950/80 px-3 py-2 text-xs text-slate-100"
                placeholder="例）線形代数、電磁気学、ネットワーク..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
          </div>
        </section>
      </div>

      {/* 投稿ボタン */}
      <button
        onClick={handleSubmit}
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/40 hover:bg-fuchsia-700 hover:shadow-fuchsia-500/60"
      >
        📤 投稿（添削お願い）
      </button>

      {/* 全画面プレビュー：オーバーレイ */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative flex h-[90vh] w-[min(960px,100%-2rem)] flex-col rounded-2xl bg-white p-4 text-black shadow-2xl">
            {/* 上部ヘッダー */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">👀 全画面プレビュー</h2>
              <button
                onClick={() => setFullscreen(false)}
                className="rounded-full p-1.5 text-slate-700 transition hover:bg-slate-200"
                aria-label="全画面プレビューを閉じる"
              >
                {/* 閉じる（縮小）アイコン */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path d="M5 9V5h4" />
                  <path d="M19 9V5h-4" />
                  <path d="M5 15v4h4" />
                  <path d="M19 15v4h-4" />
                </svg>
              </button>
            </div>

            {/* プレビュー本体（全画面） */}
            <div className="mt-3 flex-1 overflow-auto rounded-xl border border-gray-300 bg-white px-4 py-3">
              {/* ヘッダー（プレビュー用） */}
              <div className="mb-4 rounded-xl border border-slate-200 bg-slate-950 px-4 py-3 text-slate-50">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300">
                      co-study platform
                    </p>
                    <p className="text-sm font-bold tracking-wide">
                      高専から編入せよ！
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-300">
                    解説プレビュー（全画面）
                  </span>
                </div>
              </div>

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {transformed}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
