// app/page.tsx
import Link from "next/link";

const mockCopeers = [
  {
    id: "c-001",
    name: "山本 凛",
    role: "数学 Copeer",
    school: "高知高専 電気情報工学科",
    badge: "Platinum Copeer",
    intro:
      "極限・微分を「グラフと言葉」で説明するのが得意。編入数学の“わからん”を一緒にほどいていきます。",
    focus: ["微分積分", "極限", "証明"],
  },
  {
    id: "c-002",
    name: "佐藤 海斗",
    role: "物理 Copeer",
    school: "香川高専 機械工学科",
    badge: "Gold Copeer",
    intro:
      "力学の図解とエネルギー視点の解説を担当。式だけじゃなく、イメージで腑に落ちる物理を目指してます。",
    focus: ["力学", "振動・波動"],
  },
  {
    id: "c-003",
    name: "中村 彩",
    role: "情報 Copeer",
    school: "高知高専 情報セキュリティ系",
    badge: "Gold Copeer",
    intro:
      "ネットワーク・セキュリティの基礎を“高専生のことば”で解説。暗記じゃなくて仕組みから理解したい人向け。",
    focus: ["ネットワーク", "情報セキュリティ"],
  },
  {
    id: "c-004",
    name: "田中 悠",
    role: "英語 Copeer",
    school: "徳山高専 制御情報工学科",
    badge: "Silver Copeer",
    intro:
      "編入英語の長文・英作文を担当。日本語での発想をどう英語に乗せるか、一緒に練習していきましょう。",
    focus: ["長文読解", "英作文"],
  },
];

function CopeersSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16 space-y-4">
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
            <span className="inline-block h-2 w-2 rounded-full bg-cyan-400" />
            コピアにはこんな人がいます
          </p>
          <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
            解説を書いている先輩・講師たちの一例
          </h2>
          <p className="max-w-2xl text-xs text-slate-300 md:text-sm">
            実際のサービスでは、Copeer の情報はデータベースから自動で取得して表示します。
            ここではイメージとして、代表的な4人の Copeer を紹介しています。
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {mockCopeers.map((copeer) => (
            <article
              key={copeer.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-md shadow-black/40 transition hover:-translate-y-0.5 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              {/* 背景グラデーション */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-500/30 blur-3xl" />
                <div className="absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-fuchsia-500/25 blur-3xl" />
              </div>

              <div className="relative z-10 space-y-3">
                <header className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-cyan-300">
                      {copeer.role}
                    </p>
                    <h3 className="text-sm font-semibold text-slate-50 md:text-base">
                      {copeer.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">{copeer.school}</p>
                  </div>
                  <span className="rounded-full border border-amber-400/70 bg-amber-500/10 px-2 py-1 text-[10px] font-semibold text-amber-200">
                    {copeer.badge}
                  </span>
                </header>

                <p className="text-xs leading-relaxed text-slate-200 md:text-sm">
                  {copeer.intro}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {copeer.focus.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-200 group-hover:bg-slate-800/90"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>主な担当：解説付き問題・添削コメント</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300">
                    coming soon
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-[11px] text-slate-400">
          ※ 将来的には「講師一覧」「Copeer 一覧」ページとして独立させるかもしれませんが、
          現段階ではホーム内の紹介セクションとして集約しています。
        </p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* ヘッダー / ナビゲーション */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          

          {/* PCナビ */}
<nav className="mt-4 hidden w-full md:grid md:grid-cols-4 md:gap-6">
  {/* 解法アリーナ */}
  <Link href="/public/problems" className="group block">
    <div className="relative">
      <div
        className="skew-x-[-12deg] rounded-2xl border border-slate-200
                   bg-white/90 px-5 py-4 shadow-xl
                   transition-all duration-200
                   group-hover:scale-[1.03]
                   group-hover:bg-white
                   group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
      >
        <div className="skew-x-[12deg] flex items-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl
                       bg-fuchsia-100 text-2xl text-fuchsia-600 shadow-inner"
          >
            📘
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-lg font-bold text-slate-900">
              解法アリーナ
            </span>
            <span className="text-xs text-slate-500">
              問題の理解を深く、強く
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>

  {/* co-edit(共同編集室) */}
  <Link href="/public/co-edit" className="group block">
    <div className="relative">
      <div
        className="skew-x-[-12deg] rounded-2xl border border-slate-200
                   bg-white/90 px-5 py-4 shadow-xl
                   transition-all duration-200
                   group-hover:scale-[1.03]
                   group-hover:bg-white
                   group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
      >
        <div className="skew-x-[12deg] flex items-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl
                       bg-cyan-100 text-2xl text-cyan-600 shadow-inner"
          >
            ✍️
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-lg font-bold text-slate-900">
              co-edit
            </span>
            <span className="text-xs text-slate-500">
              解説を添削、作成する
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>

  {/* 問題コロシアム */}
  <Link href="/private/colosseum" className="group block">
    <div className="relative">
      <div
        className="skew-x-[-12deg] rounded-2xl border border-slate-200
                   bg-white/90 px-5 py-4 shadow-xl
                   transition-all duration-200
                   group-hover:scale-[1.03]
                   group-hover:bg-white
                   group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
      >
        <div className="skew-x-[12deg] flex items-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl
                       bg-fuchsia-100 text-2xl text-fuchsia-600 shadow-inner"
          >
            🏟
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-lg font-bold text-slate-900">
              問題コロシアム
            </span>
            <span className="text-xs text-slate-500">
              ひたすら解け。
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>

  {/* コミュニティ / テクノゼミ */}
  <Link href="/public/community" className="group block">
    <div className="relative">
      <div
        className="skew-x-[-12deg] rounded-2xl border border-slate-200
                   bg-white/90 px-5 py-4 shadow-xl
                   transition-all duration-200
                   group-hover:scale-[1.03]
                   group-hover:bg白
                   group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
      >
        <div className="skew-x-[12deg] flex items-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl
                       bg-cyan-100 text-2xl text-cyan-600 shadow-inner"
          >
            🏫
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-lg font-bold text-slate-900">
              コミュニティ
            </span>
            <span className="text-xs text-slate-500">
              仲間と学ぶ・磨く・伸ばす
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>
</nav>


          {/* モバイル簡易ナビ */}
          <nav className="flex items-center gap-3 text-[11px] text-slate-300 md:hidden">
            <Link href="/public/problems" className="hover:text-slate-50">
              アリーナ
            </Link>
            <Link href="/public/community" className="hover:text-slate-50">
              コミュニティ
            </Link>
          </nav>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="group relative overflow-hidden border-b border-slate-800">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          {/* ペンキぶちまけ＋ネオン */}
          <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-fuchsia-500/90 blur-3xl" />
          <div className="absolute -right-10 top-10 h-80 w-80 rounded-full bg-cyan-500/80 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
          {/* 油断してたら動く枠 */}
          <div
            className="
              absolute left-10 top-40 h-32 w-32 rounded-3xl border border-dashed border-slate-500/40
              transition-transform duration-700 ease-out
              group-hover:-translate-y-1 group-hover:rotate-3
            "
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:flex-row md:items-center md:py-24">
          {/* 左側：コピー & CTA */}
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/80 px-3 py-1 text-[11px] font-medium text-slate-200">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              高専生のための「解説 × 編入」co-study プラットフォーム
            </div>

            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
                解説が、あなたの武器になる。
              </span>
              <span className="mt-2 block text-base font-normal text-slate-200 md:text-lg">
                高専からの編入を目指すコピアたちの
                <span className="font-semibold text-cyan-300">
                  {" "}
                  解法アリーナ
                </span>
              </span>
            </h1>

            <p className="max-w-xl text-sm text-slate-300 md:text-base">
              数学・物理・情報の
              <span className="font-semibold text-slate-100">
                「解説付き問題」
              </span>
              を投稿・共有し、先輩・仲間・講師と一緒にブラッシュアップする
              協働学習プラットフォームです。ノートに閉じた解説を、
              <span className="font-semibold text-slate-100">
                {" "}
                後輩へ継承できる資産
              </span>
              に変えていきます。
            </p>

            {/* タグライン */}
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-200">
              {[
                "数学（線形・確率・解析）",
                "物理（力学・電磁気）",
                "情報・アルゴリズム",
                "編入体験談・戦略ノート",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-1"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/public/problems"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 transition hover:bg-cyan-300"
              >
                解法アリーナを覗いてみる
                <span className="ml-1.5 text-xs">→</span>
              </Link>
              <Link
                href="/public/community"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-950/70 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:border-slate-300 hover:bg-slate-900"
              >
                はじめての方へ（しくみを見る）
              </Link>
            </div>

            <p className="text-[11px] text-slate-400">
              ※ 解説の閲覧はログイン不要。投稿・コメント・共同編集にはアカウント登録が必要です。
            </p>
          </div>

          {/* 右側：アリーナのイメージカード */}
          <div className="mt-6 flex-1 md:mt-0">
            <div className="relative mx-auto max-w-md">
              {/* 背景のグリッド風 */}
              <div className="pointer-events-none absolute inset-4 -z-10 rounded-3xl border border-slate-800/80 bg-slate-950/90 shadow-[0_0_80px_rgba(15,23,42,0.9)]" />

              <div className="space-y-3 rounded-3xl border border-slate-700 bg-slate-900/90 p-4 shadow-xl shadow-slate-900/90">
                <div className="mb-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="rounded-full bg-slate-800/80 px-3 py-1 text-[10px] uppercase tracking-wide">
                    Copeers Arena – Live
                  </span>
                  <span>今週のホットな解説</span>
                </div>

                {/* カードたち */}
                {[
                  {
                    title: "固有値・固有ベクトルで対角化",
                    tag: "線形代数",
                    level: "中級",
                    status: "添削中",
                    likes: 42,
                    views: 310,
                    author: "先輩コピア（徳島高専 → 東大）",
                  },
                  {
                    title: "単振動と減衰振動の違い",
                    tag: "力学",
                    level: "基礎〜中級",
                    status: "完成版",
                    likes: 31,
                    views: 220,
                    author: "テクノゼミ講師",
                  },
                  {
                    title: "Dijkstra法で最短経路を求める",
                    tag: "アルゴリズム",
                    level: "中級",
                    status: "ドラフト",
                    likes: 18,
                    views: 150,
                    author: "3年 情報系コピア",
                  },
                ].map((card, idx) => (
                  <div
                    key={card.title}
                    className={`flex gap-3 rounded-2xl bg-slate-800/80 p-3 text-xs text-slate-100
                      shadow-sm shadow-slate-900/70
                      transition duration-300 ease-out
                      hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/80
                      ${
                        idx === 0
                          ? "-rotate-1"
                          : idx === 2
                          ? "rotate-1"
                          : "rotate-0"
                      }`}
                  >
                    <div className="flex h-16 w-20 items-center justify-center rounded-xl border border-slate-600 bg-slate-950 text-[10px] text-slate-300">
                      問題
                      <br />
                      img
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="line-clamp-1 text-[13px] font-semibold">
                          {card.title}
                        </p>
                        <span className="shrink-0 rounded-full bg-slate-700/80 px-2 py-0.5 text-[10px] text-slate-100">
                          {card.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 text-[10px] text-slate-300">
                        <span className="rounded-full bg-slate-900/80 px-2 py-0.5">
                          #{card.tag}
                        </span>
                        <span className="rounded-full border border-slate-600/70 px-2 py-0.5">
                          {card.level}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="line-clamp-1">{card.author}</span>
                        <div className="flex items-center gap-2">
                          <span>❤ {card.likes}</span>
                          <span>👁 {card.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <p className="mt-2 text-[10px] text-slate-400">
                  解説を投稿すると、先輩コピアや講師からフィードバックが届きます。
                  「自分ならこう説明する」が、次の世代の武器になります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 最初の3ステップ */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
          <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
            まずは、ここから始めてみよう。
          </h2>
          <p className="mt-2 text-sm text-slate-300 md:text-base">
            「高専から編入せよ！」は、いきなり投稿しなくても大丈夫です。
            まずはアリーナを覗いて、先輩の解説から盗むところからスタート。
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="animate-pop-once rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <p className="text-[11px] font-semibold text-cyan-300">
                STEP 1
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                解法アリーナを散歩してみる
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                自分の専攻・志望校に近そうなタグから、
                興味のある問題を開いてみよう。
                「この説明の仕方、マネしたい」を見つけるところから。
              </p>
              <Link
                href="/public/problems"
                className="mt-3 inline-flex text-[11px] text-cyan-300 hover:text-cyan-200"
              >
                解法アリーナへ →
              </Link>
            </div>

            <div className="animate-pop-once rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:[animation-delay:0.35s]">
              <p className="text-[11px] font-semibold text-emerald-300">
                STEP 2
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                自分のノートを一問だけ「解説」にしてみる
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                いつもの自分のノートを、他人に読ませる前提で書き直してみる。
                それだけで、理解の穴や説明の順番が見えてきます。
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                ※ 投稿フォーム・編集UIは順次公開予定です。
              </p>
            </div>

            <div className="animate-pop-once rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:[animation-delay:0.5s]">
              <p className="text-[11px] font-semibold text-fuchsia-300">
                STEP 3
              </p>
              <h3 className="mt-1 text-sm font-semibold text-slate-50">
                先輩・講師からフィードバックをもらう
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                添削コメントやハートの数が、
                「どこが伝わりやすいか」のフィードバックになります。
                解説力は、そのまま面接・口頭試問の武器に。
              </p>
              <Link
                href="/public/community"
                className="mt-3 inline-flex text-[11px] text-cyan-300 hover:text-cyan-200"
              >
                コミュニティ / テクノゼミを見る →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* サービス概要セクション */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
            高専から編入までを、
          <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
            「解説」
          </span>

          でつなぐ。        
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            「高専から編入せよ！」は、高専生のための{" "}
            <span className="font-semibold text-slate-100">
              解説付き問題 × SNS × 演習・模試
            </span>
            を組み合わせた協働学習プラットフォームです。
            自分の解説を「資産」として残し、後輩へ、そして未来の自分へ継承していきます。
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-sm font-semibold text-slate-50">
                ① 解説付き問題を投稿・共有
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                高専生が自分で作った「問題＋解説」を投稿し、
                タグ（数学・物理・情報・レベルなど）で整理。
                他のコピアの解説も読み比べることができます。
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-sm font-semibold text-slate-50">
                ② 先輩・仲間・講師と協働でブラッシュアップ
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                コメントやハート、共同編集を通じて、
                解説の「わかりやすさ」を一緒に磨いていきます。
                説明できる理解を身につける場です。
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-sm font-semibold text-slate-50">
                ③ テクノゼミ生向けの演習・模試と連動
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                テクノゼミ生は、オンラインでの問題演習・模試にもアクセス可能。
                授業と連動した演習で、編入までの道のりを最短化します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 対象ユーザーセクション */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
            こんな高専生・先生にフィットします
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ul className="space-y-2 text-sm text-slate-300">
              <li>・編入試験に本気で挑戦したい高専生</li>
              <li>・「解ける」だけでなく「説明できる」レベルを目指したい人</li>
              <li>・自分の解説を、後輩や仲間に残していきたい先輩コピア</li>
              <li>・オンラインで協働学習の場を作りたい先生・講師</li>
            </ul>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs text-slate-300">
              <p className="font-semibold text-slate-100">
                「ノートは閉じたら終わり」じゃなくて、
                解説が積み上がる“知のアリーナ”に。
              </p>
              <p className="mt-2">
                高専で培った試行錯誤・メモ・ひらめきを、
                デジタル上の解説として残していくことで、
                来年・再来年の高専生の学びの土台になります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* コピア紹介セクション（ホーム下部に統合） */}
      <CopeersSection />

      {/* テクノゼミ連携セクション */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
            テクノゼミとの連携について
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            本プラットフォームは、高専生向けオンライン塾
            <span className="font-semibold text-slate-100">「テクノゼミ」</span>
            と連携し、授業で扱ったテーマや、
            編入対策の重点分野に対応した問題・解説が集まる場所として運用していきます。
          </p>
          <p className="mt-2 text-xs text-slate-400">
            ※ テクノゼミ生は、演習ページ・模試機能へのフルアクセスが可能になる予定です。
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm md:flex-row md:items-center">
            <Link
              href="/practice"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300"
            >
              テクノゼミ生向けページへ
              <span className="ml-1.5 text-xs">→</span>
            </Link>
            <Link
              href="/public/community"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/60 px-5 py-2 text-xs font-medium text-slate-100 transition hover:border-slate-400 hover:bg-slate-900"
            >
              コミュニティ / テクノゼミの詳細を見る
            </Link>
            <p className="text-xs text-slate-400">
              ※ 現時点では一部機能のみ公開の場合があります。
            </p>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-slate-200">高専から編入せよ！</p>
            <p className="text-[11px] text-slate-400">
              解説を資産にする、高専生のための協働学習プラットフォーム。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/terms" className="hover:text-slate-200">
              利用規約
            </Link>
            <Link href="/privacy" className="hover:text-slate-200">
              プライバシーポリシー
            </Link>
            <Link href="/contact" className="hover:text-slate-200">
              お問い合わせ
            </Link>
            <span className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} KOSEN Transfer Copeers
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
