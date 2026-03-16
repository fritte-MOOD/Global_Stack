"use server";

import { prisma } from "@/lib/db";

export type TaskDetail = {
  id: string;
  title: string;
  description: string | null;
  done: boolean;
  dueAt: string | null;
  createdAt: string;
  groupId: string;
  groupName: string;
  groupColor: string;
  groupPath: string;
  assignee: { id: string; name: string } | null;
  creator: { id: string; name: string };
};

export async function loadTaskDetails(taskId: string): Promise<TaskDetail | null> {
  const t = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      group: {
        select: {
          id: true,
          name: true,
          color: true,
          parent: { select: { name: true, color: true } },
        },
      },
      assignee: { select: { id: true, name: true } },
      creator: { select: { id: true, name: true } },
    },
  });
  if (!t) return null;

  const groupPath = t.group.parent
    ? `${t.group.parent.name} / ${t.group.name}`
    : t.group.name;

  return {
    id: t.id,
    title: t.title,
    description: t.description,
    done: t.done,
    dueAt: t.dueAt?.toISOString() ?? null,
    createdAt: t.createdAt.toISOString(),
    groupId: t.group.id,
    groupName: t.group.name,
    groupColor: t.group.parent?.color ?? t.group.color,
    groupPath,
    assignee: t.assignee,
    creator: t.creator,
  };
}

export async function createTask(data: {
  title: string;
  description?: string;
  dueAt?: string;
  groupId: string;
  assigneeId?: string;
  creatorId: string;
}): Promise<{ success: boolean; taskId?: string; error?: string }> {
  try {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        dueAt: data.dueAt ? new Date(data.dueAt) : null,
        groupId: data.groupId,
        assigneeId: data.assigneeId ?? null,
        creatorId: data.creatorId,
      },
    });
    return { success: true, taskId: task.id };
  } catch {
    return { success: false, error: "Fehler beim Erstellen" };
  }
}

export async function toggleTaskDone(taskId: string): Promise<boolean> {
  const task = await prisma.task.findUnique({ where: { id: taskId }, select: { done: true } });
  if (!task) return false;
  await prisma.task.update({ where: { id: taskId }, data: { done: !task.done } });
  return !task.done;
}

export async function updateTask(
  taskId: string,
  data: { title?: string; description?: string; dueAt?: string | null; assigneeId?: string | null; done?: boolean }
): Promise<{ success: boolean }> {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description || null }),
        ...(data.dueAt !== undefined && { dueAt: data.dueAt ? new Date(data.dueAt) : null }),
        ...(data.assigneeId !== undefined && { assigneeId: data.assigneeId }),
        ...(data.done !== undefined && { done: data.done }),
      },
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}
