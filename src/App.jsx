import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Section from "./components/Section";
import ContactForm from "./components/ContactForm";
import { labProjects, portfolioItems, processSteps, serviceTiers, services } from "./data";

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="hero-panel overflow-hidden p-8 sm:p-10 lg:p-14">
        <div className="max-w-3xl">
          <p className="section-eyebrow">GulfCoast Labs</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Operational systems for brands, security, AI, and infrastructure.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            We build sharp, premium digital systems that help raise capital, win client work, and ship with control.
            The emphasis is on clarity, fast execution, and a high-trust delivery experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Start a project
            </Link>
            <Link to="/work" className="btn-secondary">
              View work
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {["lean", "technical", "investor-ready"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm uppercase tracking-[0.25em] text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Section
        eyebrow="Services"
        title="The operating system behind the brand."
        description="Useful work, not decorative agency noise. These are the kinds of builds that support a founder, a studio, or an internal operations layer."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service} className="card">
              <p className="text-base font-medium text-white">{service}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Selected Work" title="Portfolio with clear ownership context.">
        <div className="grid gap-4 lg:grid-cols-2">
          {portfolioItems.map((item) => (
            <article key={item.name} className="card">
              <p className="section-eyebrow">{item.label}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Delivery" title="A compact process that keeps momentum high.">
        <div className="grid gap-4 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <div key={step} className="card">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">0{index + 1}</p>
              <p className="mt-3 text-base font-medium text-white">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Contact" title="Built to start conversations.">
        <div className="glass-panel flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-300">For capital, client work, or a scoped build, send a project brief.</p>
          </div>
          <Link to="/contact" className="btn-primary w-fit">
            Open contact form
          </Link>
        </div>
      </Section>
    </>
  );
}

function Work() {
  return (
    <Section
      eyebrow="Work"
      title="Portfolio"
      description="Each item is labeled with the correct ownership context so the site can serve both client acquisition and brand credibility without ambiguity."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {portfolioItems.map((item) => (
          <article key={item.name} className="card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-eyebrow">{item.label}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.name}</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">portfolio</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ServicesPage() {
  return (
    <>
      <Section eyebrow="Services" title="Builds that look premium and behave like systems.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service} className="card">
              <p className="text-base font-medium text-white">{service}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Service Tiers" title="Simple pricing direction.">
        <div className="grid gap-4 lg:grid-cols-3">
          {serviceTiers.map((tier) => (
            <article key={tier.name} className="card">
              <p className="section-eyebrow">{tier.price}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{tier.name}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{tier.summary}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Process" title="Discovery through handoff.">
        <div className="grid gap-4 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <div key={step} className="card">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">0{index + 1}</p>
              <p className="mt-3 text-base font-medium text-white">{step}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function Labs() {
  return (
    <Section
      eyebrow="Labs"
      title="Owned brands and internal experiments."
      description="This page separates brand ownership from client work and gives room for prototypes, technical concepts, and future product surfaces."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {[
          ...labProjects,
          {
            name: "Vestra Intel",
            label: "owned brand/project",
            description: "Included here as an owned system with room for future expansion and audience capture.",
          },
          {
            name: "Lifepvth",
            label: "owned brand/project",
            description: "Another owned project that can mature into a product, media, or service vehicle.",
          },
        ].map((item) => (
          <article key={item.name} className="card">
            <p className="section-eyebrow">{item.label}</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{item.name}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section
      eyebrow="Contact"
      title="Start a conversation."
      description="This form saves locally for now. That keeps the build light while still giving you a practical intake workflow."
    >
      <ContactForm />
    </Section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
