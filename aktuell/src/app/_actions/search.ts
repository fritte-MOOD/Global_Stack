"use server";

import { prisma } from "@/lib/db";

export type SearchResult = {
  type: "message" | "event" | "task" | "document" | "process";
  id: string;
  title: string;
  snippet: string;
  groupId: string;
  groupName: string;
  groupColor: string;
  date: string;
};

export async function globalSearch({
  query,
  groupIds,
}: {
  query: string;
  groupIds?: string[];
}): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const q = query.trim().toLowerCase();
  const groupFilter = groupIds && groupIds.length > 0 ? { groupId: { in: groupIds } } : {};

  const [messages, events, tasks, documents, processes] = await Promise.all([
    prisma.message.findMany({
      where: { ...groupFilter, content: { contains: q } },
      include: {
        author: { select: { name: true } },
        group: { select: { name: true, color: true } },
      },
      take: 20,
      orderBy: { createdAt: "desc" },
    }),
    prisma.event.findMany({
      where: {
        ...groupFilter,
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
          { location: { contains: q } },
        ],
      },
      include: { group: { select: { name: true, color: true } } },
      take: 20,
      orderBy: { startsAt: "desc" },
    }),
    prisma.task.findMany({
      where: {
        ...groupFilter,
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
        ],
      },
      include: { group: { select: { name: true, color: true } } },
      take: 20,
      orderBy: { createdAt: "desc" },
    }),
    prisma.document.findMany({
      where: {
        ...groupFilter,
        OR: [
          { title: { contains: q } },
          { content: { contains: q } },
        ],
      },
      include: { group: { select: { name: true, color: true } } },
      take: 20,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.process.findMany({
      where: {
        ...groupFilter,
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
        ],
      },
      include: { group: { select: { name: true, color: true } } },
      take: 20,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const results: SearchResult[] = [];

  for (const m of messages) {
    results.push({
      type: "message",
      id: m.id,
      title: m.author.name,
      snippet: m.content.length > 80 ? m.content.slice(0, 80) + "..." : m.content,
      groupId: m.groupId ?? "",
      groupName: m.group?.name ?? "Direktnachricht",
      groupColor: m.group?.color ?? "#888",
      date: m.createdAt.toISOString(),
    });
  }

  for (const e of events) {
    results.push({
      type: "event",
      id: e.id,
      title: e.title,
      snippet: e.description
        ? e.description.length > 80 ? e.description.slice(0, 80) + "..." : e.description
        : e.location ?? "",
      groupId: e.groupId,
      groupName: e.group.name,
      groupColor: e.group.color,
      date: e.startsAt.toISOString(),
    });
  }

  for (const t of tasks) {
    results.push({
      type: "task",
      id: t.id,
      title: t.title,
      snippet: t.description
        ? t.description.length > 80 ? t.description.slice(0, 80) + "..." : t.description
        : t.done ? "Erledigt" : "Offen",
      groupId: t.groupId,
      groupName: t.group.name,
      groupColor: t.group.color,
      date: t.createdAt.toISOString(),
    });
  }

  for (const d of documents) {
    results.push({
      type: "document",
      id: d.id,
      title: d.title,
      snippet: d.content.length > 80 ? d.content.slice(0, 80) + "..." : d.content,
      groupId: d.groupId,
      groupName: d.group.name,
      groupColor: d.group.color,
      date: d.updatedAt.toISOString(),
    });
  }

  for (const p of processes) {
    results.push({
      type: "process",
      id: p.id,
      title: p.title,
      snippet: p.description
        ? p.description.length > 80 ? p.description.slice(0, 80) + "..." : p.description
        : `Status: ${p.status}`,
      groupId: p.groupId,
      groupName: p.group.name,
      groupColor: p.group.color,
      date: p.createdAt.toISOString(),
    });
  }

  results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return results.slice(0, 50);
}
