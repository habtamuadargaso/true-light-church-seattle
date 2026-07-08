interface PlaceholderBlockProps {
  label: string;
  className?: string;
  tone?: "warm" | "cool";
}

/**
 * Elegant striped placeholder for imagery that hasn't been supplied yet
 * (congregation photos, pastor portrait, map, video thumbnails).
 *
 * Swap this out for a real `next/image` once the asset is available, e.g.:
 *   <Image src="/photos/congregation.jpg" alt="..." fill className="object-cover" />
 */
export default function PlaceholderBlock({
  label,
  className = "",
  tone = "warm",
}: PlaceholderBlockProps) {
  const stripe =
    tone === "warm"
      ? "repeating-linear-gradient(135deg, #eee6d5, #eee6d5 12px, #e5dac2 12px, #e5dac2 24px)"
      : "repeating-linear-gradient(135deg, #0b1f3a, #0b1f3a 12px, #122a4d 12px, #122a4d 24px)";

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ background: stripe }}
    >
      <span
        className={`rounded-md px-3.5 py-2 font-mono text-[12.5px] tracking-wide ${
          tone === "warm" ? "bg-cream/85 text-[#7a5f28]" : "bg-navy/60 text-[#c9d3e2]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
