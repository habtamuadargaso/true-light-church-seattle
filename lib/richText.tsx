import type { ReactNode } from "react";

/**
 * Renders plain CMS text (e.g. a bio typed with light Markdown habits like
 * "### Heading" or "**bold**") as real React elements instead of showing
 * the literal marker characters. Only ever builds React nodes — never
 * dangerouslySetInnerHTML — so there is no HTML-injection surface even
 * though the source text is admin-authored, not sanitized.
 */
export function renderRichText(
  text: string,
  paragraphClassName = "",
  background: "dark" | "light" = "dark"
): ReactNode[] {
  const headingClassName = background === "light" ? "text-gold-deep" : "text-gold";
  const boldClassName = background === "light" ? "text-navy" : "text-cream";
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, i) => {
      const headingMatch = block.match(/^#{1,6}\s+(.*)$/);
      if (headingMatch) {
        return (
          <p key={i} className={`font-serif text-xl font-bold ${headingClassName}`}>
            {renderInline(headingMatch[1], boldClassName)}
          </p>
        );
      }
      return (
        <p key={i} className={paragraphClassName}>
          {renderInline(block, boldClassName)}
        </p>
      );
    });
}

function renderInline(text: string, boldClassName: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) => {
      const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
      return boldMatch ? (
        <strong key={i} className={`font-semibold ${boldClassName}`}>
          {boldMatch[1]}
        </strong>
      ) : (
        part
      );
    });
}

/**
 * For CMS text shown inside a single existing <p>/<span> (a sermon or event
 * description, say) — strips light Markdown habits (**bold**, a leading
 * "### " heading marker) without splitting into block-level paragraphs,
 * which would be invalid nested inside another <p>. Bold segments render
 * with a slightly heavier weight of the surrounding text color rather than
 * Pastor bio's cream-on-navy styling, since callers use this on light and
 * dark backgrounds alike.
 */
export function renderInlineRichText(text: string): ReactNode[] {
  const withoutLeadingHeadingMarker = text.replace(/^#{1,6}\s+/, "");
  return withoutLeadingHeadingMarker
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) => {
      const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
      return boldMatch ? (
        <strong key={i} className="font-semibold">
          {boldMatch[1]}
        </strong>
      ) : (
        part
      );
    });
}
