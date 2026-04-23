import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, BadgeCheck, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t, dir } = useI18n();

  const trust = [
    { icon: ShieldCheck, label: t("trust_1") },
    { icon: BadgeCheck, label: t("trust_2") },
    { icon: Clock, label: t("trust_3") },
  ];

  return (
    <section id="home" className="gradient-hero relative overflow-hidden">
      {/* floating soft blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="float-soft absolute -top-20 left-[10%] h-72 w-72 rounded-full bg-lavender-soft blur-3xl" />
        <div
          className="float-soft absolute right-[5%] top-40 h-80 w-80 rounded-full bg-sage-soft blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" />
            {t("hero_kicker")}
          </span>

          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {t("hero_title_1")}{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-br from-primary via-lavender to-sage bg-clip-text text-transparent">
                {t("hero_title_2")}
              </span>
              <motion.svg
                viewBox="0 0 200 12"
                className="absolute -bottom-2 left-0 h-3 w-full text-primary/50"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6, duration: 1.2 }}
              >
                <motion.path
                  d="M2 8 Q 50 2, 100 6 T 198 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("hero_subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-6 text-base shadow-[var(--shadow-glow)]">
              <a href="#practitioners">
                {t("hero_cta_primary")}
                <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-border bg-card/60 px-6 text-base backdrop-blur">
              <a href="#blog">{t("hero_cta_secondary")}</a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {trust.map((it) => (
              <div key={it.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <it.icon className="h-4 w-4 text-sage" strokeWidth={2.2} />
                {it.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Breathing circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative flex items-center justify-center lg:col-span-5"
        >
          <div className="relative aspect-square w-full max-w-md">
            {/* concentric soft rings */}
            <div className="breathing absolute inset-0 rounded-full bg-gradient-to-br from-lavender-soft via-cream to-sage-soft shadow-[var(--shadow-card)]" />
            <div
              className="breathing absolute inset-8 rounded-full bg-gradient-to-br from-lavender/40 to-sage/30"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="breathing absolute inset-16 rounded-full bg-gradient-to-br from-primary/40 to-sage/40 backdrop-blur"
              style={{ animationDelay: "1s" }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="font-arabic text-3xl font-medium text-primary-foreground/90 mix-blend-overlay">
                  سكون
                </p>
                <p className="mt-2 text-sm font-medium text-foreground/80">
                  {t("breathe_in")} · {t("breathe_out")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
