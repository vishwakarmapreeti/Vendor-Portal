"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { DUMMY_VENDORS, loginWithDummyData } from "@/lib/auth";

const ORANGE = "#F36F21";
const ORANGE_DARK = "#D9560F";

export default function LoginPage() {
  const router = useRouter();
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remember, setRemember] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if(typeof window !== "undefined") {
      const storedVendor = window.localStorage.getItem("dbmsc_vendor");
      if(storedVendor){
        router.replace("/dashboard")
      }
    }
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await loginWithDummyData(email, password);

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("dbmsc_vendor", JSON.stringify(result.vendor));
    }
    router.push("/dashboard");
  }

  function fillDemoCredentials() {
    setEmail(DUMMY_VENDORS[0].email);
    setPassword(DUMMY_VENDORS[0].password);
    setError(null);
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0B0F]">
      {/* ---------------- FULL-SCREEN BACKGROUND VIDEO ---------------- */}
      <video
        src="/videos/dbmsc_video_V4.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Cinematic scrims for legibility + depth */}
      <div className="absolute inset-0 bg-gradient-to-b" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center))]" />

      {/* Brand-orange ambient glow blobs */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full opacity-25 blur-[120px]"
        style={{ background: ORANGE }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full opacity-20 blur-[120px]"
        style={{ background: ORANGE_DARK }}
      />

      {/* Subtle film grain / noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ---------------- CONTENT LAYER ---------------- */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-6 sm:px-10">
          <div
            className="flex items-center gap-2.5 transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-8px)",
            }}
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-extrabold text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DARK} 100%)`,
                boxShadow: `0 8px 24px -6px ${ORANGE}80`,
              }}
            >
              D
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">
              DBMSC
            </span>
          </div>

          <div
            className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-md sm:inline-flex"
          >
            <ShieldCheck size={13} style={{ color: ORANGE }} />
            SAP-Connected Vendor Portal
          </div>
        </header>

        {/* Centered login card */}
        <main className="flex flex-1 items-center justify-end px-10">
          <div
            className="w-full max-w-md mr-60 transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
            }}
          >
            {/* Transparent glassmorphism card */}
            <div
              className="relative overflow-hidden rounded-3xl border border-white/900 bg-white/[0.08] p-8 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-10"
              style={{
                background:
                  "linear-gradient(143deg, #6f6e6e69 0%, rgb(255 255 255 / 3%) 100%);",
              }}
            >
              {/* Top hairline glow on the card */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${ORANGE}cc 50%, transparent 100%)`,
                }}
              />
              {/* Inner orange accent glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
                style={{ background: ORANGE }}
              />

              {/* Heading */}
              <div className="relative">
                <div
                  className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm"
                >
                  <Sparkles size={11} style={{ color: ORANGE }} />
                  Vendor Sign In
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Sign in to your vendor account to continue.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-3.5 py-3 text-sm text-red-200 backdrop-blur-sm">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-semibold text-white/70"
                  >
                    Email address
                  </label>
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-3 backdrop-blur-sm transition-all duration-200 focus-within:border-[#F36F21]/70 focus-within:bg-white/[0.12] focus-within:ring-2 focus-within:ring-[#F36F21]/25">
                    <Mail size={16} className="shrink-0 text-white/45" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold text-white/70"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs font-semibold text-[#F36F21] transition-colors hover:text-[#FF8A47]"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-3 backdrop-blur-sm transition-all duration-200 focus-within:border-[#F36F21]/70 focus-within:bg-white/[0.12] focus-within:ring-2 focus-within:ring-[#F36F21]/25">
                    <Lock size={16} className="shrink-0 text-white/45" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="shrink-0 text-white/45 transition-colors hover:text-white/80"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <label className="flex select-none items-center gap-2 text-xs font-medium text-white/65">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-white/25 bg-white/10 accent-[#F36F21]"
                  />
                  Keep me signed in on this device
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-10px_rgba(243,111,33,0.6)] transition-all duration-200 hover:shadow-[0_20px_50px_-10px_rgba(243,111,33,0.8)] hover:brightness-110 active:scale-[0.99] active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DARK} 100%)`,
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Demo helper */}
              <button
                onClick={fillDemoCredentials}
                type="button"
                className="mt-4 w-full rounded-xl border border-dashed border-[#F36F21]/40 bg-[#F36F21]/[0.08] px-3.5 py-2.5 text-left text-xs text-orange-100 transition-colors hover:bg-[#F36F21]/15"
              >
                <span className="font-semibold text-[#FF9A5C]">Demo mode:</span> click to autofill
                a sample vendor login ({DUMMY_VENDORS[0].email})
              </button>

              <p className="mt-7 text-center text-xs text-white/45">
                New supplier?{" "}
                <a
                  href="#"
                  className="font-semibold text-[#F36F21] transition-colors hover:text-[#FF8A47]"
                >
                  Start vendor onboarding
                </a>
              </p>
            </div>

            {/* Floating caption beneath the card */}
            <p className="mt-6 text-center text-[11px] font-medium uppercase tracking-widest text-white/35">
              Secured by DBMSC &middot; SAP S/4HANA &middot; ISO 27001
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
