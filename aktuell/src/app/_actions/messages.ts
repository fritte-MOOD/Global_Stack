"use server";

import { prisma } from "@/lib/db";

export type MessageData = {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string; nickname: string | null };
  groupId: string | null;
};

export async function sendMessage({
  content,
  authorId,
  groupId,
}: {
  content: string;
  authorId: string;
  groupId: string;
}): Promise<MessageData> {
  const msg = await prisma.message.create({
    data: { content, authorId, groupId },
    include: { author: { select: { id: true, name: true, nickname: true } } },
  });

  return {
    id: msg.id,
    content: msg.content,
    createdAt: msg.createdAt.toISOString(),
    author: msg.author,
    groupId: msg.groupId,
  };
}

export async function deleteMessages({
  groupId,
}: {
  groupId: string;
}): Promise<void> {
  await prisma.message.deleteMany({ where: { groupId } });
}
