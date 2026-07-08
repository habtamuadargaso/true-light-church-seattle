"use client";

import { siteConfig } from "@/lib/site-config";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

export default function Giving() {
  const { t } = useLanguage();
  const methods = [
    { title: t("giving.onlineTitle"), description: t("giving.onlineDesc"), icon: "💳" },
    { title: t("giving.personTitle"), description: t("giving.personDesc"), icon: "🙏" },
    { title: t("giving.mailTitle"), description: t("giving.mailDesc"), icon: "✉️" },
  ];
  const hasGivingUrl = Boolean(siteConfig.givingUrl && siteConfig.givingUrl !== "#");

  return (
    <section className="mx-auto max-w-[1200px] px-[5%] py-32">
      <div className="mb-16 flex justify-center">
        <SectionHeading
          eyebrow={t("giving.eyebrow")}
          title={t("giving.title")}
          description={t("giving.description")}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {methods.map((method, i) => (
          <Reveal key={method.title} delay={Math.min(i * 0.1, 0.2)}>
            <div className="flex flex-col gap-4 rounded-2xl border border-navy/10 bg-gradient-to-br from-cream to-white p-8 shadow-sm">
              <div className="text-4xl">{method.icon}</div>
              <h3 className="font-serif text-xl font-bold text-navy">
                {method.title}
              </h3>
              <p className="text-[16px] text-[#4b5566]">
                {method.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-12 rounded-2xl border-2 border-gold/30 bg-gradient-to-r from-gold/10 to-gold/5 p-12 text-center">
        <p className="mb-6 text-lg text-[#4b5566]">
          {t("giving.impact")}
        </p>
        <Button href={siteConfig.givingUrl || "#"}>
          {hasGivingUrl ? t("giving.button") : t("giving.comingSoon")}
        </Button>
      </Reveal>
    </section>
  );
}
