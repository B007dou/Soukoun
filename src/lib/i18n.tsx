import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "fr" | "ar";

type Dict = Record<string, { fr: string; ar: string }>;

export const dict = {
  nav_home: { fr: "Accueil", ar: "الرئيسية" },
  nav_practitioners: { fr: "Praticiens", ar: "المختصون" },
  nav_blog: { fr: "Blog", ar: "المدونة" },
  nav_about: { fr: "À propos", ar: "حول" },
  nav_book: { fr: "Réserver", ar: "احجز" },
  emergency: { fr: "Aide immédiate", ar: "مساعدة فورية" },

  hero_kicker: { fr: "Pour les 18+ en Tunisie", ar: "للشباب فوق ١٨ في تونس" },
  hero_title_1: { fr: "Trouvez votre", ar: "اعثر على" },
  hero_title_2: { fr: "sérénité", ar: "سكونك" },
  hero_subtitle: {
    fr: "Sokoun vous accompagne avec des praticiens qualifiés, des ressources apaisantes et un soutien d'urgence — en toute confidentialité.",
    ar: "سُكون يرافقك مع مختصين مؤهلين، موارد مهدّئة، ودعم عاجل — بكل خصوصية.",
  },
  hero_cta_primary: { fr: "Commencer maintenant", ar: "ابدأ الآن" },
  hero_cta_secondary: { fr: "Découvrir le blog", ar: "اكتشف المدونة" },
  breathe_in: { fr: "Inspirez", ar: "شهيق" },
  breathe_out: { fr: "Expirez", ar: "زفير" },

  trust_1: { fr: "Confidentiel à 100%", ar: "سرية تامة" },
  trust_2: { fr: "Praticiens vérifiés", ar: "مختصون موثوقون" },
  trust_3: { fr: "Disponible 7j/7", ar: "متاح ٧ أيام" },

  practitioners_title: { fr: "Nos praticiens", ar: "مختصونا" },
  practitioners_sub: {
    fr: "Des thérapeutes formés, à l'écoute, et accessibles depuis chez vous.",
    ar: "مختصون مدربون، يصغون إليك، ومتاحون من منزلك.",
  },
  book: { fr: "Réserver", ar: "احجز" },
  per_session: { fr: "/ séance", ar: "/ حصة" },

  blog_title: { fr: "Articles & ressources", ar: "مقالات وموارد" },
  blog_sub: {
    fr: "Des lectures douces pour mieux comprendre votre esprit.",
    ar: "قراءات لطيفة لفهم ذاتك بشكل أعمق.",
  },
  read_more: { fr: "Lire l'article", ar: "اقرأ المقال" },

  emergency_title: { fr: "Vous n'êtes pas seul·e", ar: "لست وحدك" },
  emergency_desc: {
    fr: "Si vous êtes en détresse, contactez immédiatement l'un de ces numéros gratuits en Tunisie.",
    ar: "إذا كنت في ضائقة، اتصل فوراً بأحد هذه الأرقام المجانية في تونس.",
  },
  emergency_close: { fr: "Fermer", ar: "إغلاق" },

  footer_tag: { fr: "Sérénité & tranquillité", ar: "سكون وطمأنينة" },
  footer_rights: { fr: "Tous droits réservés", ar: "جميع الحقوق محفوظة" },
} satisfies Dict;

export type DictKey = keyof typeof dict;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
  dir: "ltr" | "rtl";
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: (k) => dict[k][lang],
    }),
    [lang],
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
