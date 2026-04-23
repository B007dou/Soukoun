import { motion } from "framer-motion";
import { LifeBuoy } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function EmergencyFab({ onClick }: { onClick: () => void }) {
  const { t } = useI18n();
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="fixed bottom-5 end-5 z-40 inline-flex items-center gap-2 rounded-full bg-destructive px-5 py-3.5 text-sm font-semibold text-destructive-foreground shadow-[0_12px_40px_-8px_oklch(0.62_0.18_25/0.5)] transition-shadow hover:shadow-[0_16px_50px_-10px_oklch(0.62_0.18_25/0.7)] sm:end-8 sm:bottom-8"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive-foreground/70 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-destructive-foreground" />
      </span>
      <LifeBuoy className="h-4 w-4" />
      <span className="hidden sm:inline">{t("emergency")}</span>
    </motion.button>
  );
}
