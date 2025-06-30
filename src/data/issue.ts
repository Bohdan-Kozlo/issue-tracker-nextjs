import { getSession } from "@/lib/auth";
import "server-only";
import { getUserById } from "./user";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getIssues() {
  const session = await getSession();

  if (!session?.userId) {
    return redirect("/login");
  }

  const user = await getUserById(session.userId);
  if (!user) {
    return redirect("/login");
  }

  return await prisma.issue.findMany({
    where: {
      createdBy: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
