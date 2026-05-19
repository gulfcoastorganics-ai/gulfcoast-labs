import { NavLink, Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/labs", label: "Labs" },
  { to: "/contact", label: "Contact" },
];

function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs font-semibold tracking-[0.35em] text-cyan-100">
            GL
          </div>
          <div>
            <div className="text-sm font-semibold tracking-[0.3em] text-white uppercase">GulfCoast Labs</div>
            <div className="text-xs text-slate-400">operator brand</div>
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
                  isActive || location.pathname === item.to
                    ? "bg-white text-slate-950"
                    : "text-slate-300 hover:bg-white/6 hover:text-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
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
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
          <p>GulfCoast Labs builds operational systems for brands, security, AI, and infrastructure.</p>
          <p>Premium, lightweight, and built to ship.</p>
        </div>
      </footer>
    </div>
  );
}
