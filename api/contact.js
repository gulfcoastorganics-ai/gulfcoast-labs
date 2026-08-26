const CONTACT_TO = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = {
  name: 120,
  email: 254,
  project: 160,
  budget: 120,
  notes: 4000,
};
const RESEND_TIMEOUT_MS = 12000;

function clean(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

function exceedsLimit(value, max) {
  return String(value ?? "").length > max;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const contentLength = Number(req.headers?.["content-length"] || 0);
  if (contentLength > 12000) {
    return res.status(413).json({ ok: false, error: "Submission is too large" });
  }

  const payload = req.body && typeof req.body === "object" ? req.body : {};
  for (const [field, max] of Object.entries(LIMITS)) {
    if (exceedsLimit(payload[field], max)) {
      return res.status(400).json({ ok: false, error: `${field} is too long` });
    }
  }

  const name = clean(payload.name, LIMITS.name);
  const email = clean(payload.email, LIMITS.email);
  const project = clean(payload.project, LIMITS.project);
  const budget = clean(payload.budget, LIMITS.budget);
  const notes = clean(payload.notes, LIMITS.notes);

  if (!name || !email || !project) {
    return res.status(400).json({
      ok: false,
      error: "Missing required fields",
    });
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({
      ok: false,
      error: "Enter a valid email address",
    });
  }

  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    return res.status(503).json({
      ok: false,
      error: "Email backend not configured",
      status: "config_missing",
      message: "Contact endpoint is reachable, but email notifications are not configured yet.",
    });
  }

  const subject = `GulfCoast Labs inquiry: ${project}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${project}`,
    `Budget: ${budget || "not provided"}`,
    "",
    notes || "No notes provided.",
  ].join("\n");

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    project: escapeHtml(project),
    budget: escapeHtml(budget || "not provided"),
    notes: escapeHtml(notes || "No notes provided.").replaceAll("\n", "<br>"),
  };

  const controller = typeof AbortController === "function" ? new AbortController() : null;
  const timeout = controller ? setTimeout(() => controller.abort(), RESEND_TIMEOUT_MS) : null;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        reply_to: email,
        subject,
        text,
        html: `
          <div style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; line-height: 1.6">
            <h2>GulfCoast Labs inquiry</h2>
            <p><strong>Name:</strong> ${safe.name}</p>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Project type:</strong> ${safe.project}</p>
            <p><strong>Budget:</strong> ${safe.budget}</p>
            <p><strong>Notes:</strong></p>
            <p>${safe.notes}</p>
          </div>
        `,
      }),
      signal: controller?.signal,
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(502).json({
        ok: false,
        error: result?.message || result?.error || "Email delivery failed",
        status: "delivery_failed",
      });
    }

    return res.status(200).json({
      ok: true,
      status: "sent",
      message: "Inquiry sent and email notification queued.",
    });
  } catch (error) {
    const timedOut = error?.name === "AbortError";
    return res.status(502).json({
      ok: false,
      error: timedOut ? "Email delivery timed out" : "Email delivery failed",
      status: timedOut ? "delivery_timeout" : "delivery_failed",
    });
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export { clean, escapeHtml };
