"use client";

import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "@/lib/language";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.services") },
    { href: "#ministries", label: t("nav.ministries") },
    { href: "#pastor", label: t("nav.pastor") },
    { href: "#sermons", label: t("nav.sermons") },
    { href: "#gallery", label: t("nav.gallery") },
    { href: "#events", label: t("nav.events") },
    { href: "#visit", label: t("nav.visit") },
    { href: "#contact", label: t("nav.contact") },
    { href: "#giving", label: t("footer.give") },
  ];
  const ministryLinks = [
    t("ministries.worship.title"),
    t("ministries.youth.title"),
    t("ministries.prayer.title"),
    t("ministries.bible.title"),
    t("ministries.children.title"),
    t("ministries.outreach.title"),
  ];

  const hasSocial = Object.values(siteConfig.social).some((url) => url && url !== "#");

  return (
    <footer className="border-t border-navy/10 bg-navy text-cream">
      <div className="mx-auto max-w-[1200px] px-[5%] py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-5 w-1 rounded bg-navy" />
                  <div className="h-1 w-5 rounded bg-navy" />
                </div>
              </div>
              <span className="font-serif text-lg font-bold">True Light</span>
            </div>
            <p className="max-w-xs text-sm text-cream/70">{t("footer.tagline")}</p>

            <div className="mt-2">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-cream/50">
                {t("footer.social")}
              </h4>
              {hasSocial ? (
                <div className="flex items-center gap-3">
                  {siteConfig.social.facebook && siteConfig.social.facebook !== "#" && (
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      <FacebookIcon />
                    </a>
                  )}
                  {siteConfig.social.instagram && siteConfig.social.instagram !== "#" && (
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      <InstagramIcon />
                    </a>
                  )}
                  {siteConfig.social.youtube && siteConfig.social.youtube !== "#" && (
                    <a
                      href={siteConfig.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      <YouTubeIcon />
                    </a>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3" aria-hidden="true">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/10 text-cream/25">
                    <FacebookIcon />
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/10 text-cream/25">
                    <InstagramIcon />
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/10 text-cream/25">
                    <YouTubeIcon />
                  </span>
                  <span className="text-xs text-cream/40">{t("footer.socialComingSoon")}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-cream">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-cream/70 transition-colors hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-cream">{t("footer.ministry")}</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              {ministryLinks.map((link) => <li key={link}>{link}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-cream">{t("footer.times")}</h4>
            <div className="space-y-3 text-sm text-cream/70">
              <div>
                <div className="font-semibold text-gold">{t("footer.sunday")}</div>
                <div>1:30 – 3:00 PM</div>
              </div>
              <div>
                <div className="font-semibold text-gold">{t("footer.thursday")}</div>
                <div>6:00 PM</div>
              </div>
              <div className="pt-2">
                <div>{siteConfig.address.street}</div>
                <div>{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 text-center text-sm text-cream/60">
          {t("footer.copyright", { year: currentYear })}
        </div>
      </div>
    </footer>
  );
}
