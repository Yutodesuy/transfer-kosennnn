// app/_utils/markdown.ts

/**
 * :::note
 * 内容
 * :::
 *
 * :::info
 * 内容
 * :::
 *
 * を HTML ブロックに変換する。
 * HTML ブロックの後に必ず空行を入れて Markdown の見出しを壊さない。
 */
export function transformDirectives(source: string): string {
  // :::xxx ～ ::: のブロックを抽出
  const directiveBlock = /^:::([a-zA-Z0-9_-]+)\s*\n([\s\S]*?)\n:::\s*$/gm;

  return source.replace(directiveBlock, (_, rawType: string, body: string) => {
    const type = rawType.trim().toLowerCase();
    const content = body.trim();

    // NOTE ブロック
    if (type === "note") {
      return [
        `<div class="my-3 rounded-md border-l-4 border-blue-400 bg-blue-50 px-3 py-2 text-sm text-slate-900">`,
        `  <strong class="mb-1 block text-xs font-semibold text-blue-700">NOTE</strong>`,
        `  ${content}`,
        `</div>`,
        ``, // ← HTML ブロック後の空行が超重要！
      ].join("\n");
    }

    // INFO ブロック
    if (type === "info") {
      return [
        `<div class="my-3 rounded-md border-l-4 border-emerald-400 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">`,
        `  <strong class="mb-1 block text-xs font-semibold text-emerald-700">INFO</strong>`,
        `  ${content}`,
        `</div>`,
        ``, // ← 見出しが Markdown として復活する
      ].join("\n");
    }

    // 未知の directive はそのまま返す
    return `:::${rawType}\n${body}\n:::`;
  });
}

/**
 * 色付け変換
 * {red|text} → <span class="text-red-500 font-semibold">text</span>
 * {blue|text} → ...
 */
export function transformColors(source: string): string {
  return source.replace(
    /\{(red|blue|green)\|([^}]+)\}/g,
    (_, color: string, text: string) => {
      const base = text.trim();

      switch (color) {
        case "red":
          return `<span class="text-red-500 font-semibold">${base}</span>`;
        case "blue":
          return `<span class="text-blue-500 font-semibold">${base}</span>`;
        case "green":
          return `<span class="text-emerald-500 font-semibold">${base}</span>`;
        default:
          return base;
      }
    }
  );
}
