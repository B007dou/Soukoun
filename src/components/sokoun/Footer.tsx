import { Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-lavender to-sage">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">Sokoun · سكون</p>
            <p className="text-xs text-muted-foreground">{t("footer_tag")}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sokoun — {t("footer_rights")}
        </p>
      </div>
    </footer>
  );
}
