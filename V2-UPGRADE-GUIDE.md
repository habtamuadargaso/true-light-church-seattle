/**
 * VERSION 2 UPGRADE GUIDE
 * 
 * This guide provides exact step-by-step instructions to upgrade your
 * existing Next.js site from Version 1 to Version 2.
 * 
 * NO REBUILDS - Just targeted changes to your codebase.
 */

# True Light Church Seattle — Version 2 Upgrade Guide

## Changes Overview

### ✅ What's Being Added
- **English / Amharic Language Switch** — Toggle languages in navbar
- **Translation System** — All UI text translated
- **Remove Placeholder Text** — Midweek Prayer and other unconfirmed details
- **Preserve Everything Else** — Photos, layout, animations, deployment

---

## File-by-File Changes

### 1. **lib/language-context.tsx** (NEW FILE)
**Action:** Create new file with language context and translations
- Contains English/Amharic translation strings
- Provides `useLanguage()` hook for components
- Manages language state globally

**Usage in components:**
```tsx
import { useLanguage } from '@/lib/language-context';

export default function MyComponent() {
  const { lang, t } = useLanguage();
  
  return <h1>{t('about.title')}</h1>;
}
```

---

### 2. **app/layout.tsx** (MODIFY)
**Action:** Wrap app with LanguageProvider

**Current code:**
```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**New code:**
```tsx
import { LanguageProvider } from '@/lib/language-context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
```

---

### 3. **components/Navbar.tsx** (MODIFY)
**Action:** Add language toggle button to navbar

**Add this import at top:**
```tsx
import { useLanguage } from '@/lib/language-context';
```

**Add language toggle in navbar (after mobile menu button, before Plan Your Visit button):**
```tsx
// Language toggle
<div className="flex items-center gap-3">
  <button
    onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
    className="rounded-full border border-gold/40 px-3 py-1.5 text-xs font-bold transition-colors hover:bg-gold/20"
    aria-label="Toggle language"
  >
    {lang === 'en' ? 'አ' : 'EN'}
  </button>
</div>
```

**Inside component, add:**
```tsx
const { lang, setLang, t } = useLanguage();
```

**Replace hardcoded nav labels with translations:**
```tsx
// Before:
<a href="#about">About</a>

// After:
<a href="#about">{t('nav.about')}</a>
```

---

### 4. **components/ServiceTimes.tsx** (MODIFY)
**Action:** Remove "Midweek Prayer" (placeholder)

**Current code:**
```tsx
export const serviceTimes = [
  { name: "Sunday Worship", time: "1:30 – 3:00 PM", day: "Every Sunday" },
  { name: "Bible Study", time: "6:00 PM", day: "Every Thursday" },
  { name: "Midweek Prayer", time: "7:00 PM", day: "Every Wednesday" }, // REMOVE THIS
];
```

**New code:**
```tsx
export const serviceTimes = [
  { name: "Sunday Worship", time: "1:30 – 3:00 PM", day: "Every Sunday" },
  { name: "Bible Study", time: "6:00 PM", day: "Every Thursday" },
];
```

**Also add translations usage:**
```tsx
import { useLanguage } from '@/lib/language-context';

export default function ServiceTimes() {
  const { t } = useLanguage();
  
  // Replace hardcoded text with t() calls
  return (
    <section>
      <SectionHeading
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        description={t('services.description')}
      />
      {/* ... rest of component */}
    </section>
  );
}
```

---

### 5. **components/About.tsx** (MODIFY)
**Action:** Use translations

```tsx
import { useLanguage } from '@/lib/language-context';

export default function About() {
  const { t } = useLanguage();
  
  return (
    <section id="about">
      <span className="text-[12.5px]...">{t('about.eyebrow')}</span>
      <h2 className="font-serif...">{t('about.title')}</h2>
      <p>{t('about.description')}</p>
      {/* ... rest */}
    </section>
  );
}
```

---

### 6. **components/Hero.tsx** (MODIFY)
**Action:** Use translations

```tsx
import { useLanguage } from '@/lib/language-context';

export default function Hero() {
  const { t } = useLanguage();
  
  return (
    <section id="hero">
      <span className="text-xs...">{t('hero.welcome')}</span>
      <h1 className="font-serif...">{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <Button href="#visit">{t('hero.visit')}</Button>
      <Button href="#sermons">{t('hero.sermons')}</Button>
    </section>
  );
}
```

---

### 7. **Other Components** (SAME PATTERN)
Apply the same translation pattern to:
- `components/Ministries.tsx`
- `components/Sermons.tsx`
- `components/Gallery.tsx`
- `components/Events.tsx`
- `components/Mission.tsx`
- `components/Giving.tsx`
- `components/Visit.tsx`
- `components/Contact.tsx`
- `components/Footer.tsx`

**General pattern:**
1. Import `useLanguage` at top
2. Call `const { t } = useLanguage()` in component
3. Replace all hardcoded UI text with `t('key.name')`

---

## Implementation Steps

### Step 1: Create Language Context
```bash
# Create new file: lib/language-context.tsx
# (Copy the full content provided above)
```

### Step 2: Update Layout
- Modify `app/layout.tsx`
- Wrap children with `<LanguageProvider>`

### Step 3: Update Navbar
- Add `useLanguage` hook
- Add language toggle button
- Replace nav labels with translations

### Step 4: Update ServiceTimes
- Remove "Midweek Prayer" from data
- Add `useLanguage` hook
- Replace text with translations

### Step 5: Update Other Components
- For each component (About, Hero, Ministries, etc.)
- Add `useLanguage` hook
- Replace hardcoded text with `t()` calls

### Step 6: Test Locally
```bash
npm run dev
# Test language toggle
# Verify all text updates when switching languages
```

### Step 7: Build & Deploy
```bash
npm run build
# Should complete with 0 errors

# Push to GitHub
git add .
git commit -m "feat: V2 - Add English/Amharic language support"
git push origin main
# Vercel auto-deploys
```

---

## Translation Keys Reference

Common keys to use in components:

| Component | Keys |
|-----------|------|
| Navbar | `nav.about`, `nav.services`, `nav.sermons`, `nav.gallery`, `nav.contact`, `nav.plan-visit` |
| Hero | `hero.welcome`, `hero.title`, `hero.subtitle`, `hero.visit`, `hero.sermons` |
| About | `about.eyebrow`, `about.title`, `about.description`, `about.leadership`, `about.stat1/2/3` |
| Services | `services.eyebrow`, `services.title`, `services.description`, `services.sunday`, `services.thursday` |
| Ministries | `ministries.eyebrow`, `ministries.title`, `ministries.description` |
| Footer | `footer.quick-links`, `footer.ministry`, `footer.copyright` |

Full list in `lib/language-context.tsx`

---

## Quality Checklist

Before final delivery:

- [ ] Language toggle appears in navbar
- [ ] Clicking toggle switches all text to Amharic/English
- [ ] "Midweek Prayer" removed from ServiceTimes
- [ ] All photos unchanged
- [ ] `npm run build` passes (0 errors)
- [ ] Deploy to Vercel succeeds
- [ ] Test on mobile and desktop
- [ ] Verify both languages render correctly

---

## Rollback (If Needed)

If anything breaks:
```bash
git revert HEAD
git push origin main
```

---

## Support

- **Language files:** `lib/language-context.tsx`
- **Hook usage:** `import { useLanguage } from '@/lib/language-context'`
- **Add new text:** Update `translations` object in language-context.tsx, then use `t('key')` in components

---

**Version 2 — Ready for Launch** 🎉
