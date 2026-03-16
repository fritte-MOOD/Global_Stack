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

export type GroupWithMembers = {
  id: string;
  name: string;
  color: string;
  depth: number;
  parentId: string | null;
  members: { id: string; name: string }[];
};

export async function loadGroupsWithMembers(): Promise<GroupWithMembers[]> {
  const groups = await prisma.group.findMany({
    where: { isTemplate: false },
    select: {
      id: true,
      name: true,
      color: true,
      parentId: true,
      parent: { select: { color: true } },
      memberships: {
        include: { user: { select: { id: true, name: true } } },
      },
    },
    orderBy: { name: "asc" },
  });

  return groups.map((g) => ({
    id: g.id,
    name: g.name,
    color: g.parent?.color ?? g.color,
    depth: g.parentId ? 1 : 0,
    parentId: g.parentId,
    members: g.memberships.map((m) => ({ id: m.user.id, name: m.user.name })),
  }));
}
