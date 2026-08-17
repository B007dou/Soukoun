import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Shuffle,
  Calendar,
  ShieldCheck,
} from "lucide-react";
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

const ADJECTIVES = [
  "Calm",
  "Serene",
  "Quiet",
  "Gentle",
  "Peaceful",
  "Silent",
  "Cozy",
  "Tranquil",
  "Brave",
  "Bright",
  "Hopeful",
  "Warm",
  "Kind",
  "Mindful",
  "Mystic",
  "Solar",
  "Lunar",
  "Mellow",
  "Soft",
  "Zen",
  "Golden",
  "Emerald",
  "Azure",
  "Velvet",
];

const NOUNS = [
  "Olive",
  "Breeze",
  "River",
  "Horizon",
  "Wave",
  "Forest",
  "Panda",
  "Cedar",
  "Lotus",
  "Sparrow",
  "Cactus",
  "Echo",
  "Atlas",
  "Oasis",
  "Meadow",
  "Cloud",
  "Dolphin",
  "Starlight",
  "Valley",
  "Haven",
  "Pine",
  "Willow",
  "Desert",
  "Garden",
];

function generateAnonymousName(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(100 + Math.random() * 9000);
  return `${adj}${noun}_${num}`;
}

function calculateAge(birthDateString: string): number {
  if (!birthDateString) return 0;
  const birth = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function AuthModal({ open, initialMode = "signin", onClose, onSuccess }: Props) {
  const { t, lang } = useI18n();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [anonymousName, setAnonymousName] = useState(generateAnonymousName);
  const [birthDate, setBirthDate] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const maxBirthDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d.toISOString().split("T")[0];
  })();

  // Sync mode with initialMode when opened
  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setErrorMsg("");
      setSuccessMsg("");
      if (!anonymousName) {
        setAnonymousName(generateAnonymousName());
      }
    }
  }, [open, initialMode]);

  // Handle escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const isUnderAge = Boolean(birthDate && calculateAge(birthDate) < 18);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (mode === "signup") {
        const age = calculateAge(birthDate);
        if (!birthDate || age < 18) {
          setErrorMsg(t("auth_age_error"));
          setLoading(false);
          return;
        }

        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
        const anon = anonymousName.trim() || generateAnonymousName();

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              first_name: firstName.trim(),
              last_name: lastName.trim(),
              full_name: fullName,
              anonymous_name: anon,
              birth_date: birthDate,
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
        } else if (data.user) {
          // Attempt to insert/upsert user record in public.profiles table
          try {
            await supabase.from("profiles").upsert(
              {
                id: data.user.id,
                email: data.user.email,
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                full_name: fullName,
                anonymous_name: anon,
                birth_date: birthDate,
                created_at: new Date().toISOString(),
              },
              { onConflict: "id" }
            );
          } catch (profileErr) {
            console.warn("Notice: public.profiles table insert:", profileErr);
          }

          if (data.session) {
            setSuccessMsg(t("auth_success_signin"));
            if (onSuccess) onSuccess();
            setTimeout(() => {
              onClose();
            }, 1200);
          } else {
            setSuccessMsg(t("auth_success_signup"));
            if (onSuccess) onSuccess();
          }
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
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-foreground/40 p-4 py-8 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)] max-h-[90vh] overflow-y-auto"
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
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/80 p-2.5 shadow-sm ring-1 ring-border/60">
                <img
                  src="/logo-icon.png"
                  alt="Sokoun Logo"
                  className="h-full w-full object-contain"
                />
              </div>
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
                  if (!anonymousName) setAnonymousName(generateAnonymousName());
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
                <>
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">
                        {t("auth_firstname")}
                      </label>
                      <div className="relative">
                        <User className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={t("auth_placeholder_firstname")}
                          required
                          className="w-full rounded-2xl border border-border bg-card py-2.5 pe-3 ps-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">
                        {t("auth_lastname")}
                      </label>
                      <div className="relative">
                        <User className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder={t("auth_placeholder_lastname")}
                          required
                          className="w-full rounded-2xl border border-border bg-card py-2.5 pe-3 ps-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reddit-style Anonymous Handle Generator */}
                  <div className="rounded-2xl border border-primary/20 bg-primary-soft/40 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                        <ShieldCheck className="h-4 w-4" />
                        {t("auth_anon_name")}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAnonymousName(generateAnonymousName())}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline hover:opacity-80 transition-opacity"
                        title={t("auth_regen_anon")}
                      >
                        <Shuffle className="h-3 w-3" />
                        <span>{t("auth_regen_anon")}</span>
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={anonymousName}
                        onChange={(e) => setAnonymousName(e.target.value)}
                        className="w-full rounded-xl border border-border/80 bg-card py-2 px-3 text-sm font-semibold text-foreground tracking-wide focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="u/CalmOlive_482"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-tight">
                      {t("auth_anon_desc")}
                    </p>
                  </div>

                  {/* Date of Birth & 18+ Requirement */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-foreground">
                        {t("auth_birthdate")}
                      </label>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {t("auth_age_requirement")}
                      </span>
                    </div>
                    <div className="relative">
                      <Calendar className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="date"
                        value={birthDate}
                        max={maxBirthDate}
                        onChange={(e) => {
                          setBirthDate(e.target.value);
                          if (errorMsg) setErrorMsg("");
                        }}
                        required
                        className={`w-full rounded-2xl border bg-card py-2.5 pe-4 ps-10 text-sm text-foreground focus:outline-none focus:ring-2 ${
                          isUnderAge
                            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                            : "border-border focus:border-primary focus:ring-primary/20"
                        }`}
                      />
                    </div>
                    {isUnderAge && (
                      <p className="text-[11px] text-destructive flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {t("auth_age_error")}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Email */}
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

              {/* Password */}
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
                disabled={loading || (mode === "signup" && isUnderAge)}
                className="w-full rounded-2xl py-5 text-sm font-semibold shadow-md transition-all hover:opacity-95 disabled:opacity-50"
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
                      if (!anonymousName) setAnonymousName(generateAnonymousName());
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

