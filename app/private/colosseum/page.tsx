// app/(private)/colosseum/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const subjects = [
  { value: "math", label: "数学" },
  { value: "physics", label: "物理" },
  { value: "cs", label: "情報" },
  { value: "english", label: "英語" },
];

const topicsBySubject: Record<string, { value: string; label: string }[]> = {
  math: [
    { value: "calculus", label: "微分積分" },
    { value: "linear_algebra", label: "線形代数（行列）" },
    { value: "limits", label: "極限" },
    { value: "probability", label: "確率・統計" },
    { value: "complex", label: "複素解析" },
  ],
  physics: [
    { value: "mechanics", label: "力学" },
    { value: "em", label: "電磁気学" },
    { value: "thermo", label: "熱力学" },
  ],
  cs: [
    { value: "algo", label: "アルゴリズム" },
    { value: "network", label: "ネットワーク" },
    { value: "security", label: "情報セキュリティ" },
    { value: "automata", label: "オートマトン" },
  ],
  english: [
    { value: "reading", label: "長文読解" },
    { value: "grammar", label: "文法・語法" },
    { value: "writing", label: "英作文" },
  ],
};

const levels = [
  { value: "basic", label: "基礎" },
  { value: "intermediate", label: "中級" },
  { value: "advanced", label: "発展" },
];

const problemCountOptions = [5, 10, 15, 20];

export default function ColosseumPage() {
  const router = useRouter();

  const [subject, setSubject] = useState<string>("math");
  const [topic, setTopic] = useState<string>("linear_algebra");
  const [level, setLevel] = useState<string>("intermediate");
  const [problemCount, setProblemCount] = useState<number>(10);
  const [isRanked, setIsRanked] = useState<boolean>(true);
  const [timeLimitPerProblem, setTimeLimitPerProblem] = useState<number>(120);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const topics = topicsBySubject[subject] ?? [];

  const handleSubjectChange = (value: string) => {
    setSubject(value);
    const firstTopic = topicsBySubject[value]?.[0]?.value;
    if (firstTopic) {
      setTopic(firstTopic);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!subject || !topic || !level) {
      setError("教科・単元・難易度をすべて選択してください。");
      return;
    }
    if (problemCount <= 0) {
      setError("問題数は1問以上にしてください。");
      return;
    }

    setIsSubmitting(true);

    try {
      const sessionId = `local-${Date.now()}`;

      const params = new URLSearchParams({
        subject,
        topic,
        level,
        count: String(problemCount),
        ranked: String(isRanked),
        timeLimit: String(timeLimitPerProblem),
      });

      router.push(`/colosseum/play/${sessionId}?${params.toString()}`);
    } catch (err) {
      console.error(err);
      setError("セッションの開始に失敗しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 md:py-16">
        {/* ヘッダー */}
        <header className="space-y-4">
          {/* ホームへの導線（左上） */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-1.5 text-xs font-medium text-slate-300 transition hover:border-fuchsia-500 hover:text-fuchsia-300"
            >
              <span className="text-lg leading-none">←</span>
              <span>ホームに戻る</span>
            </Link>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-200">
                <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-400" />
                サブスク限定モード：問題コロシアム
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                問題コロシアム
              </h1>
              <p className="max-w-2xl text-sm text-slate-300 md:text-base">
                教科・単元・難易度・問題数をセットして、
                <span className="font-semibold text-slate-100">
                  自分だけのバトルセッション
                </span>
                を開始しよう。
                ランク戦ではスコアが Copeers に反映されます。
              </p>
            </div>
          </div>
        </header>

        {/* 2カラムレイアウト */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          {/* 設定フォーム */}
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-lg shadow-black/30 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
                セッション設定
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {/* 教科 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    教科
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 outline-none ring-fuchsia-500/60 ring-offset-0 focus:border-fuchsia-400 focus:ring-2"
                    value={subject}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                  >
                    {subjects.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 単元 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    単元
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 outline-none ring-fuchsia-500/60 focus:border-fuchsia-400 focus:ring-2"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  >
                    {topics.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 難易度 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    難易度
                  </label>
                  <div className="flex gap-2">
                    {levels.map((lv) => {
                      const isActive = level === lv.value;
                      return (
                        <button
                          key={lv.value}
                          type="button"
                          onClick={() => setLevel(lv.value)}
                          className={[
                            "flex-1 rounded-xl border px-2 py-1.5 text-xs font-medium transition",
                            isActive
                              ? "border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-100 shadow-[0_0_20px_rgba(217,70,239,0.4)]"
                              : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:bg-slate-800/80",
                          ].join(" ")}
                        >
                          {lv.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 問題数 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    問題数
                  </label>
                  <div className="flex gap-2">
                    {problemCountOptions.map((count) => {
                      const isActive = problemCount === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setProblemCount(count)}
                          className={[
                            "flex-1 rounded-xl border px-2 py-1.5 text-xs font-medium transition",
                            isActive
                              ? "border-cyan-400 bg-cyan-500/20 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                              : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:bg-slate-800/80",
                          ].join(" ")}
                        >
                          {count}問
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ランク戦・制限時間 */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* ランクモード */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    モード
                  </label>
                  <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2">
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-slate-100">
                        ランク戦
                      </p>
                      <p className="text-[11px] text-slate-400">
                        戦績が Copeers とランキングに記録されます
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsRanked((prev) => !prev)}
                      className={[
                        "relative inline-flex h-6 w-11 items-center rounded-full border text-xs transition",
                        isRanked
                          ? "border-fuchsia-400 bg-fuchsia-500/60"
                          : "border-slate-600 bg-slate-800",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "inline-block h-4 w-4 transform rounded-full bg-slate-950 shadow transition",
                          isRanked ? "translate-x-5" : "translate-x-1",
                        ].join(" ")}
                      />
                    </button>
                  </div>
                </div>

                {/* 制限時間 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    1問あたりの制限時間（秒）
                  </label>
                  <input
                    type="number"
                    min={30}
                    max={600}
                    step={30}
                    value={timeLimitPerProblem}
                    onChange={(e) =>
                      setTimeLimitPerProblem(
                        Number(e.target.value) || timeLimitPerProblem
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 outline-none ring-fuchsia-500/60 focus:border-fuchsia-400 focus:ring-2"
                  />
                  <p className="text-[11px] text-slate-400">
                    目安：基礎 120秒 / 中級 180秒 / 発展 240秒
                  </p>
                </div>
              </div>

              {/* エラー表示 */}
              {error && (
                <div className="rounded-xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
                  {error}
                </div>
              )}

              {/* ボタン */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="text-[11px] text-slate-400">
                  条件をセットして「はじめる」を押すと、
                  <span className="text-slate-100">
                    コロシアム用の出題セッション
                  </span>
                  が生成されます。
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-400 bg-fuchsia-500/80 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(217,70,239,0.6)] transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "準備中…" : "はじめる"}
                  <span className="text-base">▶</span>
                </button>
              </div>
            </form>
          </section>

          {/* 説明・雰囲気サイドカード */}
          <aside className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-fuchsia-900/40 p-5 shadow-lg shadow-black/40">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-fuchsia-500/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-cyan-500/30 blur-3xl" />

              <div className="relative z-10 space-y-3">
                <h2 className="text-sm font-semibold text-slate-50">
                  解法アリーナとのちがい
                </h2>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-fuchsia-300">◆</span>
                    <span>
                      <span className="font-semibold">解法アリーナ</span>
                      ：みんなの解説をじっくり読む“観戦モード”
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-cyan-300">◆</span>
                    <span>
                      <span className="font-semibold">問題コロシアム</span>
                      ：タイマンで問題に挑む“バトルモード”
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 text-slate-300">◆</span>
                    <span>
                      戦績はのちに
                      <span className="font-semibold">
                        Copeers・ランキング
                      </span>
                      と連動予定。
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-300">
              <p className="font-semibold text-slate-100">
                実装メモ（開発者向け）
              </p>
              <p className="mt-1">
                現状は
                <code className="mx-1 rounded bg-slate-800 px-1.5 py-0.5 text-[11px]">
                  /colosseum/play/[sessionId]
                </code>
                にクエリパラメータ付きで遷移するだけです。
              </p>
              <p className="mt-1">
                本番では
                <code className="mx-1 rounded bg-slate-800 px-1.5 py-0.5 text-[11px]">
                  app/api/colosseum/session/route.ts
                </code>
                を作って、DB上にセッションを発行してから遷移させる想定です。
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
