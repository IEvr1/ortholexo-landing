import type { VercelRequest, VercelResponse } from "@vercel/node";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

const recentByIp = new Map<string, number[]>();

function clientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0]!.trim();
  }
  return req.socket?.remoteAddress ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    recentByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentByIp.set(ip, recent);
  return false;
}

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  botcheck?: string;
};

function parseBody(req: VercelRequest): ContactBody {
  const raw = req.body;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as ContactBody;
    } catch {
      return {};
    }
  }
  if (raw && typeof raw === "object") {
    return raw as ContactBody;
  }
  return {};
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  if (isRateLimited(clientIp(req))) {
    return res.status(429).json({ error: "too many requests" });
  }

  const body = parseBody(req);

  if (typeof body.botcheck === "string" && body.botcheck.trim()) {
    return res.status(200).json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > MAX_NAME) {
    return res.status(400).json({ error: "invalid name" });
  }
  if (!email || !EMAIL_RE.test(email) || email.length > MAX_EMAIL) {
    return res.status(400).json({ error: "invalid email" });
  }
  if (!message || message.length > MAX_MESSAGE) {
    return res.status(400).json({ error: "invalid message" });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return res.status(503).json({ error: "email service unavailable" });
  }

  const to = process.env.CONTACT_TO?.trim() || "info@nexaipla.com";
  const from = process.env.CONTACT_FROM?.trim() || "onboarding@resend.dev";

  const text = [
    "Νέο μήνυμα από τη φόρμα επικοινωνίας του ortholexo.gr",
    "",
    `Όνομα: ${name}`,
    `Email: ${email}`,
    "",
    "Μήνυμα:",
    message,
    "",
    `Υποβλήθηκε: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Ορθόλεξο] Μήνυμα από ${name}`,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[contact] Resend error", response.status, detail);
      return res.status(502).json({ error: "failed to send email" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return res.status(500).json({ error: "internal error" });
  }
}
