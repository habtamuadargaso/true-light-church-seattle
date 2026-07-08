interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-3.5 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <span
        className={`text-[12.5px] font-bold uppercase tracking-[0.22em] ${
          light ? "text-gold" : "text-gold-deep"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`font-serif text-[clamp(1.875rem,4vw,2.625rem)] font-bold text-balance ${
          light ? "text-cream" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-xl text-base text-balance ${
            light ? "text-[#a9b3c4]" : "text-[#5b6472]"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
