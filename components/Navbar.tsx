"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";

const navLinks = [
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.services", href: "#services" },
  { labelKey: "nav.ministries", href: "#ministries" },
  { labelKey: "nav.sermons", href: "#sermons" },
  { labelKey: "nav.events", href: "#events" },
  { labelKey: "nav.gallery", href: "#gallery" },
  { labelKey: "nav.visit", href: "#visit" },
  { labelKey: "nav.contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const isFullNav = useMediaQuery("(min-width: 1240px)");
  const { lang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.slice(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gold/15 bg-navy/70 px-[5%] py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-cream">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light shadow-lg">
            <div className="flex flex-col items-center gap-1">
              <div className="h-5 w-1 rounded bg-navy" />
              <div className="h-1 w-5 rounded bg-navy" />
            </div>
          </div>
          <span className="font-serif text-lg font-bold">True Light</span>
        </Link>

        {isFullNav && (
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? "text-gold"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          {isFullNav && (
            <>
              <button
                type="button"
                onClick={toggleLanguage}
                className="text-xs font-semibold uppercase tracking-wide text-cream/60 transition-colors hover:text-gold"
              >
                {lang === "en" ? "አማርኛ" : "English"}
              </button>

              <Button href="#visit" size="sm">
                {t("nav.plan-visit")}
              </Button>
            </>
          )}

          {!isFullNav && (
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="flex flex-col gap-1.5 p-2"
            >
              <span
                className={`block h-0.5 w-6 bg-cream transition-all ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-cream transition-all ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-cream transition-all ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {!isFullNav && mobileOpen && (
        <div className="mt-4 flex flex-col gap-3 border-t border-cream/10 pt-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-cream hover:text-gold"
            >
              {t(link.labelKey)}
            </a>
          ))}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="text-xs font-semibold uppercase tracking-wide text-cream/60 transition-colors hover:text-gold"
            >
              {lang === "en" ? "አማርኛ" : "English"}
            </button>

            <Button href="#visit" className="mt-0">
              {t("nav.plan-visit")}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}