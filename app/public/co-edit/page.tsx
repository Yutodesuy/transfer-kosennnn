// app/(private)/co-edit/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type DraftProblem = {
  id: string;
  code: string;
  title: string;
  subject: string;
  topic: string;
  level: string;
  author: string;
  needed: number;
  tags: string[];
};

// ダミーデータに topic を追加
const draftProblems: DraftProblem[] = [
  {
    id: "draft-001",
    code: "M-003",
    title: "ベクトルの内積の本質を理解する問題",
    subject: "数学",
    topic: "線形代数",
    level: "中級",
    author: "高知高専・片岡",
    needed: 1,
    tags: ["ベクトル", "内積", "幾何"],
  },
  {
    id: "draft-002",
    code: "P-010",
    title: "電場の微分方程式からの導出",
    subject: "物理",
    topic: "電磁気学",
    level: "発展",
    author: "阿南高専・田中",
    needed: 2,
    tags: ["電磁気", "電場"],
  },
  {
    id: "draft-003",
    code: "I-021",
    title: "ネットワークアドレス計算を体系的に理解する",
    subject: "情報",
    topic: "コンピュータネットワーク",
    level: "基礎",
    author: "福井高専・佐藤",
    needed: 1,
    tags: ["ネットワーク", "サブネット"],
  },
];

// 教科リスト
const subjects = ["すべて", "数学", "物理", "化学", "情報", "小論文"];

// 教科ごとの単元一覧
const topicsBySubject: Record<string, string[]> = {
  数学: ["線形代数", "フーリエ解析", "微分積分", "複素解析", "確率"],
  物理: ["力学", "熱力学", "電磁気学", "材料力学", "波動"],
  化学: ["無機化学", "有機化学", "物理化学", "分析化学"],
  情報: [
    "コンピュータネットワーク",
    "アルゴリズムとデータ構造",
    "オペレーティングシステム",
    "情報セキュリティ",
    "データベース",
  ],
  小論文: ["社会・時事", "科学技術", "倫理・価値観", "教育・学び"],
  すべて: [],
};

export default function CoEditPage() {
  const [subjectFilter, setSubjectFilter] = useState<string>("すべて");
  const [topicFilter, setTopicFilter] = useState<string>("");

  const filtered = useMemo(() => {
    return draftProblems.filter((dp) => {
      // 教科フィルタ
      if (subjectFilter !== "すべて" && dp.subject !== subjectFilter) {
        return false;
      }
      // 単元フィルタ
      if (topicFilter && dp.topic !== topicFilter) {
        return false;
      }
      return true;
    });
  }, [subjectFilter, topicFilter]);

  const currentTopics = subjectFilter === "すべて" ? [] : topicsBySubject[subjectFilter];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 py-10 px-4">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* ← ホームに戻る */}
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-1.5 text-xs font-medium text-slate-300 transition hover:border-fuchsia-500 hover:text-fuchsia-300"
          >
            <span className="text-lg leading-none">←</span>
            <span>ホームに戻る</span>
          </Link>

          <span className="text-[11px] text-slate-500">
            Co-Edit / 共同編集室
          </span>
        </div>

        {/* タイトル */}
        <header>
          <h1 className="text-3xl font-bold">Co-Edit（共同編集室）</h1>
          <p className="text-slate-400 mt-2">
            解説をつくる / 添削を協力する — Co-study の中心となる場所です。
          </p>
        </header>

        {/* 新規投稿ボタン */}
        <div className="rounded-2xl border border-fuchsia-600/30 bg-slate-900/60 p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-3">🎨 新しい解説を作る</h2>
          <p className="text-slate-300 mb-4">
            問題の解説をつくって、co-peer として知識を共有しよう。
          </p>

          <Link
            href="/public/co-edit/new"
            className="inline-flex items-center justify-center rounded-xl bg-fuchsia-600 px-6 py-3 text-sm font-semibold transition hover:bg-fuchsia-700"
          >
            ➕ Co-Edit エディタを開く
          </Link>
        </div>

        {/* ▼ フィルタ（教科 → 単元） */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-4">
          <h2 className="text-sm font-semibold text-slate-100">🔍 絞り込み</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {/* 教科 */}
            <div className="space-y-1">
              <p className="text-[11px] text-slate-400">教科</p>
              <select
                value={subjectFilter}
                onChange={(e) => {
                  setSubjectFilter(e.target.value);
                  setTopicFilter("");
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
              >
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* 単元 */}
            <div className="space-y-1">
              <p className="text-[11px] text-slate-400">単元</p>
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                disabled={subjectFilter === "すべて"}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none disabled:opacity-30 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500"
              >
                <option value="">すべて</option>
                {currentTopics.map((tp) => (
                  <option key={tp} value={tp}>
                    {tp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            検索結果：{filtered.length} 件
          </p>
        </section>

        {/* ▼ 添削待ち一覧 */}
        <section>
          <h2 className="text-xl font-semibold mb-4">📝 添削を待っている解説</h2>
          <p className="text-slate-400 mb-6">
            他の人の解説をチェックして、より良い解説づくりに貢献しよう。
          </p>

          {filtered.length === 0 ? (
            <p className="text-sm text-slate-500">該当する解説はありません。</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {filtered.map((dp) => (
                <Link
                  key={dp.id}
                  href={`/drafts/${dp.id}`}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-4 transition hover:border-fuchsia-500/50 hover:bg-slate-900"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs rounded-full bg-slate-800 px-3 py-1">
                      {dp.code}
                    </span>
                    <span
                      className={`text-xs rounded-full px-3 py-1 ${
                        dp.needed === 1
                          ? "bg-emerald-600/20 text-emerald-300"
                          : dp.needed === 2
                          ? "bg-amber-600/20 text-amber-300"
                          : "bg-red-600/20 text-red-300"
                      }`}
                    >
                      あと{dp.needed}人
                    </span>
                  </div>

                  <h3 className="text-base font-semibold group-hover:text-fuchsia-300 transition">
                    {dp.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {dp.subject}・{dp.topic} ｜ {dp.level} ｜ by {dp.author}
                  </p>

                  {/* タグ */}
                  <div className="flex flex-wrap gap-2 mt-3 text-xs">
                    {dp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-800 px-3 py-1 text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
