import type { ReactNode } from "react";

/**
 * Renders plain CMS text (e.g. a bio typed with light Markdown habits like
 * "### Heading" or "**bold**") as real React elements instead of showing
 * the literal marker characters. Only ever builds React nodes — never
 * dangerouslySetInnerHTML — so there is no HTML-injection surface even
 * though the source text is admin-authored, not sanitized.
 */
export function renderRichText(text: string, paragraphClassName = ""): ReactNode[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, i) => {
      const headingMatch = block.match(/^#{1,6}\s+(.*)$/);
      if (headingMatch) {
        return (
          <p key={i} className="font-serif text-xl font-bold text-gold">
            {renderInline(headingMatch[1])}
          </p>
        );
      }
      return (
        <p key={i} className={paragraphClassName}>
          {renderInline(block)}
        </p>
      );
    });
}

function renderInline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) => {
      const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
      return boldMatch ? (
        <strong key={i} className="font-semibold text-cream">
          {boldMatch[1]}
        </strong>
      ) : (
        part
      );
    });
}
