// app/public/problems/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Problem = {
  id: string;
  code: string;
  title: string;
  subject: "数学" | "物理" | "情報" | "英語";
  level: "基礎" | "中級" | "発展";
  topic: string;
  status: "完成版" | "添削待ち";
  authorName: string;
  authorBadge: string;
  authorSchool: string;
  copiasRank: string;
  collaborators: number;
  views: number;
  likes: number;
  tags: string[];
  postedOrder: number; // 投稿順を管理するための番号（小さいほど古い）
};

const problems: Problem[] = [
  {
    id: "prob-001",
    code: "M-001",
    title: "極限と微分の「0/0」の本質を押さえる問題",
    subject: "数学",
    level: "中級",
    topic: "極限・微分",
    status: "完成版",
    authorName: "工藤",
    authorBadge: "先輩コピア",
    authorSchool: "高知高専 電気情報工学科 → 東大編入",
    copiasRank: "3コピア",
    collaborators: 2,
    views: 1342,
    likes: 97,
    tags: ["数学", "微分積分", "極限", "高専4年〜編入レベル"],
    postedOrder: 3,
  },
  {
    id: "prob-002",
    code: "P-014",
    title: "一見シンプルな斜面上の運動でエネルギーを鍛える",
    subject: "物理",
    level: "基礎",
    topic: "力学・エネルギー保存則",
    status: "添削待ち",
    authorName: "さき",
    authorBadge: "見習いコピア",
    authorSchool: "○○高専 機械工学科",
    copiasRank: "1コピア",
    collaborators: 1,
    views: 584,
    likes: 32,
    tags: ["物理", "力学", "エネルギー", "高専3年〜"],
    postedOrder: 2,
  },
  {
    id: "prob-003",
    code: "I-021",
    title: "NAT と NAPT を図で説明できるようになる問題",
    subject: "情報",
    level: "発展",
    topic: "NAT / NAPT / ルーティング",
    status: "完成版",
    authorName: "ゆうと",
    authorBadge: "先輩コピア",
    authorSchool: "高知高専 情報セキュリティ → ○○大学",
    copiasRank: "4コピア",
    collaborators: 3,
    views: 2019,
    likes: 163,
    tags: ["情報", "ネットワーク", "NAT", "編入頻出"],
    postedOrder: 4,
  },
  {
    id: "prob-004",
    code: "M-010",
    title: "固有値と固有ベクトルを「行列式」からつなぐ基本問題",
    subject: "数学",
    level: "中級",
    topic: "固有値・固有ベクトル",
    status: "添削待ち",
    authorName: "瑞希",
    authorBadge: "見習いコピア",
    authorSchool: "○○高専 制御情報",
    copiasRank: "1コピア",
    collaborators: 0,
    views: 421,
    likes: 21,
    tags: ["数学", "線形代数", "固有値", "高専4年〜"],
    postedOrder: 1,
  },
  {
    id: "prob-005",
    code: "E-003",
    title: "東大・筑波の過去問で読む、情報セキュリティ英語長文",
    subject: "英語",
    level: "発展",
    topic: "長文読解・専門英語",
    status: "完成版",
    authorName: "K",
    authorBadge: "先輩コピア",
    authorSchool: "○○高専 情報 → 筑波編入",
    copiasRank: "2コピア",
    collaborators: 1,
    views: 863,
    likes: 74,
    tags: ["英語", "長文読解", "情報セキュリティ", "編入頻出"],
    postedOrder: 5,
  },
];

type SortKey = "recent" | "subject" | "likes";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "recent", label: "投稿順" },
  { key: "subject", label: "科目順" },
  { key: "likes", label: "高評価順" },
];

const subjectFilters = ["数学", "物理", "情報", "英語"] as const;
const statusFilters: Problem["status"][] = ["完成版", "添削待ち"];

const headerNavItems = [
  { href: "/", label: "ホーム" },
  { href: "/public/problems", label: "解法アリーナ" },
  { href: "/public/community", label: "コミュニティ / テクノゼミ" },
  { href: "/public/copeers", label: "コピア紹介" },
];

function StatusBadge({ status }: { status: Problem["status"] }) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold";
  if (status === "完成版") {
    return (
      <span className={`${base} bg-emerald-100 text-emerald-700`}>
        ● 完成版
      </span>
    );
  }
  return (
    <span className={`${base} bg-amber-100 text-amber-700`}>
      ● 添削待ち
    </span>
  );
}

export default function ProblemsPage() {
  const pathname = usePathname();

  const [sortBy, setSortBy] = useState<SortKey>("recent");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Problem["status"][]>(
    []
  );

  // 科目の「ラジオっぽいトグル」（複数選択可）
  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  // 完成 / 添削待ちのトグル
  const toggleStatus = (status: Problem["status"]) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredAndSortedProblems = useMemo(() => {
    let list = [...problems];

    // 科目フィルタ
    if (selectedSubjects.length > 0) {
      list = list.filter((p) => selectedSubjects.includes(p.subject));
    }

    // ステータスフィルタ
    if (selectedStatuses.length > 0) {
      list = list.filter((p) => selectedStatuses.includes(p.status));
    }

    // 並び替え
    if (sortBy === "subject") {
      list.sort((a, b) => {
        const s = a.subject.localeCompare(b.subject, "ja");
        if (s !== 0) return s;
        return a.title.localeCompare(b.title, "ja");
      });
    } else if (sortBy === "likes") {
      list.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "recent") {
      // 投稿順（新しい順）
      list.sort((a, b) => b.postedOrder - a.postedOrder);
    }

    return list;
  }, [sortBy, selectedSubjects, selectedStatuses]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* 上部ナビゲーション（他ページへのヘッダタブ） */}
        <nav className="mb-6 flex flex-wrap gap-2 text-xs md:text-sm">
          <div className="inline-flex flex-wrap gap-1 rounded-full bg-slate-900/70 p-1">
            {headerNavItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "inline-flex items-center rounded-full px-3 py-1.5 font-medium transition-all duration-150",
                    active
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-200 hover:text-slate-50 hover:bg-slate-800/80",
                  ].join(" ")}
                >
                  {/* ラジオっぽい丸 */}
                  <span
                    className={[
                      "mr-1.5 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full border",
                      active
                        ? "border-slate-900 bg-slate-900"
                        : "border-slate-500",
                    ].join(" ")}
                  >
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ヘッダー部分 */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
              解法アリーナ
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-50 md:text-4xl">
              解説付きの問題で、
              <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                「説明できる理解」
              </span>
              を鍛える。
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              高専からの編入で頻出の分野を中心に、コピアが作った
              「解説付き問題」だけを集めた場所です。完成版だけでなく、
              添削待ちの問題も公開して、みんなで理解を深掘りしていきます。
            </p>
          </div>

          {/* 並び替え / フィルタ UI */}
          <div className="space-y-3 text-xs">
            {/* 並び替え */}
            <div>
              <span className="mb-1 block text-[11px] font-semibold text-slate-400">
                並び替え
              </span>
              <div className="inline-flex rounded-full bg-slate-900/70 p-1">
                {sortOptions.map((opt) => {
                  const active = sortBy === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setSortBy(opt.key)}
                      className={[
                        "relative inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-150",
                        active
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-300 hover:text-slate-100",
                      ].join(" ")}
                    >
                      {/* ラジオっぽい丸 */}
                      <span
                        className={[
                          "mr-1.5 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full border",
                          active
                            ? "border-slate-900 bg-slate-900"
                            : "border-slate-400",
                        ].join(" ")}
                      >
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* フィルタ */}
            <div className="flex flex-wrap gap-4">
              {/* 科目フィルタ */}
              <div>
                <span className="mb-1 block text-[11px] font-semibold text-slate-400">
                  科目で絞り込み（複数選択可）
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {subjectFilters.map((subject) => {
                    const active = selectedSubjects.includes(subject);
                    return (
                      <button
                        key={subject}
                        type="button"
                        onClick={() => toggleSubject(subject)}
                        className={[
                          "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] transition-all duration-150",
                          active
                            ? "border-white bg-white text-slate-900 shadow-sm"
                            : "border-slate-500 text-slate-200 hover:border-slate-300",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "mr-1.5 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full border",
                            active
                              ? "border-slate-900 bg-slate-900"
                              : "border-slate-400",
                          ].join(" ")}
                        >
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        {subject}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ステータスフィルタ */}
              <div>
                <span className="mb-1 block text-[11px] font-semibold text-slate-400">
                  ステータスで絞り込み（複数選択可）
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {statusFilters.map((st) => {
                    const active = selectedStatuses.includes(st);
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => toggleStatus(st)}
                        className={[
                          "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] transition-all duration-150",
                          active
                            ? "border-white bg-white text-slate-900 shadow-sm"
                            : "border-slate-500 text-slate-200 hover:border-slate-300",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "mr-1.5 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full border",
                            active
                              ? "border-slate-900 bg-slate-900"
                              : "border-slate-400",
                          ].join(" ")}
                        >
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 問題カード一覧 */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAndSortedProblems.map((problem) => (
            <Link
              key={problem.id}
              href={`/public/problems/${problem.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl 
                         bg-white/95 text-slate-900 shadow-lg
                         border border-slate-200/80
                         transition-all duration-200 hover:-translate-y-1 
                         hover:shadow-[0_18px_45px_rgba(15,23,42,0.45)]"
            >
              {/* 上半分：ホワイトボード風エリア */}
              <div className="relative border-b border-slate-200 bg-slate-50/80 px-4 py-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0_0,#e5e7eb,transparent_55%),radial-gradient(circle_at_100%_0,#e2e8f0,transparent_55%)] opacity-80" />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center rounded-full bg-slate-900 text-[10px] font-semibold text-slate-50 px-2 py-0.5">
                      {problem.code}
                    </span>
                    <h2 className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-slate-900">
                      {problem.title}
                    </h2>
                  </div>
                  <StatusBadge status={problem.status} />
                </div>

                {/* 右下のちょっとした「数式」風メモ */}
                <div className="relative mt-3 flex justify-end text-[11px] text-slate-500 font-mono">
                  <div className="rounded-lg border border-dashed border-slate-300/80 bg-white/80 px-2 py-1 shadow-sm">
                    <span className="block">
                      {problem.subject === "数学"
                        ? "Math"
                        : problem.subject === "物理"
                        ? "Phys"
                        : problem.subject === "情報"
                        ? "Info"
                        : "Eng"}
                    </span>
                    <span className="block text-[10px]">
                      level: {problem.level} · topic: {problem.topic}
                    </span>
                  </div>
                </div>
              </div>

              {/* 下半分：メタ情報 */}
              <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                {/* タグ */}
                <div className="flex flex-wrap gap-1.5">
                  {problem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 著者情報 */}
                <div className="mt-1 flex items-start justify-between gap-3 text-xs">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">
                      {problem.authorName}
                      <span className="ml-1 text-[11px] text-slate-500">
                        ({problem.copiasRank})
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {problem.authorBadge} · {problem.authorSchool}
                    </span>
                  </div>
                  <div className="flex flex-col items-end text-[11px] text-slate-500">
                    <span>共同編集: {problem.collaborators}人</span>
                    <span>
                      👁 {problem.views.toLocaleString()} · ♥ {problem.likes}
                    </span>
                  </div>
                </div>

                {/* フッター：誘導テキスト */}
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>クリックしてホワイトボード解説を開く</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {filteredAndSortedProblems.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-4 py-8 text-center text-sm text-slate-300">
              条件に合う問題がまだありません。<br />
              フィルタを少しゆるめてみるか、新しい解説付き問題を投稿してみましょう。
            </div>
          )}
        </section>

        {/* ============================= */}
        {/* 殿堂の知識 - Hall of Knowledge */}
        {/* ============================= */}
        <section className="mt-16 border-t border-slate-800 pt-10">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50">
                殿堂の知識 — Hall of Knowledge
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                解法アリーナで生まれた解説の中から、特に優秀なものだけをノミネートし、
                教科ごとに「本」のかたちで構造的に整理したコーナーです。
                ここを辿ることで、編入レベルの知識を体系的に復習できます。
              </p>
            </div>
            <p className="text-[11px] text-slate-500">
              ※ 運営および先輩コピアによる審査を経て、
              「殿堂入り」した解説だけが収録されます。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 数学の本 */}
            <Link
              href="/public/problems/book_math"
              className="group relative flex flex-col justify-between rounded-2xl border border-indigo-400/40 bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-950 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.7)] overflow-hidden hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(30,64,175,0.8)] transition-transform duration-200"
            >
              {/* 背表紙 */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-b from-indigo-200/90 via-indigo-100/70 to-indigo-300/80 shadow-[8px_0_18px_rgba(15,23,42,0.7)]" />
              {/* 装飾 */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-400/20 blur-3xl" />

              <div className="relative pl-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-200/80">
                  Math Hall
                </p>
                <h3 className="mt-1 text-lg font-bold text-white tracking-wide">
                  数学の殿堂
                </h3>
                <p className="mt-2 text-xs text-indigo-100/90 leading-relaxed">
                  極限・微積・線形代数・複素解析・確率統計など、
                  編入数学で戦うための「ここでしか読めない解説」を一冊に。
                </p>
              </div>

              <div className="relative mt-4 flex items-center justify-between pl-4 text-[11px] text-indigo-100/80">
                <span>章立てで本のように読み進める</span>
                <span className="font-semibold group-hover:translate-x-1 transition-transform">
                  → 本を開く
                </span>
              </div>
            </Link>

            {/* 物理の本 */}
            <Link
              href="/hall/physics"
              className="group relative flex flex-col justify-between rounded-2xl border border-rose-400/40 bg-gradient-to-br from-rose-700 via-rose-800 to-slate-950 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.7)] overflow-hidden hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(190,24,93,0.8)] transition-transform duration-200"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-b from-rose-100/90 via-rose-50/70 to-rose-200/80 shadow-[8px_0_18px_rgba(15,23,42,0.7)]" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose-400/20 blur-3xl" />

              <div className="relative pl-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-rose-100/80">
                  Physics Hall
                </p>
                <h3 className="mt-1 text-lg font-bold text-white tracking-wide">
                  物理の殿堂
                </h3>
                <p className="mt-2 text-xs text-rose-50/95 leading-relaxed">
                  力学・電磁気・熱力学・波動・量子力学の発展問題を、
                  思考プロセスから丁寧に読み解ける一冊。
                </p>
              </div>

              <div className="relative mt-4 flex items-center justify-between pl-4 text-[11px] text-rose-50/90">
                <span>図やエネルギー線で直感から理解する</span>
                <span className="font-semibold group-hover:translate-x-1 transition-transform">
                  → 本を開く
                </span>
              </div>
            </Link>

            {/* 情報の本 */}
            <Link
              href="/hall/information"
              className="group relative flex flex-col justify-between rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-950 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.7)] overflow-hidden hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(16,185,129,0.8)] transition-transform duration-200"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-b from-emerald-100/90 via-emerald-50/70 to-emerald-200/80 shadow-[8px_0_18px_rgba(15,23,42,0.7)]" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />

              <div className="relative pl-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-100/80">
                  Information Hall
                </p>
                <h3 className="mt-1 text-lg font-bold text-white tracking-wide">
                  情報の殿堂
                </h3>
                <p className="mt-2 text-xs text-emerald-50/95 leading-relaxed">
                  アルゴリズム、計算量、ネットワーク、セキュリティなど、
                  高専情報系の「ガチ解説」を体系的に読み込める本棚。
                </p>
              </div>

              <div className="relative mt-4 flex items-center justify-between pl-4 text-[11px] text-emerald-50/90">
                <span>NAT / ルーティング / 暗号なども収録</span>
                <span className="font-semibold group-hover:translate-x-1 transition-transform">
                  → 本を開く
                </span>
              </div>
            </Link>

            {/* 英語の本 */}
            <Link
              href="/hall/english"
              className="group relative flex flex-col justify-between rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-700 via-cyan-800 to-slate-950 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.7)] overflow-hidden hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(8,145,178,0.8)] transition-transform duration-200"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-b from-cyan-100/90 via-cyan-50/70 to-cyan-200/80 shadow-[8px_0_18px_rgba(15,23,42,0.7)]" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />

              <div className="relative pl-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-100/80">
                  English Hall
                </p>
                <h3 className="mt-1 text-lg font-bold text-white tracking-wide">
                  英語の殿堂
                </h3>
                <p className="mt-2 text-xs text-cyan-50/95 leading-relaxed">
                  編入長文、専門英語、和訳・英作文の
                  「解説の質で殴る系」だけを集めたブックレット。
                </p>
              </div>

              <div className="relative mt-4 flex items-center justify-between pl-4 text-[11px] text-cyan-50/90">
                <span>情報系・工学系の英文読解に特化</span>
                <span className="font-semibold group-hover:translate-x-1 transition-transform">
                  → 本を開く
                </span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
