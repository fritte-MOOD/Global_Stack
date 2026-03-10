"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import type { DesktopGroup, DesktopUser } from "@/components/desktop";

export type UserData = {
  user: DesktopUser | null;
  groups: DesktopGroup[];
};

export async function loadUserData(): Promise<UserData> {
  const user = await getCurrentUser();
  if (!user) return { user: null, groups: [] };

  const memberships = await prisma.membership.findMany({
    where: { userId: user.id },
    include: {
      group: {
        include: {
          children: {
            where: { isTemplate: false },
            orderBy: { name: "asc" },
          },
        },
      },
    },
  });

  const topLevelGroups = memberships
    .map((m) => m.group)
    .filter((g) => g.parentId === null && !g.isTemplate);

  return {
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      isDemo: user.isDemo,
    },
    groups: topLevelGroups.map((g) => ({
      id: g.id,
      slug: g.slug,
      name: g.name,
      subtitle: g.subtitle,
      color: g.color,
      icon: g.icon,
      parentId: g.parentId,
      children: g.children.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        subtitle: c.subtitle,
        color: c.color,
        icon: c.icon,
      })),
    })),
  };
}
