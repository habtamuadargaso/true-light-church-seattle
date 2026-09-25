/** Small uppercase section label led by a thin gold rule. */
export default function Eyebrow({
  children,
  light = false,
  className = "",
}: {
  children: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span aria-hidden className="h-px w-10 shrink-0 bg-gold" />
      <span
        className={`label-caps text-[12.5px] font-semibold uppercase tracking-[0.24em] ${
          light ? "text-gold" : "text-gold-deep"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
