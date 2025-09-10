import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Bell,
  ClipboardList,
  Droplets,
  Home,
  Languages,
  Shield,
  ChevronDown,
} from "lucide-react";
import { t, setLang, getLang } from "@/lib/i18n";

function Splash() {
  const [textIn, setTextIn] = useState(false);
  const [logoIn, setLogoIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const seen =
      typeof window !== "undefined" && sessionStorage.getItem("splash_seen");
    if (seen) return;
    const t1 = setTimeout(() => setLogoIn(true), 10); // slide-in start
    const t2 = setTimeout(() => setTextIn(true), 10); // fade-in text
    const t3 = setTimeout(() => setFadeOut(true), 3500); // hold ~3.5s before fade
    const t4 = setTimeout(() => {
      if (typeof window !== "undefined")
        sessionStorage.setItem("splash_seen", "1");
    }, 4200); // fade completes ~0.7s later (~4.2s total)
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (typeof window !== "undefined" && sessionStorage.getItem("splash_seen"))
    return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95))",
      }}
      aria-label="App splash screen"
      onClick={() => {
        setFadeOut(true);
        if (typeof window !== "undefined")
          sessionStorage.setItem("splash_seen", "1");
      }}
    >
      {/* Background animated orbs */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-200/30 rounded-full animate-pulse" />
      <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-sky-200/30 rounded-full animate-pulse" />

      {/* Top-left logo badge */}
      <div
        className={`absolute top-4 left-4 w-9 h-9 rounded-full bg-white/70 flex items-center justify-center text-slate-700 backdrop-blur-sm border border-gray-200 shadow-sm transition-all duration-400 ease-in-out ${logoIn ? "translate-x-0 translate-y-0 opacity-100" : "-translate-x-3 -translate-y-3 opacity-0"}`}
      >
        <Shield className="w-5 h-5" />
      </div>

      {/* Center glass panel with title + tagline */}
      <div
        className={`text-center select-none transform transition-all duration-700 ease-in-out ${fadeOut ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
      >
        <div
          className="relative rounded-full bg-transparent border-2 border-white shadow-lg flex items-center justify-center"
          style={{ width: "min(78vw, 300px)", height: "min(78vw, 300px)" }}
        >
          {/* Neon gradient border glow */}

          <div
            className={`relative z-10 mx-auto flex flex-col items-center justify-center px-4 transition-opacity duration-400 ${textIn ? "opacity-100" : "opacity-0"} active:scale-95`}
            style={{ textAlign: "center" }}
          >
            <div
              className="bg-gradient-to-r from-blue-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent font-semibold tracking-wide"
              style={{ fontSize: "36px", lineHeight: 1.1 }}
            >
              SwasthyaSetu
            </div>
            <div
              className={`h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 rounded-full transition-all ${textIn ? "w-full" : "w-0"}`}
              style={{ marginTop: 4 }}
            />
            <div className="text-gray-600 mt-3" style={{ fontSize: "14px" }}>
              Connecting Health & Community
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MobileLayout() {
  const { pathname } = useLocation();
  const [lang, setLangLocal] = useState(getLang());
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-svh flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 to-white">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-slate-900 text-white rounded-b-xl shadow">
        <div className="font-semibold">Community Care</div>
        <div className="relative">
          <button
            className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/10"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Change language"
          >
            <Languages className="w-4 h-4" /> {lang.toUpperCase()}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-36 bg-white text-slate-800 rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
              {["en", "hi", "rg"].map((code) => (
                <button
                  key={code}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 ${lang === code ? "font-semibold" : ""}`}
                  onClick={() => {
                    setLang(code as any);
                    setLangLocal(code as any);
                    setOpen(false);
                  }}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 p-3 pb-[calc(80px+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t rounded-t-xl grid grid-cols-4 gap-1 p-2 pb-[env(safe-area-inset-bottom)] z-50">
        <Tab
          to="/app"
          icon={<Home className="w-5 h-5" />}
          active={pathname === "/app"}
        >
          Home
        </Tab>
        <Tab
          to="/app/report"
          icon={<ClipboardList className="w-5 h-5" />}
          active={pathname.startsWith("/app/report")}
        >
          {t("healthReport")}
        </Tab>
        <Tab
          to="/app/water"
          icon={<Droplets className="w-5 h-5" />}
          active={pathname.startsWith("/app/water")}
        >
          {t("waterTest")}
        </Tab>
        <Tab
          to="/app/notifications"
          icon={<Bell className="w-5 h-5" />}
          active={pathname.startsWith("/app/notifications")}
        >
          {t("notifications")}
        </Tab>
      </nav>
    </div>
  );
}

function Tab({
  to,
  icon,
  children,
  active,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center rounded-md px-2 py-1 text-xs ${active ? "text-blue-600 bg-blue-50" : "text-slate-700"}`}
    >
      {icon}
      <span className="mt-1">{children}</span>
    </Link>
  );
}
