// app/public/co-edit/new/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

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

- 公式の丸暗記ではなく、なぜそうなるのか
- 他の問題にも応用できる視点

などを書いてみましょう。

## よくあるミス
- 例：0/0 型になった瞬間に「極限は存在しない」と決めつけてしまう。
- 例：約分できるのに、いきなりロピタルを使おうとする。 など

## ポイントのまとめ
1. この問題で一番大事な一文
2. 他の問題でも使える視点
3. 後輩に一言メッセージがあるとなお良いです。`;

// 教科・単元の候補
const subjects = [
  { value: "math", label: "数学" },
  { value: "physics", label: "物理" },
  { value: "chemistry", label: "化学" },
  { value: "cs", label: "情報" },
  { value: "essay", label: "小論文" },
];

const topicsBySubject: Record<string, { value: string; label: string }[]> = {
  math: [
    { value: "linear_algebra", label: "線形代数" },
    { value: "fourier", label: "フーリエ解析" },
    { value: "calculus", label: "微分積分" },
    { value: "complex", label: "複素解析" },
    { value: "probability", label: "確率" },
  ],
  physics: [
    { value: "mechanics", label: "力学" },
    { value: "thermodynamics", label: "熱力学" },
    { value: "electromagnetics", label: "電磁気学" },
    { value: "materials", label: "材料力学" },
    { value: "waves", label: "波動" },
  ],
  chemistry: [
    { value: "inorganic", label: "無機化学" },
    { value: "organic", label: "有機化学" },
    { value: "physical", label: "物理化学" },
    { value: "analytical", label: "分析化学" },
  ],
  cs: [
    { value: "network", label: "コンピュータネットワーク" },
    { value: "algorithms", label: "アルゴリズムとデータ構造" },
    { value: "os", label: "オペレーティングシステム" },
    { value: "security", label: "情報セキュリティ" },
    { value: "database", label: "データベース" },
  ],
  essay: [
    { value: "society", label: "社会・時事" },
    { value: "sci_tech", label: "科学技術" },
    { value: "ethics", label: "倫理・価値観" },
    { value: "education", label: "教育・学び" },
  ],
};

function renderMarkdown(md: string) {
  const blocks = md.split("\n\n");

  return blocks.map((block, idx) => {
    // 見出し level 1
    if (block.startsWith("# ")) {
      const text = block.replace(/^# /, "");
      return (
        <h1
          key={idx}
          className="mt-4 mb-2 border-b border-gray-300 pb-1 text-2xl font-bold text-black"
        >
          {text}
        </h1>
      );
    }

    // 見出し level 2
    if (block.startsWith("## ")) {
      const text = block.replace(/^## /, "");
      return (
        <h2
          key={idx}
          className="mt-4 mb-2 text-xl font-semibold text-black"
        >
          {text}
        </h2>
      );
    }

    // 見出し level 3
    if (block.startsWith("### ")) {
      const text = block.replace(/^### /, "");
      return (
        <h3
          key={idx}
          className="mt-3 mb-1 text-lg font-semibold text-black"
        >
          {text}
        </h3>
      );
    }

    // 箇条書き
    if (block.trim().startsWith("- ")) {
      const lines = block.split("\n").filter((l) => l.trim().startsWith("- "));
      return (
        <ul
          key={idx}
          className="my-2 list-disc list-inside space-y-1 text-sm text-black"
        >
          {lines.map((line, i) => (
            <li key={i}>{line.replace(/^- /, "")}</li>
          ))}
        </ul>
      );
    }

    // 番号付きリスト
    if (block.trim().match(/^[0-9]+\. /)) {
      const lines = block
        .split("\n")
        .filter((l) => l.trim().match(/^[0-9]+\. /));
      return (
        <ol
          key={idx}
          className="my-2 list-decimal list-inside space-y-1 text-sm text-black"
        >
          {lines.map((line, i) => (
            <li key={i}>{line.replace(/^[0-9]+\. /, "")}</li>
          ))}
        </ol>
      );
    }

    // 通常テキスト
    return (
      <p
        key={idx}
        className="my-2 whitespace-pre-wrap text-sm leading-relaxed text-black"
      >
        {block}
      </p>
    );
  });
}

export default function CoEditNewPage() {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [fullscreen, setFullscreen] = useState(false);

  // 新しく追加するステート
  const [reviewerCount, setReviewerCount] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [subject, setSubject] = useState<string>("math");
  const [topic, setTopic] = useState<string>("");

  const currentTopics = topicsBySubject[subject] ?? [];

  const handleSubmit = () => {
    console.log("投稿内容（Markdown）:", markdown);
    console.log("添削依頼人数:", reviewerCount);
    console.log("教科:", subject);
    console.log("単元:", topic);
    console.log("画像ファイル:", imageFile);

    alert(
      "今はデモ版なので、実際の投稿はまだ実装していません。\n\n" +
        "▼ 送信されるイメージ\n" +
        `・Markdown解説\n` +
        `・添削依頼人数: ${reviewerCount ?? "未選択"}人\n` +
        `・教科: ${
          subjects.find((s) => s.value === subject)?.label ?? "未選択"
        }\n` +
        `・単元: ${
          currentTopics.find((t) => t.value === topic)?.label ?? "未選択"
        }\n` +
        `・画像: ${imageFile ? imageFile.name : "なし"}`
    );
  };

  return (
    <main className="relative min-h-screen bg-slate-950 py-8 px-4 text-slate-50">
      <div className="mx-auto max-w-6xl space-y-6 pb-24">
        {/* 上部：戻る導線＋タイトル */}
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

        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Co-Edit Editor</h1>
          <p className="text-sm text-slate-400">
            左側でマークダウン形式で解説を書き、右側でプレビューを確認できます。
          </p>
        </header>

        {/* メイン：2カラム（入力 / プレビュー） */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* 左：Markdown入力 */}
          <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                ✍️ 解説入力（Markdown）
              </h2>
              <span className="text-[11px] text-slate-500">
                テンプレは自由に書き換えてOK
              </span>
            </div>

            <textarea
              className="mt-3 h-[70vh] w-full flex-1 resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-0 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>

          {/* 右：プレビュー（白背景＋黒文字・全画面対応） */}
          <div
            className={`flex flex-col border border-slate-800 bg-slate-900/70 p-4 transition ${
              fullscreen
                ? "fixed inset-0 z-50 m-0 rounded-none bg-white text-black"
                : "rounded-2xl"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2
                className={`text-sm font-semibold ${
                  fullscreen ? "text-black" : "text-slate-100"
                }`}
              >
                👀 プレビュー
              </h2>

              {/* 全画面トグルボタン */}
              <button
                type="button"
                onClick={() => setFullscreen((prev) => !prev)}
                className={`rounded-full p-1.5 text-slate-300 transition hover:text-fuchsia-500 ${
                  fullscreen ? "hover:bg-slate-200" : "hover:bg-slate-800"
                }`}
                title={fullscreen ? "全画面を閉じる" : "全画面表示にする"}
              >
                {/* フルスクリーン風アイコン */}
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

            <div
              className={`mt-3 flex-1 overflow-auto rounded-xl border border-gray-300 bg-white px-4 py-3 text-black ${
                fullscreen ? "" : "h-[70vh]"
              }`}
              style={fullscreen ? { height: "calc(100vh - 96px)" } : undefined}
            >
              {/* ▼ ここが追加した「高専から編入せよ！」ヘッダバナー */}
              <div className="mb-4 rounded-xl border border-slate-200 bg-slate-950 px-4 py-3 text-slate-50">
                <div className="flex items-baseline justify-between gap-3">
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

              {/* ▼ ここから先が実際のMarkdownプレビュー */}
              {renderMarkdown(markdown)}
            </div>
          </div>
        </section>

        {/* ▼ Markdown解説の下に追加するエリア */}
        <section className="mt-4 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
          <h2 className="text-sm font-semibold text-slate-100">
            📌 添削リクエスト設定
          </h2>

          {/* 添削依頼人数（2〜5人） */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-300">
              添削依頼人数{" "}
              <span className="text-[11px] text-slate-500">(2〜5人から選択)</span>
            </p>
            <div className="flex flex-wrap gap-4">
              {[2, 3, 4, 5].map((n) => (
                <label
                  key={n}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-600 bg-slate-950/60 px-3 py-1 text-xs text-slate-100 transition hover:border-fuchsia-500"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-500 bg-slate-900 text-fuchsia-500"
                    checked={reviewerCount === n}
                    onChange={() =>
                      setReviewerCount((prev) => (prev === n ? null : n))
                    }
                  />
                  <span>{n}人に添削してほしい</span>
                </label>
              ))}
            </div>
          </div>

          {/* 問題の画像アップロード（1枚まで） */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-300">
              問題画像のアップロード{" "}
              <span className="text-[11px] text-slate-500">(1枚まで)</span>
            </p>

            <div className="flex items-center gap-3">
              <input
                id="problem-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setImageFile(file);
                }}
              />
              <label
                htmlFor="problem-image"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-600 bg-slate-950/70 px-4 py-1.5 text-xs font-medium text-slate-100 transition hover:border-fuchsia-500 hover:text-fuchsia-200"
              >
                <span>🖼 画像を選ぶ</span>
              </label>

              {imageFile && (
                <p className="text-xs text-slate-400">
                  選択中: <span className="font-medium">{imageFile.name}</span>
                </p>
              )}
              {!imageFile && (
                <p className="text-xs text-slate-500">
                  例）ホワイトボードに書いた問題をスマホで撮影した画像など
                </p>
              )}
            </div>
          </div>

          {/* 教科・単元選択 */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* 教科 */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-300">教科</p>
              <select
                className="w-full rounded-lg border border-slate-600 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
                value={subject}
                onChange={(e) => {
                  const value = e.target.value;
                  setSubject(value);
                  setTopic("");
                }}
              >
                {subjects.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 単元 */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-300">単元</p>
              <select
                className="w-full rounded-lg border border-slate-600 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option value="" disabled>
                  単元を選択
                </option>
                {currentTopics.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      </div>

      {/* 右下：投稿ボタン */}
      <button
        type="button"
        onClick={handleSubmit}
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-semibold text-slate-50 shadow-lg shadow-fuchsia-500/40 transition hover:bg-fuchsia-700 hover:shadow-fuchsia-500/60 active:scale-95"
      >
        <span>📤 投稿（添削お願い）をする</span>
      </button>
    </main>
  );
}
