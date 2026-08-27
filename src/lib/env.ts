import "server-only";
import { z } from "zod";

const schema = z.object({
  AUTH_SECRET: z.string().min(1).optional(),
  AUTH_GITHUB_ID: z.string().min(1).optional(),
  AUTH_GITHUB_SECRET: z.string().min(1).optional(),
  ADMIN_GITHUB_ACCOUNTS: z.string().optional(),
  VERCEL_API_TOKEN: z.string().min(1).optional(),
  VERCEL_PROJECT_ID: z.string().min(1).optional(),
  VERCEL_TEAM_ID: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO_EMAIL: z.email().optional(),
  NEXT_PUBLIC_SITE_URL: z.url().optional(),
});

export type Env = z.infer<typeof schema>;

let parsed: Env | undefined;

function blankToUndefined(value: string | undefined): string | undefined {
  return value === "" ? undefined : value;
}

function readEnv(): Env {
  parsed ??= schema.parse({
    AUTH_SECRET: blankToUndefined(process.env.AUTH_SECRET),
    AUTH_GITHUB_ID: blankToUndefined(process.env.AUTH_GITHUB_ID),
    AUTH_GITHUB_SECRET: blankToUndefined(process.env.AUTH_GITHUB_SECRET),
    ADMIN_GITHUB_ACCOUNTS: blankToUndefined(process.env.ADMIN_GITHUB_ACCOUNTS),
    VERCEL_API_TOKEN: blankToUndefined(process.env.VERCEL_API_TOKEN),
    VERCEL_PROJECT_ID: blankToUndefined(process.env.VERCEL_PROJECT_ID),
    VERCEL_TEAM_ID: blankToUndefined(process.env.VERCEL_TEAM_ID),
    RESEND_API_KEY: blankToUndefined(process.env.RESEND_API_KEY),
    CONTACT_TO_EMAIL: blankToUndefined(process.env.CONTACT_TO_EMAIL),
    NEXT_PUBLIC_SITE_URL: blankToUndefined(process.env.NEXT_PUBLIC_SITE_URL),
  });
  return parsed;
}

export function envOptional<K extends keyof Env>(key: K): Env[K] {
  return readEnv()[key];
}

export function envRequired<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = readEnv()[key];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}
