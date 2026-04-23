import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles, Globe, LifeBuoy } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

type Props = {
  onEmergency: () => void;
};

export function Header({ onEmergency }: Props) {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { label: string; href: string }[] = [
    { label: t("nav_home"), href: "#home" },
    { label: t("nav_practitioners"), href: "#practitioners" },
    { label: t("nav_blog"), href: "#blog" },
    { label: t("nav_about"), href: "#about" },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "glass border-b border-border/60 shadow-[var(--shadow-soft)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-lavender to-sage shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-semibold tracking-tight text-foreground">Sokoun</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              سكون
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
            className="hidden h-9 items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary sm:flex"
            aria-label="Switch language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "fr" ? "العربية" : "Français"}
          </button>

          <Button
            onClick={onEmergency}
            variant="destructive"
            size="sm"
            className="hidden rounded-full sm:inline-flex"
          >
            <LifeBuoy className="h-4 w-4" />
            <span className="hidden lg:inline">{t("emergency")}</span>
          </Button>

          <Button asChild size="sm" className="hidden rounded-full md:inline-flex">
            <a href="#practitioners">{t("nav_book")}</a>
          </Button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass border-t border-border/60 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <Button
                onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
                variant="outline"
                className="flex-1 rounded-full"
              >
                <Globe className="h-4 w-4" />
                {lang === "fr" ? "العربية" : "Français"}
              </Button>
              <Button
                onClick={onEmergency}
                variant="destructive"
                className="flex-1 rounded-full"
              >
                <LifeBuoy className="h-4 w-4" />
                {t("emergency")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
