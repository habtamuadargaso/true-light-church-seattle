"use client";

import { FormEvent, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/language";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-[5%] py-32">
      <div className="mb-16 flex justify-center">
        <SectionHeading
          eyebrow={t("contact.eyebrow")}
          title={t("contact.title")}
          description={t("contact.description")}
        />
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-8">
          <div>
            <h3 className="mb-2 font-serif text-2xl font-bold text-navy">{t("contact.reach")}</h3>
            <p className="text-[16px] text-[#4b5566]">{t("contact.message")}</p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-1 font-semibold text-navy">{t("contact.address")}</div>
              <p className="text-[16px] text-[#4b5566]">
                15211 15th Ave NE<br />Shoreline, WA 98155
              </p>
            </div>
            <div>
              <div className="mb-1 font-semibold text-navy">{t("contact.times")}</div>
              <p className="text-[16px] text-[#4b5566]">
                {t("visit.sunday")}: 1:30 – 3:00 PM<br />
                {t("visit.bible")}: 6:00 PM
              </p>
            </div>
            <div>
              <div className="mb-1 font-semibold text-navy">{t("contact.social")}</div>
              <p className="text-[16px] text-[#4b5566]">{t("contact.socialComingSoon")}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="rounded-2xl border border-navy/10 bg-gradient-to-br from-white to-cream/20 p-8 shadow-sm">
            <div className="mb-6">
              <label htmlFor="name" className="mb-2 block font-semibold text-navy">{t("contact.name")}</label>
              <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-lg border border-navy/20 px-4 py-3 text-[16px] transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" placeholder={t("contact.namePlaceholder")} />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="mb-2 block font-semibold text-navy">{t("contact.email")}</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-lg border border-navy/20 px-4 py-3 text-[16px] transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" placeholder="your@email.com" />
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="mb-2 block font-semibold text-navy">{t("contact.phone")}</label>
              <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-lg border border-navy/20 px-4 py-3 text-[16px] transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" placeholder={t("contact.phonePlaceholder")} />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="mb-2 block font-semibold text-navy">{t("contact.formMessage")}</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full resize-none rounded-lg border border-navy/20 px-4 py-3 text-[16px] transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20" placeholder={t("contact.messagePlaceholder")} />
            </div>
            {status === "success" && <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-green-800">{t("contact.success")}</div>}
            {status === "error" && <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-red-800">{t("contact.error")}</div>}
            <button type="submit" disabled={status === "loading"} className="w-full rounded-lg bg-navy px-6 py-3 font-semibold text-cream transition-all hover:bg-navy/90 disabled:opacity-50">
              {status === "loading" ? t("contact.sending") : t("contact.submit")}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
