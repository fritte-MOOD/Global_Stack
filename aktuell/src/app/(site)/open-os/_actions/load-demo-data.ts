"use server";

import { prisma } from "@/lib/db";

export type DemoMessage = {
  id: string;
  content: string;
  createdAt: string;
  author: { name: string; nickname: string | null };
  groupId: string | null;
};

export type DemoEvent = {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string | null;
  groupId: string;
};

export type DemoTask = {
  id: string;
  title: string;
  description: string | null;
  done: boolean;
  dueAt: string | null;
  groupId: string;
  assignee: { id: string; name: string } | null;
  creator: { id: string; name: string };
};

export type DemoDocument = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  groupId: string;
  author: { name: string };
};

export type DemoProcess = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  groupId: string;
  author: { name: string };
};

export type DemoGroup = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  parentId: string | null;
  children: { id: string; slug: string; name: string; subtitle: string; color: string; icon: string }[];
};

export type DemoUser = {
  id: string;
  name: string;
  username: string;
};

export type DemoData = {
  groups: DemoGroup[];
  messages: DemoMessage[];
  events: DemoEvent[];
  tasks: DemoTask[];
  documents: DemoDocument[];
  processes: DemoProcess[];
  user: DemoUser | null;
};

export async function loadDemoData(serverSlugs: string[]): Promise<DemoData> {
  const demoUser = await prisma.user.findFirst({
    where: { isDemo: true },
    select: { id: true, name: true, username: true },
  });

  const servers = await prisma.group.findMany({
    where: { slug: { in: serverSlugs }, isTemplate: false, parentId: null },
    include: { children: { where: { isTemplate: false }, orderBy: { name: "asc" } } },
    orderBy: { name: "asc" },
  });

  const allGroupIds = servers.flatMap((s) => [s.id, ...s.children.map((c) => c.id)]);

  const [messages, events, tasks, documents, processes] = await Promise.all([
    prisma.message.findMany({
      where: { groupId: { in: allGroupIds } },
      include: { author: { select: { name: true, nickname: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.event.findMany({
      where: { groupId: { in: allGroupIds } },
      orderBy: { startsAt: "asc" },
    }),
    prisma.task.findMany({
      where: { groupId: { in: allGroupIds } },
      include: {
        assignee: { select: { id: true, name: true } },
        creator: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.document.findMany({
      where: { groupId: { in: allGroupIds } },
      include: { author: { select: { name: true } } },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.process.findMany({
      where: { groupId: { in: allGroupIds } },
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    groups: servers.map((s) => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      subtitle: s.subtitle,
      color: s.color,
      icon: s.icon,
      parentId: s.parentId,
      children: s.children.map((c) => ({
        id: c.id, slug: c.slug, name: c.name, subtitle: c.subtitle, color: c.color, icon: c.icon,
      })),
    })),
    messages: messages.map((m) => ({
      ...m, createdAt: m.createdAt.toISOString(),
    })),
    events: events.map((e) => ({
      ...e, startsAt: e.startsAt.toISOString(), endsAt: e.endsAt?.toISOString() ?? null,
    })),
    tasks: tasks.map((t) => ({
      ...t, dueAt: t.dueAt?.toISOString() ?? null,
    })),
    documents: documents.map((d) => ({
      ...d, updatedAt: d.updatedAt.toISOString(),
    })),
    processes: processes.map((p) => ({
      id: p.id, title: p.title, description: p.description, status: p.status,
      groupId: p.groupId, author: p.author,
    })),
    user: demoUser ? { id: demoUser.id, name: demoUser.name, username: demoUser.username } : null,
  };
}
