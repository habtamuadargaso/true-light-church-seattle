import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "outline-light" | "outline-dark";

const base =
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-br from-gold-light to-gold text-navy shadow-[0_8px_28px_rgba(201,164,92,0.35)] hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(201,164,92,0.48)]",
  "outline-light":
    "border-[1.5px] border-cream/40 text-cream hover:bg-cream/10 hover:border-cream/70",
  "outline-dark":
    "border-[1.5px] border-navy text-navy hover:bg-navy hover:text-cream",
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "sm" | "md";
  className?: string;
  external?: boolean;
}

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: ButtonProps) {
  const sizeClasses = size === "sm" ? "px-5 py-2.5 text-sm" : "px-8 py-4 text-[15px]";
  const isAnchor = external || href.startsWith("#") || href.startsWith("http");

  const classes = `${base} ${variants[variant]} ${sizeClasses} ${className}`;

  if (isAnchor) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
