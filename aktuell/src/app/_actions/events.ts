"use server";

import { prisma } from "@/lib/db";

export type EventInvitee = {
  id: string;
  userId: string;
  userName: string;
  status: "pending" | "accepted" | "declined" | "maybe";
};

export type EventComment = {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorName: string;
  reactions: { emoji: string; count: number; userReacted: boolean }[];
  replies: EventComment[];
};

export type CalendarEvent = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  startsAt: string;
  endsAt: string | null;
  createdAt: string;
  groupId: string;
  groupName: string;
  groupColor: string;
  groupPath: string;
  creatorId: string;
  creatorName: string;
  invitees?: EventInvitee[];
  comments?: EventComment[];
};

export async function loadEvents(): Promise<CalendarEvent[]> {
  const events = await prisma.event.findMany({
    include: {
      group: {
        select: {
          name: true,
          color: true,
          parentId: true,
          parent: { select: { name: true } },
        },
      },
      creator: { select: { name: true } },
    },
    orderBy: { startsAt: "asc" },
  });

  return events.map((e) => {
    const groupPath = e.group.parent
      ? `${e.group.parent.name}/${e.group.name}`
      : e.group.name;

    return {
      id: e.id,
      title: e.title,
      description: e.description,
      location: e.location,
      startsAt: e.startsAt.toISOString(),
      endsAt: e.endsAt?.toISOString() ?? null,
      createdAt: e.createdAt.toISOString(),
      groupId: e.groupId,
      groupName: e.group.name,
      groupColor: e.group.color,
      groupPath,
      creatorId: e.creatorId,
      creatorName: e.creator.name,
    };
  });
}

export async function loadEventDetails(eventId: string): Promise<CalendarEvent | null> {
  const e = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      group: {
        select: {
          name: true,
          color: true,
          parentId: true,
          parent: { select: { name: true } },
        },
      },
      creator: { select: { name: true } },
      invitations: {
        include: { user: { select: { name: true } } },
      },
      comments: {
        where: { parentId: null },
        include: {
          author: { select: { name: true } },
          reactions: true,
          replies: {
            include: {
              author: { select: { name: true } },
              reactions: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!e) return null;

  const groupPath = e.group.parent
    ? `${e.group.parent.name}/${e.group.name}`
    : e.group.name;

  const mapComment = (c: typeof e.comments[0]): EventComment => {
    const reactionMap = new Map<string, { count: number; userReacted: boolean }>();
    for (const r of c.reactions) {
      const existing = reactionMap.get(r.emoji) ?? { count: 0, userReacted: false };
      existing.count++;
      reactionMap.set(r.emoji, existing);
    }
    return {
      id: c.id,
      content: c.content,
      createdAt: c.createdAt.toISOString(),
      authorId: c.authorId,
      authorName: c.author.name,
      reactions: Array.from(reactionMap.entries()).map(([emoji, data]) => ({ emoji, ...data })),
      replies: "replies" in c ? (c.replies as typeof e.comments).map(mapComment) : [],
    };
  };

  return {
    id: e.id,
    title: e.title,
    description: e.description,
    location: e.location,
    startsAt: e.startsAt.toISOString(),
    endsAt: e.endsAt?.toISOString() ?? null,
    createdAt: e.createdAt.toISOString(),
    groupId: e.groupId,
    groupName: e.group.name,
    groupColor: e.group.color,
    groupPath,
    creatorId: e.creatorId,
    creatorName: e.creator.name,
    invitees: e.invitations.map((inv) => ({
      id: inv.id,
      userId: inv.userId,
      userName: inv.user.name,
      status: inv.status as "pending" | "accepted" | "declined" | "maybe",
    })),
    comments: e.comments.map(mapComment),
  };
}

export async function createEvent(data: {
  title: string;
  description?: string;
  location?: string;
  startsAt: string;
  endsAt?: string;
  groupId: string;
  creatorId?: string;
}): Promise<{ success: boolean; error?: string; event?: CalendarEvent }> {
  if (!data.title.trim()) {
    return { success: false, error: "Title is required" };
  }
  if (!data.groupId) {
    return { success: false, error: "Group is required" };
  }

  const group = await prisma.group.findUnique({
    where: { id: data.groupId },
    select: {
      name: true,
      color: true,
      parentId: true,
      parent: { select: { name: true } },
    },
  });

  if (!group) {
    return { success: false, error: "Group not found" };
  }

  // For now, use the first demo user as creator if not specified
  let creatorId = data.creatorId;
  if (!creatorId) {
    const demoUser = await prisma.user.findFirst({ where: { isDemo: true } });
    creatorId = demoUser?.id;
  }
  if (!creatorId) {
    return { success: false, error: "No creator found" };
  }

  const creator = await prisma.user.findUnique({
    where: { id: creatorId },
    select: { name: true },
  });

  const event = await prisma.event.create({
    data: {
      title: data.title.trim(),
      description: data.description?.trim() || null,
      location: data.location?.trim() || null,
      startsAt: new Date(data.startsAt),
      endsAt: data.endsAt ? new Date(data.endsAt) : null,
      groupId: data.groupId,
      creatorId,
    },
  });

  const groupPath = group.parent
    ? `${group.parent.name}/${group.name}`
    : group.name;

  return {
    success: true,
    event: {
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      startsAt: event.startsAt.toISOString(),
      endsAt: event.endsAt?.toISOString() ?? null,
      createdAt: event.createdAt.toISOString(),
      groupId: event.groupId,
      groupName: group.name,
      groupColor: group.color,
      groupPath,
      creatorId: event.creatorId,
      creatorName: creator?.name ?? "Unknown",
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

// ─── RSVP Actions ────────────────────────────────────────────────

export async function updateRSVP(data: {
  eventId: string;
  userId: string;
  status: "accepted" | "declined" | "maybe";
}): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.eventInvitation.upsert({
      where: {
        eventId_userId: { eventId: data.eventId, userId: data.userId },
      },
      update: { status: data.status },
      create: {
        eventId: data.eventId,
        userId: data.userId,
        status: data.status,
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update RSVP" };
  }
}

export async function removeRSVP(data: {
  eventId: string;
  userId: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.eventInvitation.delete({
      where: {
        eventId_userId: { eventId: data.eventId, userId: data.userId },
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to remove RSVP" };
  }
}

// ─── Comment Actions ─────────────────────────────────────────────

export async function addComment(data: {
  eventId: string;
  authorId: string;
  content: string;
  parentId?: string;
}): Promise<{ success: boolean; error?: string; comment?: EventComment }> {
  if (!data.content.trim()) {
    return { success: false, error: "Comment cannot be empty" };
  }
  try {
    const comment = await prisma.comment.create({
      data: {
        content: data.content.trim(),
        authorId: data.authorId,
        eventId: data.eventId,
        parentId: data.parentId || null,
      },
      include: {
        author: { select: { name: true } },
      },
    });
    return {
      success: true,
      comment: {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
        authorId: comment.authorId,
        authorName: comment.author.name,
        reactions: [],
        replies: [],
      },
    };
  } catch {
    return { success: false, error: "Failed to add comment" };
  }
}

export async function deleteComment(commentId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.comment.delete({ where: { id: commentId } });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete comment" };
  }
}

// ─── Reaction Actions ────────────────────────────────────────────

export async function toggleReaction(data: {
  commentId: string;
  userId: string;
  emoji: string;
}): Promise<{ success: boolean; added: boolean; error?: string }> {
  try {
    const existing = await prisma.reaction.findUnique({
      where: {
        commentId_userId_emoji: {
          commentId: data.commentId,
          userId: data.userId,
          emoji: data.emoji,
        },
      },
    });

    if (existing) {
      await prisma.reaction.delete({ where: { id: existing.id } });
      return { success: true, added: false };
    } else {
      await prisma.reaction.create({
        data: {
          commentId: data.commentId,
          userId: data.userId,
          emoji: data.emoji,
        },
      });
      return { success: true, added: true };
    }
  } catch {
    return { success: false, added: false, error: "Failed to toggle reaction" };
  }
}
