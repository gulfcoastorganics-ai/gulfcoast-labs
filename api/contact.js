const CONTACT_TO = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const payload = req.body ?? {};
  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const project = String(payload.project || "").trim();
  const budget = String(payload.budget || "").trim();
  const notes = String(payload.notes || "").trim();

  if (!name || !email || !project) {
    return res.status(400).json({
      ok: false,
      error: "Missing required fields",
    });
  }

  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    return res.status(501).json({
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
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project type:</strong> ${project}</p>
          <p><strong>Budget:</strong> ${budget || "not provided"}</p>
          <p><strong>Notes:</strong></p>
          <p>${notes || "No notes provided."}</p>
        </div>
      `,
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    return res.status(502).json({
      ok: false,
      error: result?.error || "Email delivery failed",
      status: "delivery_failed",
    });
  }

  return res.status(200).json({
    ok: true,
    status: "sent",
    message: "Inquiry sent and email notification queued.",
  });
}
