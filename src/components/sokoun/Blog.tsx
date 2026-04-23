import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import b1 from "@/assets/blog-1.jpg";
import b2 from "@/assets/blog-2.jpg";
import b3 from "@/assets/blog-3.jpg";

type Post = {
  title: { fr: string; ar: string };
  excerpt: { fr: string; ar: string };
  category: { fr: string; ar: string };
  read: string;
  img: string;
};

const posts: Post[] = [
  {
    title: {
      fr: "Comment apaiser une crise d'anxiété en 4 minutes",
      ar: "كيف تهدّئ نوبة قلق في ٤ دقائق",
    },
    excerpt: {
      fr: "Une technique de respiration douce inspirée de la pleine conscience.",
      ar: "تقنية تنفس لطيفة مستوحاة من اليقظة الذهنية.",
    },
    category: { fr: "Anxiété", ar: "القلق" },
    read: "4 min",
    img: b1,
  },
  {
    title: {
      fr: "La méditation pour les débutants en Tunisie",
      ar: "التأمل للمبتدئين في تونس",
    },
    excerpt: {
      fr: "Un guide simple et bienveillant pour démarrer une pratique quotidienne.",
      ar: "دليل بسيط ولطيف لبدء ممارسة يومية.",
    },
    category: { fr: "Méditation", ar: "تأمل" },
    read: "6 min",
    img: b2,
  },
  {
    title: {
      fr: "Mieux dormir : rituel du soir apaisant",
      ar: "نوم أفضل: طقوس مسائية مهدّئة",
    },
    excerpt: {
      fr: "Sept gestes simples pour préparer votre corps et votre esprit au repos.",
      ar: "سبع خطوات بسيطة لتهيئة جسدك وعقلك للراحة.",
    },
    category: { fr: "Sommeil", ar: "النوم" },
    read: "5 min",
    img: b3,
  },
];

export function Blog() {
  const { t, lang } = useI18n();

  return (
    <section id="blog" className="relative bg-secondary/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              02 — {t("blog_title")}
            </p>
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {t("blog_title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("blog_sub")}</p>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.a
              key={p.title.fr}
              href="#"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                <img
                  src={p.img}
                  alt={p.title[lang]}
                  loading="lazy"
                  width={768}
                  height={480}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute start-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                  {p.category[lang]}
                </span>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {p.read}
                </div>
                <h3 className="text-xl font-semibold leading-snug text-foreground">
                  {p.title[lang]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.excerpt[lang]}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-foreground">
                  {t("read_more")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
