// app/public/problems/book_math/page.tsx

import Link from "next/link";

type BookSection = {
  code: string;
  title: string;
  href: string;
  level: string;
  badge: "殿堂入り" | "特選" | "準殿堂";
  tags: string[];
};

type Chapter = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  sections: BookSection[];
};

const chapters: Chapter[] = [
  {
    id: "ch1",
    title: "第1章　極限と微分の本質",
    subtitle: "0/0 型の向こう側へ",
    description:
      "教科書レベルを越えて、「なぜその手順になるのか」を言語化した極限・微分の解説を集めました。極限記号の奥にある関数のふるまいを、図や思考プロセスと一緒に整理します。",
    sections: [
      {
        code: "M-001",
        title: "極限と微分の「0/0」の本質を押さえる問題",
        href: "/public/problems/prob-001",
        level: "中級",
        badge: "殿堂入り",
        tags: ["極限", "微分積分", "編入頻出"],
      },
      {
        code: "M-002",
        title: "テイラー展開で読み解く極限の直感（coming soon）",
        href: "#",
        level: "発展",
        badge: "準殿堂",
        tags: ["テイラー展開", "極限", "直感的理解"],
      },
    ],
  },
  {
    id: "ch2",
    title: "第2章　固有値・固有ベクトルと行列式",
    subtitle: "「式」から「変換の感覚」へ",
    description:
      "固有値・固有ベクトルを、単なる計算手順ではなく「空間の引き伸ばし・回転」として理解するための章です。行列式とのつながりを、図と比喩を交えた解説で整理します。",
    sections: [
      {
        code: "M-010",
        title: "固有値と固有ベクトルを「行列式」からつなぐ基本問題",
        href: "/public/problems/prob-004",
        level: "中級",
        badge: "特選",
        tags: ["線形代数", "固有値・固有ベクトル"],
      },
      {
        code: "M-011",
        title: "対角化できると何がうれしいのかを実感する問題（coming soon）",
        href: "#",
        level: "発展",
        badge: "準殿堂",
        tags: ["対角化", "行列式", "応用"],
      },
    ],
  },
  {
    id: "ch3",
    title: "第3章　編入数学で差がつく視点たち",
    subtitle: "解法テクニックのその先へ",
    description:
      "解法テクニックそのものより、「なぜその発想にたどり着くのか」を分解した解説を集めました。編入試験で差がつくのは、ここにあるような“思考の粒度”です。",
    sections: [
      {
        code: "M-X01",
        title: "条件整理から一撃で見抜く不等式・評価問題（coming soon）",
        href: "#",
        level: "発展",
        badge: "特選",
        tags: ["不等式", "評価", "発想法"],
      },
      {
        code: "M-X02",
        title: "「置き換え」を直感で選べるようになる演習（coming soon）",
        href: "#",
        level: "中級",
        badge: "準殿堂",
        tags: ["置換", "積分", "発想"],
      },
    ],
  },
];

export default function BookMathPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* パンくず + 戻り導線 */}
        <nav className="mb-6 text-xs text-slate-400 flex items-center gap-2">
          <Link
            href="/"
            className="hover:text-slate-100 hover:underline underline-offset-4"
          >
            ホーム
          </Link>
          <span>/</span>
          <Link
            href="/public/problems"
            className="hover:text-slate-100 hover:underline underline-offset-4"
          >
            解法アリーナ
          </Link>
          <span>/</span>
          <span className="text-slate-300">数学の殿堂</span>
        </nav>

        {/* ヒーロー：本の表紙イメージ */}
        <header className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-900 via-slate-950 to-slate-950 px-6 py-7 md:px-8 md:py-10 shadow-[0_24px_60px_rgba(15,23,42,0.9)] mb-10">
          {/* 背表紙 */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-b from-indigo-100/90 via-indigo-200/70 to-indigo-300/80 shadow-[10px_0_24px_rgba(15,23,42,0.8)]" />
          {/* 装飾ノイズ */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-32 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative pl-10 md:pl-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-indigo-200/80">
              Math Hall of Knowledge
            </p>
            <h1 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-slate-50">
              数学の殿堂
              <span className="ml-2 bg-gradient-to-r from-fuchsia-300 to-cyan-300 bg-clip-text text-transparent text-lg md:text-xl align-middle">
                — 構造で読む解説集
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm md:text-[13px] leading-relaxed text-slate-200">
              解法アリーナで生まれた数学の解説のうち、
              「ここでしか出会えない」と胸を張れるものだけをノミネートして、
              一冊の本のように章立てしました。
              極限・微積・線形代数など、編入で戦ううえで外せない視点を、
              「単発の神解説」ではなく体系として辿れる場所です。
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
              <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 border border-slate-700">
                📘 殿堂入り解説を章ごとに整理
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 border border-slate-700">
                🎯 編入レベルの「発想」を読み解く
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 border border-slate-700">
                🧠 復習はここから始めれば OK
              </span>
            </div>
          </div>
        </header>

        {/* レイアウト：左に目次 / 右に章カードでもいいけど、まずは章カード縦並び */}
        <main className="space-y-8">
          {chapters.map((chapter) => (
            <section
              key={chapter.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-5 md:px-6 md:py-6 shadow-[0_12px_35px_rgba(15,23,42,0.7)]"
            >
              {/* 章タイトル */}
              <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-50">
                    {chapter.title}
                  </h2>
                  {chapter.subtitle && (
                    <p className="text-xs text-slate-400">{chapter.subtitle}</p>
                  )}
                </div>
                <span className="mt-1 inline-flex items-center rounded-full border border-slate-600 px-2.5 py-1 text-[11px] text-slate-300">
                  収録解説 {chapter.sections.length} 本
                </span>
              </div>

              {/* 説明 */}
              <p className="mb-4 text-xs md:text-sm text-slate-200 leading-relaxed">
                {chapter.description}
              </p>

              {/* 収録セクションリスト */}
              <div className="space-y-3">
                {chapter.sections.map((sec) => (
                  <Link
                    key={sec.code}
                    href={sec.href}
                    className={[
                      "group flex flex-col gap-1 rounded-xl border px-3 py-2.5 text-xs md:text-[13px] transition-all duration-150",
                      sec.href === "#"
                        ? "border-slate-700/70 bg-slate-900/60 cursor-default"
                        : "border-slate-600/70 bg-slate-900/60 hover:border-slate-300/90 hover:bg-slate-900",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-900 px-2 py-[2px] text-[10px] font-semibold">
                          {sec.code}
                        </span>
                        <span className="font-semibold text-slate-50 group-hover:text-white line-clamp-2">
                          {sec.title}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-[10px] text-slate-300">
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-2 py-[1px] font-semibold",
                            sec.badge === "殿堂入り"
                              ? "bg-amber-100 text-amber-900"
                              : sec.badge === "特選"
                              ? "bg-emerald-100 text-emerald-900"
                              : "bg-slate-200 text-slate-900",
                          ].join(" ")}
                        >
                          {sec.badge}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Lv. {sec.level}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {sec.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-800 px-2 py-[1px] text-[10px] text-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {sec.href !== "#" && (
                        <span className="hidden md:inline-flex text-[10px] text-slate-400 group-hover:text-slate-100 group-hover:translate-x-0.5 transition-all">
                          解説ページへ → 
                        </span>
                      )}
                    </div>

                    {sec.href === "#" && (
                      <p className="mt-1 text-[10px] text-slate-500">
                        ※ この章の解説は現在編集中です。近日中に公開予定。
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* 下部メモ */}
        <section className="mt-10 rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-4 py-4 text-[11px] text-slate-300">
          <p>
            「数学の殿堂」に収録される解説は、
            解法アリーナで一定以上の評価を得たものや、
            先輩コピア／テクノゼミ講師が推薦したものが中心になります。
          </p>
          <p className="mt-1">
            自分の解説を殿堂入りさせたい人は、
            まずは「公式の挑戦問題」や発展的な持ち込み問題で、
            納得のいく一本を書いてみてください。
          </p>
        </section>
      </div>
    </div>
  );
}
