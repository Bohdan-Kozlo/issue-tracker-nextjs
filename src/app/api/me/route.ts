import { getCurrentUser } from "@/lib/server-actions/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ user: null });
  }
  return Response.json({ user });
}
