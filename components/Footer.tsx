"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { useLanguage } from "@/lib/language";
import { FacebookIcon, TikTokIcon, YouTubeIcon } from "@/components/ui/SocialIcons";

interface FooterSocial {
  facebook: string | null;
  tiktok: string | null;
  youtube: string | null;
}

interface FooterContact {
  email: string | null;
  phone: string | null;
}

const EMPTY_SOCIAL: FooterSocial = { facebook: null, tiktok: null, youtube: null };
const EMPTY_CONTACT: FooterContact = { email: null, phone: null };

export default function Footer({
  social = EMPTY_SOCIAL,
  contact = EMPTY_CONTACT,
}: {
  social?: FooterSocial;
  contact?: FooterContact;
}) {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const anchorHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const quickLinks = [
    { href: anchorHref("about"), label: t("nav.about") },
    { href: anchorHref("services"), label: t("nav.services") },
    { href: anchorHref("ministries"), label: t("nav.ministries") },
    { href: anchorHref("pastor"), label: t("nav.pastor") },
    { href: "/sermons", label: t("nav.sermons") },
    { href: anchorHref("gallery"), label: t("nav.gallery") },
    { href: anchorHref("events"), label: t("nav.events") },
    { href: anchorHref("visit"), label: t("nav.visit") },
    { href: anchorHref("contact"), label: t("nav.contact") },
    { href: anchorHref("giving"), label: t("footer.give") },
  ];
  const ministryLinks = [
    t("ministries.worship.title"),
    t("ministries.youth.title"),
    t("ministries.prayer.title"),
    t("ministries.bible.title"),
    t("ministries.children.title"),
    t("ministries.outreach.title"),
  ];

  const hasSocial = Boolean(social.facebook || social.tiktok || social.youtube);

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
                  {social.facebook && (
                    <a
                      href={social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      <FacebookIcon />
                    </a>
                  )}
                  {social.tiktok && (
                    <a
                      href={social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      <TikTokIcon />
                    </a>
                  )}
                  {social.youtube && (
                    <a
                      href={social.youtube}
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
                    <TikTokIcon />
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
              {(contact.email || contact.phone) && (
                <div className="space-y-1 pt-2">
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="block hover:text-gold">
                      {contact.email}
                    </a>
                  )}
                  {contact.phone && (
                    <a href={`tel:${contact.phone}`} className="block hover:text-gold">
                      {contact.phone}
                    </a>
                  )}
                </div>
              )}
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
