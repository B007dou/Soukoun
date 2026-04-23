import { AnimatePresence, motion } from "framer-motion";
import { Phone, X, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
};

const numbers = [
  {
    label: { fr: "SOS Détresse — Tunisie", ar: "إس أو إس للضائقة — تونس" },
    number: "71 561 561",
    desc: { fr: "Écoute psychologique 24/7", ar: "إصغاء نفسي ٢٤/٧" },
  },
  {
    label: { fr: "SAMU — Urgences", ar: "الإسعاف — الطوارئ" },
    number: "190",
    desc: { fr: "Urgences médicales", ar: "طوارئ طبية" },
  },
  {
    label: { fr: "Police secours", ar: "نجدة الشرطة" },
    number: "197",
    desc: { fr: "Sécurité immédiate", ar: "سلامة فورية" },
  },
];

export function EmergencyModal({ open, onClose }: Props) {
  const { t, lang } = useI18n();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-foreground/40 px-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute end-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-destructive/10 text-destructive">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{t("emergency_title")}</h3>
                <p className="text-sm text-muted-foreground">{lang === "fr" ? "Tunisie" : "تونس"}</p>
              </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{t("emergency_desc")}</p>

            <ul className="space-y-2.5">
              {numbers.map((n) => (
                <li key={n.number}>
                  <a
                    href={`tel:${n.number.replace(/\s/g, "")}`}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/60 p-4 transition-colors hover:bg-secondary"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">{n.label[lang]}</p>
                      <p className="text-xs text-muted-foreground">{n.desc[lang]}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-3.5 py-1.5 text-sm font-semibold text-destructive-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      {n.number}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-2 rounded-2xl bg-sage-soft p-4 text-xs text-foreground/80">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
              <p>
                {lang === "fr"
                  ? "Vos appels sont gratuits et confidentiels. Vous n'êtes pas seul·e."
                  : "مكالماتك مجانية وسرية. لست وحدك."}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
