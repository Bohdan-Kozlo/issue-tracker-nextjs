import { prisma } from "@/lib/prisma";
import * as argon2 from "argon2";

async function main() {
  await prisma.comment.deleteMany();
  await prisma.issue.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
      password: await argon2.hash("password123"),
    },
  });
  const bob = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob",
      password: await argon2.hash("password123"),
    },
  });

  const issue1 = await prisma.issue.create({
    data: {
      title: "Cannot login",
      description: "Login page throws error 500.",
      priority: "HIGH",
      status: "OPEN",
      createdBy: alice.id,
      labels: "bug,auth",
    },
  });
  const issue2 = await prisma.issue.create({
    data: {
      title: "UI glitch on dashboard",
      description: "Sidebar overlaps content on mobile.",
      priority: "MEDIUM",
      status: "IN_PROGRESS",
      createdBy: bob.id,
      labels: "ui,mobile",
    },
  });

  await prisma.comment.create({
    data: {
      text: "I have the same problem!",
      issueId: issue1.id,
      authorId: bob.id,
    },
  });
  await prisma.comment.create({
    data: {
      text: "Working on a fix.",
      issueId: issue2.id,
      authorId: alice.id,
    },
  });

  console.log("Database seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
