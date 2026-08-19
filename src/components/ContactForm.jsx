import { useMemo, useState } from "react";

const CONTACT_ENDPOINT = "/api/contact";

const initialState = {
  name: "",
  email: "",
  project: "",
  budget: "",
  notes: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("");
  const [lastSubmission, setLastSubmission] = useState(null);
  const [mode, setMode] = useState("api endpoint ready");
  const [submitting, setSubmitting] = useState(false);

  const payload = useMemo(
    () => ({
      ...form,
      source: "gulfcoast-labs-site",
    }),
    [form],
  );

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitToApi(entry) {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result?.error || "Contact endpoint unavailable");
    }

    return result;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    const entry = {
      ...payload,
      createdAt: new Date().toISOString(),
    };

    setSubmitting(true);
    setStatus("Sending inquiry…");
    setMode("sending");

    try {
      const result = await submitToApi(entry);
      const submitted = { ...entry, transport: "api" };
      setLastSubmission(submitted);
      setStatus(result?.message || "Inquiry sent. Email notification queued.");
      setForm(initialState);
      setMode("api connected");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Contact endpoint unavailable";
      setLastSubmission({ ...entry, transport: "failed" });
      setStatus(`Inquiry was not sent: ${message}. Your form is still filled in so you can retry.`);
      setMode("api unavailable");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
      <form onSubmit={handleSubmit} className="glass-panel space-y-4 p-6">
        <div className="contact-status" aria-live="polite">
          <span className="contact-status-dot" />
          <span>{mode}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="field-label">
            Name
            <input name="name" value={form.name} onChange={updateField} className="field-input" autoComplete="name" required />
          </label>
          <label className="field-label">
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} className="field-input" autoComplete="email" required />
          </label>
        </div>

        <label className="field-label">
          Project type
          <input name="project" value={form.project} onChange={updateField} className="field-input" placeholder="Brand site, prototype, dashboard, etc." required />
        </label>

        <label className="field-label">
          Budget range
          <input name="budget" value={form.budget} onChange={updateField} className="field-input" placeholder="$1,500+, $5k+, quote-based" />
        </label>

        <label className="field-label">
          Notes
          <textarea name="notes" value={form.notes} onChange={updateField} className="field-input min-h-36" placeholder="What do you need built?" required />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary" disabled={submitting} aria-disabled={submitting}>
            {submitting ? "Sending…" : "Send inquiry"}
          </button>
          <span className="text-sm text-slate-400">Sent directly through the site contact API.</span>
        </div>

        {status ? <p className="text-sm leading-7 text-slate-300" aria-live="polite">{status}</p> : null}
      </form>

      <aside className="space-y-4">
        <div className="glass-panel p-6">
          <p className="section-eyebrow">Contact backend</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            The frontend posts to <span className="text-white">{CONTACT_ENDPOINT}</span>. On Vercel, that endpoint sends email notifications when the required environment variables are configured.
          </p>
        </div>

        <div className="glass-panel p-6">
          <p className="section-eyebrow">This session</p>
          <pre className="mt-3 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-6 text-slate-300">
            {lastSubmission ? JSON.stringify(lastSubmission, null, 2) : "No submission attempted this session."}
          </pre>
        </div>
      </aside>
    </div>
  );
}
