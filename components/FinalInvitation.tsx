"use client";

import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

export default function FinalInvitation() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-gold/15 bg-navy-deep px-[5%] py-20 sm:py-24 lg:py-28">
      <Reveal className="mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
        <span aria-hidden className="h-px w-12 bg-gold" />
        <h2 className="font-serif text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.06] tracking-[-0.015em] text-balance text-cream">
          {t("final.title")}
        </h2>
        <p className="max-w-[46ch] text-[17px] leading-[1.75] text-[#c9d3e2] lg:text-[18px]">{t("final.body")}</p>
        <div className="mt-2 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <Button href="#visit" size="lg">
            {t("nav.planVisit")}
          </Button>
          <Button href="#contact" variant="outline-light" size="lg">
            {t("contact.title")}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
