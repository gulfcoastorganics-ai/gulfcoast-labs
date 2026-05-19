import { Link, Route, Routes, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import Section from "./components/Section";
import ContactForm from "./components/ContactForm";
import {
  caseStudies,
  featuredCaseStudy,
  deliverables,
  engagementFlow,
  labProjects,
  operationalStack,
  homepageSignals,
  portfolioItems,
  serviceOffers,
  services,
  studioStatus,
  outreachMetrics,
} from "./data";

function Diagram({ title, items }) {
  return (
    <div className="diagram">
      <div className="diagram-title">{title}</div>
      <div className="diagram-grid">
        {items.map((item, index) => (
          <div key={item.layer ?? item.title ?? item} className="diagram-step">
            <div className="diagram-step-kicker">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{item.layer ?? item.step ?? "Step"}</span>
            </div>
            <div className="diagram-step-title">{item.title ?? item.layer ?? item}</div>
            <div className="diagram-step-copy">
              {item.summary
                ? item.summary
                : item.items
                ? item.items.join(" · ")
                : item}
            </div>
            {index < items.length - 1 ? <div className="diagram-arrow">→</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricStrip() {
  return (
    <div className="metric-strip">
      {outreachMetrics.map((metric) => (
        <div key={metric.label} className="metric">
          <div className="metric-value">{metric.value}</div>
          <div className="metric-label">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}

function StatusPanel() {
  return (
    <div className="status-panel">
      <div className="status-chip">{studioStatus.label}</div>
      <div className="status-row">
        <div>
          <p className="status-label">Response time</p>
          <p className="status-value">{studioStatus.responseTime}</p>
        </div>
        <div>
          <p className="status-label">Availability</p>
          <p className="status-value">{studioStatus.availability}</p>
        </div>
      </div>
      <p className="status-copy">{studioStatus.focus}</p>
      <div className="signal-row">
        {homepageSignals.map((signal) => (
          <span key={signal} className="signal-pill">
            {signal}
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 sm:py-20">
      <div className="hero-panel overflow-hidden p-8 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="max-w-4xl">
            <p className="section-eyebrow">GulfCoast Labs</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Operational systems for brands, security, AI, and infrastructure.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Premium, lightweight builds that make the brand feel established, improve inquiry conversion, and support future capital conversations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Start an engagement
              </Link>
              <Link to="/work" className="btn-secondary">
                Review case studies
              </Link>
              <Link to="/services" className="btn-secondary">
                See how we work
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <StatusPanel />
            <article className="featured-case card card-hover">
              <p className="section-eyebrow">{featuredCaseStudy.title}</p>
              <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{featuredCaseStudy.kicker}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{featuredCaseStudy.description}</p>
                </div>
                <Link to={`/work/${featuredCaseStudy.slug}`} className="btn-secondary w-fit">
                  Open featured case study
                </Link>
              </div>
              <div className="mt-6 screenshot-mock">
                <div className="screenshot-mock-inner">
                  <span>featured case study</span>
                  <span>secureops live</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="mt-10">
          <MetricStrip />
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ item }) {
  return (
    <article className="card card-hover">
      <p className="section-eyebrow">{item.label}</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">{item.name}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
      <p className="mt-4 text-sm leading-7 text-slate-400">{item.emphasis}</p>
      <div className="mt-6">
        <Link to={`/work/${item.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
          View case study
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

function EngagementSection() {
  return (
    <Section
      eyebrow="How engagements work"
      title="A tight process that keeps the build moving."
      description="The goal is to stay decisive, keep scope legible, and avoid the drag that makes studio work feel heavy."
    >
      <div className="grid gap-4 md:grid-cols-5">
        {engagementFlow.map((item) => (
          <article key={item.step} className="card card-hover">
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">{item.step}</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.summary}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Home() {
  return (
    <div className="page-shell">
      <Hero />

      <Section eyebrow="Current status" title="Open for outreach and serious builds.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Current availability",
              copy: studioStatus.label,
            },
            {
              title: "Response time",
              copy: studioStatus.responseTime,
            },
            {
              title: "Best fit",
              copy: studioStatus.focus,
            },
          ].map((item) => (
            <article key={item.title} className="card card-hover">
              <p className="section-eyebrow">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Services"
        title="Useful work, not agency theater."
        description="The site leads with practical deliverables for founders, clients, and investors who want credible execution, not decorative claims."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service} className="card card-hover">
              <p className="text-base font-medium text-white">{service}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Selected Work"
        title="Case studies with clear ownership context."
        description="Four case studies are available for direct review, with ZeroChill Co. explicitly labeled as client work for Danny Ford."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {portfolioItems.map((item) => (
            <CaseStudyCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Featured case study" title="SecureOps Live as a proof of presentation quality.">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="card card-hover">
            <p className="section-eyebrow">Why it matters</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Security-oriented presentation with client-ready polish.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The featured case study shows the level of clarity and visual discipline GulfCoast Labs brings to higher-trust work.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={`/work/${featuredCaseStudy.slug}`} className="btn-primary">
                View case study
              </Link>
              <Link to="/contact" className="btn-secondary">
                Discuss a similar build
              </Link>
            </div>
          </div>
          <div className="screenshot-stack">
            {["dashboard hero", "workflow slice", "status panel"].map((label) => (
              <div key={label} className="screenshot-mock screenshot-mock-small">
                <div className="screenshot-mock-inner">
                  <span>{label}</span>
                  <span>placeholder</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Operational stack" title="A simple system diagram for how the studio works.">
        <Diagram title="Studio operating model" items={operationalStack} />
      </Section>

      <EngagementSection />

      <Section eyebrow="CTA" title="Start with a focused conversation.">
        <div className="cta-band">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Best fit</p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              If you need a launch prototype, an operational buildout, or a clean client-facing system, send the brief and I’ll respond with the most practical path.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/services" className="btn-secondary">
              Review services
            </Link>
            <Link to="/contact" className="btn-primary">
              Open the intake form
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

function WorkIndex() {
  return (
    <div className="page-shell">
      <Section
        eyebrow="Work"
        title="Portfolio"
        description="A compact portfolio that gives each project enough context to feel credible and worth contacting about."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {portfolioItems.map((item) => (
            <CaseStudyCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Before / after" title="Why the work reads more established.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card card-hover">
            <p className="section-eyebrow">Before</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <li>Unclear ownership boundaries between client work and owned brands.</li>
              <li>Portfolio surfaces that did not yet show enough proof structure.</li>
              <li>Contact paths that were functional but not conversion-oriented.</li>
            </ul>
          </div>
          <div className="card card-hover">
            <p className="section-eyebrow">After</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <li>Clear brand separation and stronger legitimacy signals.</li>
              <li>Case studies that explain the system, not just the visual output.</li>
              <li>CTA flow that directs serious inquiries toward contact.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Workflow" title="Before, during, and after the build.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Before",
              copy: "The problem is usually a weak story, unclear ownership, or a site that does not signal trust quickly enough.",
            },
            {
              title: "Solution",
              copy: "A tighter system is designed around the offer, proof, delivery process, and contact intent.",
            },
            {
              title: "Result",
              copy: "The site reads more established, converts better, and is easier to hand off and maintain.",
            },
          ].map((item) => (
            <article key={item.title} className="card card-hover">
              <p className="section-eyebrow">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="page-shell">
      <Section eyebrow="Services" title="Builds that look premium and behave like systems.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service} className="card card-hover">
              <p className="text-base font-medium text-white">{service}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Service tiers" title="Clear pricing ranges and fit.">
        <div className="grid gap-4 lg:grid-cols-3">
          {serviceOffers.map((tier) => (
            <article key={tier.name} className="card card-hover">
              <p className="section-eyebrow">{tier.range}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{tier.name}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{tier.bestFit}</p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Timeline</p>
                <p className="mt-2 text-sm text-slate-200">{tier.timeline}</p>
              </div>
              <ul className="mt-5 space-y-2 text-sm leading-7 text-slate-300">
                {tier.deliverables.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="How engagements work" title="A compact process built for momentum.">
        <div className="grid gap-4 md:grid-cols-5">
          {engagementFlow.map((item) => (
            <article key={item.step} className="card card-hover">
              <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">{item.step}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.summary}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Client deliverables" title="What each engagement produces.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card card-hover">
            <p className="section-eyebrow">Deliverables</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {deliverables.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="card card-hover">
            <p className="section-eyebrow">Best fit guidance</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              <li>• Launch Prototype is for speed and clarity.</li>
              <li>• Operational Buildout is for a more complete, premium system.</li>
              <li>• Custom Systems is for scoped, higher-complexity work.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Operational stack" title="Vercel-friendly and lightweight by design.">
        <div className="grid gap-4 md:grid-cols-3">
          {operationalStack.map((item) => (
            <article key={item.layer} className="card card-hover">
              <p className="section-eyebrow">{item.layer}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.items.join(" · ")}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Labs() {
  return (
    <div className="page-shell">
      <Section
        eyebrow="Labs"
        title="Owned brands and internal experiments."
        description="This page separates client work from owned IP while keeping room for prototypes and future expansion."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {[
            ...labProjects,
            {
              name: "Vestra Intel",
              label: "owned brand/project",
              description: "A GulfCoast Labs-owned brand with room for audience growth and capital storytelling.",
            },
            {
              name: "Lifepvth",
              label: "owned brand/project",
              description: "An owned brand that can evolve into a product, media, or service vehicle.",
            },
            {
              name: "DRIFTER_0X7",
              label: "experimental system",
              description: "A good fit for a technical lab entry: compact, sharp, and clearly exploratory.",
            },
          ].map((item) => (
            <article key={item.name} className="card card-hover">
              <p className="section-eyebrow">{item.label}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{item.name}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Contact() {
  return (
    <div className="page-shell">
      <Section
        eyebrow="Contact"
        title="Start with a serious inquiry."
        description="Use the form if you want a build that looks established, converts better, and stays lightweight."
      >
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[
            {
              title: "Inquiry expectations",
              copy: "Send the project type, rough budget, and what the site or system needs to do.",
            },
            {
              title: "Engagement workflow",
              copy: "Discovery, prototype, deploy, harden, then handoff. The sequence stays compact and clear.",
            },
            {
              title: "Response",
              copy: studioStatus.responseTime,
            },
          ].map((item) => (
            <article key={item.title} className="card card-hover">
              <p className="section-eyebrow">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
        <ContactForm />
      </Section>
    </div>
  );
}

function CaseStudyPage() {
  const { slug } = useParams();
  const study = caseStudies[slug];

  if (!study) {
    return (
      <div className="page-shell">
        <Section eyebrow="Work" title="Case study not found." description="The requested project does not exist yet.">
          <Link to="/work" className="btn-secondary">
            Back to work
          </Link>
        </Section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <Section eyebrow={study.ownership} title={study.name} description={study.summary}>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card card-hover">
            <p className="section-eyebrow">Challenge</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{study.challenge}</p>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-cyan-300">Solution</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {study.solution.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="card card-hover">
              <p className="section-eyebrow">Screenshot / placeholder</p>
              <div className="screenshot-mock mt-4">
                <div className="screenshot-mock-inner">
                  <span>{study.heroVisual}</span>
                  <span>placeholder</span>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
                {study.screenshots.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="card card-hover">
              <p className="section-eyebrow">Results</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {study.results.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Challenge / solution / results" title="Clearer case study structure.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card card-hover">
            <p className="section-eyebrow">Challenge</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{study.challenge}</p>
          </div>
          <div className="card card-hover">
            <p className="section-eyebrow">Solution</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {study.solution.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="card card-hover">
            <p className="section-eyebrow">Results</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {study.results.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Tech stack" title="How the system is assembled.">
        <div className="grid gap-4 md:grid-cols-3">
          {study.techStack.map((item, index) => (
            <article key={item.layer} className="card card-hover">
              <div className="diagram-step-kicker">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item.layer}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.items.join(" · ")}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Deployment details" title="How it ships.">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card card-hover">
            <p className="section-eyebrow">Deployment</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
              {study.deployment.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <Diagram title="Engagement flow" items={engagementFlow} />
        </div>
      </Section>

      <Section eyebrow="Client deliverables" title="Concrete outputs from the engagement.">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="card card-hover">
            <ul className="space-y-3 text-sm leading-7 text-slate-300">
              {study.deliverables.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="card card-hover">
            <p className="section-eyebrow">Before / after</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Before</p>
                {study.before.map((item) => (
                  <div key={item}>• {item}</div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">After</p>
                {study.after.map((item) => (
                  <div key={item}>• {item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Next step" title="If this is the right fit, send the brief.">
        <div className="cta-band">
          <div>
            <p className="text-sm text-slate-300">Useful for capital raising, client work, and systems that need to read as established.</p>
          </div>
          <Link to="/contact" className="btn-primary">
            Start an inquiry
          </Link>
        </div>
      </Section>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/work" element={<WorkIndex />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
