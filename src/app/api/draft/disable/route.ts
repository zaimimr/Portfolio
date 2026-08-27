import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=%2Fadmin%2Fcontent");
  }
  const draft = await draftMode();
  draft.disable();
  redirect("/admin/content");
}
