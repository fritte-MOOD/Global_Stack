import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const demoUsers = await prisma.user.findMany({
    where: { isDemo: true },
    select: {
      id: true,
      name: true,
      username: true,
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(demoUsers);
}
