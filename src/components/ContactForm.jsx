import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "gulfcoast-labs-contact";
const CONTACT_ENDPOINT = "/api/contact";

const initialState = {
  name: "",
  email: "",
  project: "",
  budget: "",
  notes: "",
};

function safeSave(entry) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
    return true;
  } catch {
    return false;
  }
}

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("");
  const [saved, setSaved] = useState(null);
  const [mode, setMode] = useState("checking");

  const payload = useMemo(
    () => ({
      ...form,
      source: "gulfcoast-labs-site",
    }),
    [form],
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      setSaved(null);
    }

    if (typeof window !== "undefined") {
      setMode(window.location.hostname.includes("localhost") || window.location.hostname === "127.0.0.1" ? "local fallback ready" : "api endpoint ready");
    }
  }, []);

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

    const entry = {
      ...payload,
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await submitToApi(entry);
      setStatus(result?.message || "Inquiry sent. Email notification queued.");
      safeSave({ ...entry, transport: "api" });
      setSaved({ ...entry, transport: "api" });
      setForm(initialState);
      setMode("api connected");
      return;
    } catch {
      const stored = safeSave({ ...entry, transport: "localStorage" });
      setSaved({ ...entry, transport: "localStorage" });
      setStatus(
        stored
          ? "Saved locally. API unavailable, so the inquiry is preserved in localStorage."
          : "API unavailable and localStorage could not be used in this browser.",
      );
      setForm(initialState);
      setMode("local fallback active");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
      <form onSubmit={handleSubmit} className="glass-panel space-y-4 p-6">
        <div className="contact-status">
          <span className="contact-status-dot" />
          <span>{mode}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="field-label">
            Name
            <input name="name" value={form.name} onChange={updateField} className="field-input" autoComplete="name" />
          </label>
          <label className="field-label">
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} className="field-input" autoComplete="email" />
          </label>
        </div>

        <label className="field-label">
          Project type
          <input name="project" value={form.project} onChange={updateField} className="field-input" placeholder="Brand site, prototype, dashboard, etc." />
        </label>

        <label className="field-label">
          Budget range
          <input name="budget" value={form.budget} onChange={updateField} className="field-input" placeholder="$1,500+, $5k+, quote-based" />
        </label>

        <label className="field-label">
          Notes
          <textarea name="notes" value={form.notes} onChange={updateField} className="field-input min-h-36" placeholder="What do you need built?" />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn-primary">
            Send inquiry
          </button>
          <span className="text-sm text-slate-400">API first, local fallback second.</span>
        </div>

        {status ? <p className="text-sm leading-7 text-slate-300">{status}</p> : null}
      </form>

      <aside className="space-y-4">
        <div className="glass-panel p-6">
          <p className="section-eyebrow">Contact backend</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            The frontend posts to <span className="text-white">{CONTACT_ENDPOINT}</span>. On Vercel, that endpoint can send email notifications when the environment variables are configured.
          </p>
        </div>

        <div className="glass-panel p-6">
          <p className="section-eyebrow">Latest saved lead</p>
          <pre className="mt-3 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-6 text-slate-300">
            {saved ? JSON.stringify(saved, null, 2) : "No local inquiry saved yet."}
          </pre>
        </div>
      </aside>
    </div>
  );
}
