/**
 * clone-template.ts — Server Action: kopiert ein Template in den User-Space.
 *
 * Deep Copy: Gruppe + Untergruppen + alle Content-Modelle
 * (Messages, Events, Tasks, Documents, Processes).
 */

"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function cloneTemplate(templateId: string) {
  const template = await prisma.group.findUnique({
    where: { id: templateId, isTemplate: true },
    include: {
      children: {
        where: { isTemplate: true },
        include: {
          events: true,
          tasks: true,
          documents: true,
          processes: true,
          messages: true,
        },
      },
      events: true,
      tasks: true,
      documents: true,
      processes: true,
      messages: true,
    },
  });

  if (!template) throw new Error("Template not found");

  const suffix = Date.now().toString(36);
  const newSlug = `${template.slug.replace("template-", "")}-${suffix}`;

  let systemUser = await prisma.user.findFirst({ where: { username: "system" } });
  if (!systemUser) {
    systemUser = await prisma.user.create({
      data: { username: "system", name: "System", email: "system@local" },
    });
  }

  const newGroup = await prisma.group.create({
    data: {
      slug: newSlug,
      name: template.name,
      subtitle: template.subtitle,
      color: template.color,
      icon: template.icon,
      isTemplate: false,
    },
  });

  await copyGroupContent(template, newGroup.id, systemUser.id);

  for (const child of template.children) {
    const childSlug = `${newSlug}-${child.slug.replace(/^tpl-\w+-/, "")}`;

    const newChild = await prisma.group.create({
      data: {
        slug: childSlug,
        name: child.name,
        subtitle: child.subtitle,
        color: child.color,
        icon: child.icon,
        parentId: newGroup.id,
        visibility: child.visibility,
        isTemplate: false,
      },
    });

    await copyGroupContent(child, newChild.id, systemUser.id);
  }

  await prisma.membership.create({
    data: { userId: systemUser.id, groupId: newGroup.id, role: "admin" },
  });

  redirect(`/workspace/${newSlug}`);
}

type GroupWithContent = {
  events: Array<{ title: string; description: string | null; startsAt: Date; endsAt: Date | null }>;
  tasks: Array<{ title: string; description: string | null; done: boolean; dueAt: Date | null; creatorId: string; assigneeId: string | null }>;
  documents: Array<{ title: string; content: string }>;
  processes: Array<{ title: string; description: string | null; status: string }>;
  messages: Array<{ content: string }>;
};

async function copyGroupContent(
  source: GroupWithContent,
  targetGroupId: string,
  userId: string,
) {
  if (source.events.length > 0) {
    await prisma.event.createMany({
      data: source.events.map((e) => ({
        title: e.title,
        description: e.description,
        startsAt: e.startsAt,
        endsAt: e.endsAt,
        groupId: targetGroupId,
        creatorId: userId,
      })),
    });
  }

  if (source.tasks.length > 0) {
    await prisma.task.createMany({
      data: source.tasks.map((t) => ({
        title: t.title,
        description: t.description,
        done: false,
        dueAt: t.dueAt,
        groupId: targetGroupId,
        creatorId: userId,
      })),
    });
  }

  if (source.documents.length > 0) {
    await prisma.document.createMany({
      data: source.documents.map((d) => ({
        title: d.title,
        content: d.content,
        groupId: targetGroupId,
        authorId: userId,
      })),
    });
  }

  if (source.processes.length > 0) {
    await prisma.process.createMany({
      data: source.processes.map((p) => ({
        title: p.title,
        description: p.description,
        status: "draft",
        groupId: targetGroupId,
        authorId: userId,
      })),
    });
  }

  if (source.messages.length > 0) {
    await prisma.message.createMany({
      data: source.messages.map((m) => ({
        content: m.content,
        groupId: targetGroupId,
        authorId: userId,
      })),
    });
  }
}
