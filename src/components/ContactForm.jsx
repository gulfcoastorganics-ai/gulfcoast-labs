import { useEffect, useState } from "react";

const STORAGE_KEY = "gulfcoast-labs-contact";

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
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      setSaved(null);
    }
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const entry = {
      ...form,
      createdAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
      setSaved(entry);
      setStatus("Saved locally. You can connect this to email or CRM later.");
      setForm(initialState);
    } catch {
      setStatus("Local storage is unavailable in this browser context.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
      <form onSubmit={handleSubmit} className="glass-panel space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="field-label">
            Name
            <input name="name" value={form.name} onChange={updateField} className="field-input" />
          </label>
          <label className="field-label">
            Email
            <input name="email" type="email" value={form.email} onChange={updateField} className="field-input" />
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

        <button type="submit" className="btn-primary">
          Save inquiry locally
        </button>

        {status ? <p className="text-sm text-slate-300">{status}</p> : null}
      </form>

      <aside className="space-y-4">
        <div className="glass-panel p-6">
          <p className="section-eyebrow">What happens next</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            For now, submissions are stored in localStorage only. That keeps the contact flow lightweight until a mail or CRM integration is added.
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
