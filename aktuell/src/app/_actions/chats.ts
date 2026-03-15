"use server";

import { prisma } from "@/lib/db";

export type ChatInfo = {
  id: string;
  type: "group" | "direct";
  subject: string | null;
  groupId: string | null;
  groupName: string | null;
  groupColor: string | null;
  participants: { id: string; name: string; nickname: string | null }[];
  lastMessage: {
    content: string;
    authorName: string;
    createdAt: string;
  } | null;
  messageCount: number;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string; nickname: string | null };
};

export async function loadChats({ userId }: { userId: string }): Promise<ChatInfo[]> {
  const participations = await prisma.chatParticipant.findMany({
    where: { userId },
    select: { chatId: true },
  });

  const chatIds = participations.map((p) => p.chatId);
  if (chatIds.length === 0) return [];

  const chats = await prisma.chat.findMany({
    where: { id: { in: chatIds } },
    include: {
      group: { select: { name: true, color: true } },
      participants: {
        include: { user: { select: { id: true, name: true, nickname: true } } },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: { author: { select: { name: true } } },
      },
      _count: { select: { messages: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return chats.map((c) => ({
    id: c.id,
    type: c.type as "group" | "direct",
    subject: c.subject,
    groupId: c.groupId,
    groupName: c.group?.name ?? null,
    groupColor: c.group?.color ?? null,
    participants: c.participants.map((p) => ({
      id: p.user.id,
      name: p.user.name,
      nickname: p.user.nickname,
    })),
    lastMessage: c.messages[0]
      ? {
          content: c.messages[0].content,
          authorName: c.messages[0].author.name,
          createdAt: c.messages[0].createdAt.toISOString(),
        }
      : null,
    messageCount: c._count.messages,
    createdAt: c.createdAt.toISOString(),
  }));
}

export async function loadChatMessages({ chatId }: { chatId: string }): Promise<ChatMessage[]> {
  const msgs = await prisma.message.findMany({
    where: { chatId },
    include: { author: { select: { id: true, name: true, nickname: true } } },
    orderBy: { createdAt: "asc" },
  });

  return msgs.map((m) => ({
    id: m.id,
    content: m.content,
    createdAt: m.createdAt.toISOString(),
    author: m.author,
  }));
}

export async function sendChatMessage({
  chatId,
  authorId,
  content,
}: {
  chatId: string;
  authorId: string;
  content: string;
}): Promise<ChatMessage> {
  const chat = await prisma.chat.findUnique({ where: { id: chatId } });
  if (!chat) throw new Error("Chat not found");

  const msg = await prisma.message.create({
    data: {
      content,
      authorId,
      groupId: chat.groupId ?? undefined,
      chatId,
    },
    include: { author: { select: { id: true, name: true, nickname: true } } },
  });

  await prisma.chat.update({ where: { id: chatId }, data: { updatedAt: new Date() } });

  return {
    id: msg.id,
    content: msg.content,
    createdAt: msg.createdAt.toISOString(),
    author: msg.author,
  };
}

export async function createChat({
  type,
  subject,
  groupId,
  participantIds,
}: {
  type: "group" | "direct";
  subject?: string;
  groupId?: string;
  participantIds: string[];
}): Promise<ChatInfo> {
  const chat = await prisma.chat.create({
    data: {
      type,
      subject: subject || null,
      groupId: groupId || null,
      participants: {
        create: participantIds.map((uid) => ({ userId: uid })),
      },
    },
    include: {
      group: { select: { name: true, color: true } },
      participants: {
        include: { user: { select: { id: true, name: true, nickname: true } } },
      },
    },
  });

  return {
    id: chat.id,
    type: chat.type as "group" | "direct",
    subject: chat.subject,
    groupId: chat.groupId,
    groupName: chat.group?.name ?? null,
    groupColor: chat.group?.color ?? null,
    participants: chat.participants.map((p) => ({
      id: p.user.id,
      name: p.user.name,
      nickname: p.user.nickname,
    })),
    lastMessage: null,
    messageCount: 0,
    createdAt: chat.createdAt.toISOString(),
  };
}

export async function deleteChat({ chatId }: { chatId: string }): Promise<void> {
  await prisma.chat.delete({ where: { id: chatId } });
}

export async function loadAvailableUsers(): Promise<{ id: string; name: string; nickname: string | null }[]> {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, nickname: true },
    orderBy: { name: "asc" },
  });
  return users;
}
