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

  signin: { fr: "Connexion", ar: "تسجيل الدخول" },
  signup: { fr: "S'inscrire", ar: "إنشاء حساب" },
  auth_signin_title: { fr: "Bon retour parmi nous", ar: "مرحباً بعودتك" },
  auth_signin_desc: { fr: "Accédez à votre espace personnel Sokoun", ar: "سجّل الدخول إلى مساحتك الخاصة في سكون" },
  auth_signup_title: { fr: "Créer un compte", ar: "إنشاء حساب جديد" },
  auth_signup_desc: { fr: "Rejoignez Sokoun pour un accompagnement bienveillant", ar: "انضم إلى سكون للحصول على دعم متكامل وموثوق" },
  auth_fullname: { fr: "Nom complet", ar: "الاسم الكامل" },
  auth_firstname: { fr: "Prénom", ar: "الاسم" },
  auth_lastname: { fr: "Nom de famille", ar: "اللقب" },
  auth_placeholder_firstname: { fr: "ex. Youssef", ar: "مثال: يوسف" },
  auth_placeholder_lastname: { fr: "ex. Ben Ali", ar: "مثال: بن علي" },
  auth_anon_name: { fr: "Pseudonyme anonyme (généré)", ar: "اسم مستعار مجهول (تلقائي)" },
  auth_anon_desc: {
    fr: "Ce pseudo préserve votre totale confidentialité sur Sokoun.",
    ar: "يحمي هذا الاسم المستعار خصوصيتك التامة على سكون.",
  },
  auth_regen_anon: { fr: "Changer le pseudo", ar: "تغيير الاسم المستعار" },
  auth_birthdate: { fr: "Date de naissance", ar: "تاريخ الميلاد" },
  auth_age_requirement: { fr: "Accès réservé aux 18 ans et plus", ar: "مخصص للبالغين 18 سنة فما فوق" },
  auth_age_error: {
    fr: "Vous devez avoir au moins 18 ans pour pouvoir vous inscrire.",
    ar: "يجب أن يكون عمرك 18 سنة أو أكثر لتتمكن من إنشاء حساب.",
  },
  auth_email: { fr: "Adresse e-mail", ar: "البريد الإلكتروني" },
  auth_password: { fr: "Mot de passe", ar: "كلمة المرور" },
  auth_placeholder_email: { fr: "exemple@email.com", ar: "example@email.com" },
  auth_placeholder_name: { fr: "Votre nom et prénom", ar: "اسمك الكامل" },
  auth_placeholder_pwd: { fr: "••••••••", ar: "••••••••" },
  auth_btn_signin: { fr: "Se connecter", ar: "تسجيل الدخول" },
  auth_btn_signup: { fr: "Créer mon compte", ar: "إنشاء الحساب" },
  auth_no_account: { fr: "Pas encore de compte ?", ar: "ليس لديك حساب بعد؟" },
  auth_has_account: { fr: "Vous avez déjà un compte ?", ar: "لديك حساب بالفعل؟" },
  auth_success_signup: {
    fr: "Inscription réussie ! Bienvenue sur Sokoun.",
    ar: "تم إنشاء الحساب بنجاح! مرحباً بك في سكون.",
  },
  auth_success_signin: {
    fr: "Connexion réussie ! Bienvenue.",
    ar: "تم تسجيل الدخول بنجاح! مرحباً بك.",
  },
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
