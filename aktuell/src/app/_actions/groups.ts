"use server";

import { prisma } from "@/lib/db";

export type GroupOption = {
  id: string;
  name: string;
  color: string;
};

export async function loadGroups(): Promise<GroupOption[]> {
  const groups = await prisma.group.findMany({
    where: { isTemplate: false },
    select: { id: true, name: true, color: true },
    orderBy: { name: "asc" },
  });

  return groups;
}
