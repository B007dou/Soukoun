import { motion } from "framer-motion";
import { Heart, Lock, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const values = {
  fr: [
    { icon: Heart, title: "Bienveillance", desc: "Un espace sans jugement, à votre rythme." },
    { icon: Lock, title: "Confidentialité", desc: "Vos échanges restent strictement privés." },
    { icon: Users, title: "Communauté", desc: "Pensé pour les jeunes adultes en Tunisie." },
  ],
  ar: [
    { icon: Heart, title: "اللطف", desc: "فضاء بلا حكم، على إيقاعك." },
    { icon: Lock, title: "السرية", desc: "تبقى محادثاتك خاصة تماماً." },
    { icon: Users, title: "مجتمع", desc: "مصمّم للشباب في تونس." },
  ],
};

export function About() {
  const { lang } = useI18n();
  const items = values[lang];

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            03 — {lang === "fr" ? "Nos valeurs" : "قيمنا"}
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {lang === "fr" ? "Une approche douce, humaine et locale." : "نهج لطيف وإنساني ومحلي."}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]"
            >
              <span className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl bg-lavender-soft text-primary">
                <it.icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
