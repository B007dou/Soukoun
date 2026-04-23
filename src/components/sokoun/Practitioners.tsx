import { motion } from "framer-motion";
import { Star, Calendar, Video } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import t1 from "@/assets/therapist-1.jpg";
import t2 from "@/assets/therapist-2.jpg";
import t3 from "@/assets/therapist-3.jpg";

type Practitioner = {
  name: { fr: string; ar: string };
  role: { fr: string; ar: string };
  tags: { fr: string; ar: string }[];
  price: number;
  rating: number;
  img: string;
};

const list: Practitioner[] = [
  {
    name: { fr: "Dr. Leïla Ben Salah", ar: "د. ليلى بن صالح" },
    role: { fr: "Psychologue clinicienne", ar: "أخصائية نفسية إكلينيكية" },
    tags: [
      { fr: "Anxiété", ar: "القلق" },
      { fr: "Burn-out", ar: "الإرهاق" },
    ],
    price: 80,
    rating: 4.9,
    img: t1,
  },
  {
    name: { fr: "Dr. Amine Trabelsi", ar: "د. أمين الطرابلسي" },
    role: { fr: "Psychothérapeute TCC", ar: "معالج سلوكي معرفي" },
    tags: [
      { fr: "Dépression", ar: "الاكتئاب" },
      { fr: "Couple", ar: "علاقات" },
    ],
    price: 90,
    rating: 4.8,
    img: t2,
  },
  {
    name: { fr: "Dr. Sarra Mansouri", ar: "د. سارة المنصوري" },
    role: { fr: "Coach pleine conscience", ar: "مدربة يقظة ذهنية" },
    tags: [
      { fr: "Stress", ar: "الإجهاد" },
      { fr: "Sommeil", ar: "النوم" },
    ],
    price: 65,
    rating: 5.0,
    img: t3,
  },
];

export function Practitioners() {
  const { t, lang } = useI18n();

  return (
    <section id="practitioners" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            01 — {t("practitioners_title")}
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t("practitioners_title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("practitioners_sub")}</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <motion.article
              key={p.name.fr}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-glow)]"
            >
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
                <img
                  src={p.img}
                  alt={p.name[lang]}
                  loading="lazy"
                  width={512}
                  height={384}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute end-3 top-3 flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  {p.rating}
                </div>
                <div className="absolute start-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-sage/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary-foreground">
                  <Video className="h-3 w-3" />
                  Online
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground">{p.name[lang]}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{p.role[lang]}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span
                    key={tag.fr}
                    className="rounded-full bg-lavender-soft px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {tag[lang]}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="text-xl font-semibold text-foreground">
                    {p.price} <span className="text-xs font-normal text-muted-foreground">DT</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{t("per_session")}</p>
                </div>
                <Button size="sm" className="rounded-full">
                  <Calendar className="h-4 w-4" />
                  {t("book")}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
