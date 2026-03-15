import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const INACTIVE_DAYS = 30;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - INACTIVE_DAYS);

  // Find non-demo users whose last session expired more than 30 days ago
  const inactiveUsers = await prisma.user.findMany({
    where: {
      isDemo: false,
      sessions: {
        every: {
          expiresAt: { lt: cutoff },
        },
      },
    },
    select: { id: true, username: true },
  });

  if (inactiveUsers.length === 0) {
    return NextResponse.json({ deleted: 0 });
  }

  const ids = inactiveUsers.map((u) => u.id);

  // Cascade deletes handle related data (memberships, messages, etc.)
  await prisma.user.deleteMany({
    where: { id: { in: ids } },
  });

  // Clean up expired sessions
  await prisma.session.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });

  return NextResponse.json({
    deleted: inactiveUsers.length,
    users: inactiveUsers.map((u) => u.username),
  });
}
