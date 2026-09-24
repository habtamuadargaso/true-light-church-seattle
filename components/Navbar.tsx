"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/lib/language";

// The six items PHASE 8 calls out as the priority set come first; everything
// else stays reachable right after, so no existing section loses its nav
// entry. "Messages" is a real route (the premium /sermons library), not a
// homepage anchor, so it's tagged "route" and skips the anchor-rewriting
// logic below.
type NavLink =
  | { labelKey: string; kind: "anchor"; id: string; priority: boolean }
  | { labelKey: string; kind: "route"; href: string; priority: boolean };

// The six items called out as primary come first and render with more
// visual weight in the desktop bar; Pastor/Services/Gallery/Contact stay
// right after — same click targets, just visually secondary. Nothing is
// removed.
const navLinks: NavLink[] = [
  { labelKey: "nav.about", kind: "anchor", id: "about", priority: true },
  { labelKey: "nav.sermons", kind: "route", href: "/sermons", priority: true },
  { labelKey: "nav.events", kind: "anchor", id: "events", priority: true },
  { labelKey: "nav.ministries", kind: "anchor", id: "ministries", priority: true },
  { labelKey: "nav.visit", kind: "anchor", id: "visit", priority: true },
  { labelKey: "nav.giving", kind: "anchor", id: "giving", priority: true },
  { labelKey: "nav.pastor", kind: "anchor", id: "pastor", priority: false },
  { labelKey: "nav.services", kind: "anchor", id: "services", priority: false },
  { labelKey: "nav.gallery", kind: "anchor", id: "gallery", priority: false },
  { labelKey: "nav.contact", kind: "anchor", id: "contact", priority: false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const isFullNav = useMediaQuery("(min-width: 1300px)");
  const { lang, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // An anchor link only resolves on the homepage where the section actually
  // lives — from any other page it needs to route back to "/" first.
  const anchorHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.filter((link) => link.kind === "anchor").map((link) => link.id);

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
  }, [isHome]);

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
        scrolled || mobileOpen || !isHome
          ? "border-b border-gold/15 bg-navy/85 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
          : "border-b border-transparent bg-gradient-to-b from-navy/65 to-transparent"
      }`}
    >
      <div className="mx-auto flex min-h-[84px] max-w-[1440px] items-center justify-between px-[5%]">
        {/* Brand */}
        <Link
          href="/"
          aria-label="True Light International Evangelical Church home"
          className="group flex items-center gap-3.5"
        >
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 backdrop-blur-md transition-all duration-300 group-hover:border-gold/60 group-hover:bg-gold/15">
            <div className="relative h-9 w-9">
              <span className="absolute left-1/2 top-0 h-9 w-[3.5px] -translate-x-1/2 rounded-full bg-gold" />
              <span className="absolute left-1/2 top-[11px] h-[3.5px] w-8 -translate-x-1/2 rounded-full bg-gold" />
            </div>
          </div>

          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl font-bold tracking-tight text-cream transition-colors group-hover:text-white">
              True Light
            </span>

            <span className="mt-1.5 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/80 sm:block">
              International Evangelical Church
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {isFullNav && (
          <div className="flex items-center gap-6">
            {navLinks.map((link, index) => {
              const href = link.kind === "anchor" ? anchorHref(link.id) : link.href;
              const isActive =
                link.kind === "anchor" ? activeSection === link.id : pathname.startsWith(link.href);
              const startsSecondaryGroup = !link.priority && navLinks[index - 1]?.priority;

              return (
                <Fragment key={link.labelKey}>
                  {startsSecondaryGroup && <span aria-hidden="true" className="h-4 w-px bg-cream/15" />}
                  <a
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative py-2 font-medium transition-colors duration-300 ${
                      link.priority ? "text-[14px]" : "text-[12.5px]"
                    } ${
                      isActive
                        ? "text-gold"
                        : link.priority
                          ? "text-cream/75 hover:text-cream"
                          : "text-cream/50 hover:text-cream/80"
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
                </Fragment>
              );
            })}
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-4">
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
                className="rounded-full border border-cream/15 bg-white/5 px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.15em] text-cream/80 backdrop-blur-md transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
              >
                {lang === "en" ? "አማርኛ" : "English"}
              </button>

              <Button href={anchorHref("visit")}>{t("nav.planVisit")}</Button>
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
              ? "max-h-[calc(100svh-84px)] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-cream/10 bg-navy/95 px-[6%] pb-8 pt-6 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-xl flex-col">
              {navLinks.map((link, index) => {
                const href = link.kind === "anchor" ? anchorHref(link.id) : link.href;
                const isActive =
                  link.kind === "anchor" ? activeSection === link.id : pathname.startsWith(link.href);

                return (
                  <a
                    key={link.labelKey}
                    href={href}
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
                  href={anchorHref("visit")}
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