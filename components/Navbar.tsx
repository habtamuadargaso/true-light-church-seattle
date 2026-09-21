"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";

const navLinks = [
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.services", href: "#services" },
  { labelKey: "nav.ministries", href: "#ministries" },
  { labelKey: "nav.pastor", href: "#pastor" },
  { labelKey: "nav.sermons", href: "#sermons" },
  { labelKey: "nav.events", href: "#events" },
  { labelKey: "nav.gallery", href: "#gallery" },
  { labelKey: "nav.visit", href: "#visit" },
  { labelKey: "nav.contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const isFullNav = useMediaQuery("(min-width: 1300px)");
  const { lang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((link) => link.href.slice(1));

      const current = sections.find((section) => {
        const element = document.getElementById(section);

        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();

        return rect.top <= 140 && rect.bottom >= 140;
      });

      setActiveSection(current || "");
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isFullNav && mobileOpen) {
      setMobileOpen(false);
    }
  }, [isFullNav, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`transition-all duration-500 ${
        scrolled || mobileOpen
          ? "border-b border-gold/15 bg-navy/85 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
          : "border-b border-transparent bg-gradient-to-b from-navy/65 to-transparent"
      }`}
    >
      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center justify-between px-[5%]">
        {/* Brand */}
        <Link
          href="/"
          aria-label="True Light International Evangelical Church home"
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 backdrop-blur-md transition-all duration-300 group-hover:border-gold/60 group-hover:bg-gold/15">
            <div className="relative h-7 w-7">
              <span className="absolute left-1/2 top-0 h-7 w-[3px] -translate-x-1/2 rounded-full bg-gold" />
              <span className="absolute left-1/2 top-[9px] h-[3px] w-6 -translate-x-1/2 rounded-full bg-gold" />
            </div>
          </div>

          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg font-bold tracking-tight text-cream transition-colors group-hover:text-white">
              True Light
            </span>

            <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-gold/80 sm:block">
              International Evangelical Church
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {isFullNav && (
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative py-2 text-[13px] font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-gold"
                      : "text-cream/75 hover:text-cream"
                  }`}
                >
                  {t(link.labelKey)}

                  <span
                    className={`absolute inset-x-0 -bottom-1 mx-auto h-[2px] rounded-full bg-gold transition-all duration-300 ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-70"
                    }`}
                  />
                </a>
              );
            })}
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {isFullNav ? (
            <>
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={
                  lang === "en"
                    ? "Switch website language to Amharic"
                    : "Switch website language to English"
                }
                className="rounded-full border border-cream/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-cream/80 backdrop-blur-md transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
              >
                {lang === "en" ? "አማርኛ" : "English"}
              </button>

              <Button href="#visit" size="sm">
                {t("nav.planVisit")}
              </Button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={
                  lang === "en"
                    ? "Switch website language to Amharic"
                    : "Switch website language to English"
                }
                className="rounded-full border border-cream/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-cream/80 transition-colors hover:border-gold/50 hover:text-gold"
              >
                {lang === "en" ? "አማርኛ" : "EN"}
              </button>

              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((open) => !open)}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 bg-white/5 backdrop-blur-md transition-all hover:border-gold/50"
              >
                <div className="relative h-5 w-6">
                  <span
                    className={`absolute left-0 top-0 block h-[2px] w-6 rounded-full bg-cream transition-all duration-300 ${
                      mobileOpen
                        ? "top-[9px] rotate-45"
                        : ""
                    }`}
                  />

                  <span
                    className={`absolute left-0 top-[9px] block h-[2px] w-6 rounded-full bg-cream transition-all duration-300 ${
                      mobileOpen
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                  />

                  <span
                    className={`absolute left-0 top-[18px] block h-[2px] w-6 rounded-full bg-cream transition-all duration-300 ${
                      mobileOpen
                        ? "top-[9px] -rotate-45"
                        : ""
                    }`}
                  />
                </div>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!isFullNav && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            mobileOpen
              ? "max-h-[calc(100svh-76px)] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-cream/10 bg-navy/95 px-[6%] pb-8 pt-6 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-xl flex-col">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.slice(1);

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between border-b border-cream/10 py-4 text-lg font-medium transition-colors ${
                      isActive
                        ? "text-gold"
                        : "text-cream hover:text-gold"
                    }`}
                  >
                    <span>{t(link.labelKey)}</span>

                    <span className="text-sm text-gold/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                );
              })}

              <div className="mt-7">
                <Button
                  href="#visit"
                  className="w-full justify-center"
                >
                  {t("nav.planVisit")}
                </Button>
              </div>

              <p className="mt-6 text-center text-xs leading-relaxed text-cream/50">
                True Light International Evangelical Church
                <br />
                Shoreline, Washington
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}