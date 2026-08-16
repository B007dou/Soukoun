import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export type AuthMode = "signin" | "signup";

type Props = {
  open: boolean;
  initialMode?: AuthMode;
  onClose: () => void;
  onSuccess?: () => void;
};

export function AuthModal({ open, initialMode = "signin", onClose, onSuccess }: Props) {
  const { t, lang } = useI18n();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Sync mode with initialMode when opened
  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setErrorMsg("");
      setSuccessMsg("");
    }
  }, [open, initialMode]);

  // Handle escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg(t("auth_success_signup"));
          if (onSuccess) onSuccess();
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg(t("auth_success_signin"));
          if (onSuccess) onSuccess();
          setTimeout(() => {
            onClose();
          }, 1200);
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

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
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute end-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header / Brand Badge */}
            <div className="mb-5 flex flex-col items-center text-center">
              <span className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary shadow-inner">
                <Sparkles className="h-6 w-6" />
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {mode === "signin" ? t("auth_signin_title") : t("auth_signup_title")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {mode === "signin" ? t("auth_signin_desc") : t("auth_signup_desc")}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="mb-6 flex rounded-2xl bg-secondary/80 p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                  mode === "signin"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("signin")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                  mode === "signup"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("signup")}
              </button>
            </div>

            {/* Error & Success Alerts */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-start gap-2.5 rounded-2xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p className="leading-relaxed">{errorMsg}</p>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-start gap-2.5 rounded-2xl border border-sage/30 bg-sage-soft p-3 text-xs text-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                <p className="leading-relaxed">{successMsg}</p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    {t("auth_fullname")}
                  </label>
                  <div className="relative">
                    <User className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t("auth_placeholder_name")}
                      required
                      className="w-full rounded-2xl border border-border bg-card py-2.5 pe-4 ps-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  {t("auth_email")}
                </label>
                <div className="relative">
                  <Mail className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("auth_placeholder_email")}
                    required
                    className="w-full rounded-2xl border border-border bg-card py-2.5 pe-4 ps-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  {t("auth_password")}
                </label>
                <div className="relative">
                  <Lock className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("auth_placeholder_pwd")}
                    required
                    minLength={6}
                    className="w-full rounded-2xl border border-border bg-card py-2.5 pe-10 ps-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl py-5 text-sm font-semibold shadow-md transition-all hover:opacity-95"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Chargement...</span>
                  </span>
                ) : mode === "signin" ? (
                  t("auth_btn_signin")
                ) : (
                  t("auth_btn_signup")
                )}
              </Button>
            </form>

            {/* Bottom switcher helper */}
            <div className="mt-5 text-center text-xs text-muted-foreground">
              {mode === "signin" ? (
                <p>
                  {t("auth_no_account")}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="font-semibold text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    {t("signup")}
                  </button>
                </p>
              ) : (
                <p>
                  {t("auth_has_account")}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="font-semibold text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    {t("signin")}
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
