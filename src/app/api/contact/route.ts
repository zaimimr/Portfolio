import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { envOptional } from "@/lib/env";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

const attempts = new Map<string, number[]>();

function isThrottled(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(ip, recent);
    return true;
  }
  recent.push(now);
  attempts.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const apiKey = envOptional("RESEND_API_KEY");
  const toEmail = envOptional("CONTACT_TO_EMAIL");
  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Contact form is not configured" },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isThrottled(ip)) {
    return NextResponse.json(
      { error: "Too many messages, try again in a bit" },
      { status: 429 },
    );
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "zaim.no contact form <onboarding@resend.dev>",
    to: toEmail,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json(
      { error: "Could not send the message" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
