import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { studioStatus } from "../data";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/labs", label: "Labs" },
  { to: "/contact", label: "Contact" },
];

function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs font-semibold tracking-[0.35em] text-cyan-100">
            GL
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-[0.3em] text-white uppercase">GulfCoast Labs</div>
            <div className="text-xs text-slate-400">operator studio</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-full px-4 py-2 text-sm transition",
                  isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="btn-secondary md:hidden"
          onClick={() => setMobileOpen((current) => !current)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div className={`mobile-nav md:hidden ${mobileOpen ? "is-open" : ""}`}>
        <div className="mx-auto grid max-w-7xl gap-2 px-4 pb-4 sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-2xl border px-4 py-3 text-sm transition",
                  isActive ? "border-white/20 bg-white text-slate-950" : "border-white/10 bg-white/5 text-slate-200",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen">
      <div className="noise-bg" />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:px-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:items-start">
          <div>
            <p className="text-white">GulfCoast Labs</p>
            <p className="mt-2 leading-7">Operational systems for brands, security, AI, and infrastructure.</p>
            <p className="mt-3 text-xs uppercase tracking-[0.28em] text-cyan-300">{studioStatus.label}</p>
          </div>
          <div>
            <p className="text-white">Contact</p>
            <a className="mt-2 block leading-7 transition hover:text-white" href="/contact">
              Start an inquiry
            </a>
            <p className="mt-2 leading-7">Typical response within 1 business day.</p>
          </div>
          <div>
            <p className="text-white">GitHub</p>
            <a className="mt-2 block leading-7 transition hover:text-white" href="https://github.com/" target="_blank" rel="noreferrer">
              github.com
            </a>
            <p className="mt-2 leading-7">Deployment status: Vercel-friendly static front end.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
