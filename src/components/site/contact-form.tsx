"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { contactSchema } from "@/lib/contact-schema";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

type Status = "idle" | "sending" | "sent" | "failed";

export function ContactForm({ email }: { email: string }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors = z.flattenError(parsed.error).fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      });
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        setStatus("failed");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div aria-live="polite" className="flex flex-col gap-3 py-6">
        <p className="font-hand text-h3 text-accent-strong">Message sent.</p>
        <p className="text-body text-ink-muted">
          Thanks, you&apos;ll hear from me shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Name"
          name="name"
          autoComplete="name"
          error={errors.name}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          error={errors.email}
          required
        />
      </div>
      <Textarea
        label="Message"
        name="message"
        error={errors.message}
        required
      />
      <div aria-hidden="true" className="absolute top-auto -left-[9999px]">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              <Spinner size={18} label="Sending" className="text-accent-ink" />
              Sending
            </>
          ) : (
            "Send it over"
          )}
        </Button>
        {status === "failed" ? (
          <p aria-live="polite" className="text-danger text-sm">
            That didn&apos;t go through. Try again, or email me at{" "}
            <a
              href={`mailto:${email}`}
              className="underline underline-offset-4"
            >
              {email}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
