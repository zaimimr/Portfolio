import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Tell me who you are"),
  email: z.email("That email doesn't look right"),
  message: z
    .string()
    .trim()
    .min(10, "Give me a little more to go on")
    .max(5000, "That's a novel, keep it under 5000 characters"),
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
