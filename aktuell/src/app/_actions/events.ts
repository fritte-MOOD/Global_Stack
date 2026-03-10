"use server";

import { prisma } from "@/lib/db";

export type CalendarEvent = {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string | null;
  groupId: string;
  groupName: string;
  groupColor: string;
};

export async function loadEvents(): Promise<CalendarEvent[]> {
  const events = await prisma.event.findMany({
    include: {
      group: { select: { name: true, color: true } },
    },
    orderBy: { startsAt: "asc" },
  });

  return events.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    startsAt: e.startsAt.toISOString(),
    endsAt: e.endsAt?.toISOString() ?? null,
    groupId: e.groupId,
    groupName: e.group.name,
    groupColor: e.group.color,
  }));
}

export async function createEvent(data: {
  title: string;
  description?: string;
  startsAt: string;
  endsAt?: string;
  groupId: string;
}): Promise<{ success: boolean; error?: string; event?: CalendarEvent }> {
  if (!data.title.trim()) {
    return { success: false, error: "Title is required" };
  }
  if (!data.groupId) {
    return { success: false, error: "Group is required" };
  }

  const group = await prisma.group.findUnique({
    where: { id: data.groupId },
    select: { name: true, color: true },
  });

  if (!group) {
    return { success: false, error: "Group not found" };
  }

  const event = await prisma.event.create({
    data: {
      title: data.title.trim(),
      description: data.description?.trim() || null,
      startsAt: new Date(data.startsAt),
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
      groupId: data.groupId,
    },
  });

  return {
    success: true,
    event: {
      id: event.id,
      title: event.title,
      description: event.description,
      startsAt: event.startsAt.toISOString(),
      endsAt: event.endsAt?.toISOString() ?? null,
      groupId: event.groupId,
      groupName: group.name,
      groupColor: group.color,
    },
  };
}

export async function deleteEvent(eventId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.event.delete({ where: { id: eventId } });
    return { success: true };
  } catch {
    return { success: false, error: "Event not found" };
  }
}
