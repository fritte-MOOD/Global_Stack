"use server";

import { prisma } from "@/lib/db";

export type GroupTree = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  visibility: string;
  memberCount: number;
  children: GroupTree[];
};

export type GroupDetail = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  visibility: string;
  createdAt: string;
  parentName: string | null;
  parentColor: string | null;
  memberCount: number;
  eventCount: number;
  taskCount: number;
  documentCount: number;
};

export type MemberInfo = {
  id: string;
  name: string;
  username: string;
  nickname: string | null;
  avatarUrl: string | null;
  description: string | null;
  role: string;
  joinedAt: string;
};

export type MemberProfile = {
  id: string;
  name: string;
  username: string;
  nickname: string | null;
  avatarUrl: string | null;
  description: string | null;
  createdAt: string;
  commonGroups: { id: string; name: string; color: string }[];
  commonEvents: { id: string; title: string; startsAt: string; groupName: string; groupColor: string }[];
  commonChats: { id: string; subject: string | null; type: string; participantCount: number }[];
  commonTasks: { id: string; title: string; done: boolean; dueAt: string | null; groupName: string; groupColor: string }[];
};

export async function loadGroupTree(): Promise<GroupTree[]> {
  const groups = await prisma.group.findMany({
    where: { isTemplate: false, parentId: null },
    include: {
      children: {
        where: { isTemplate: false },
        include: {
          _count: { select: { memberships: true } },
          children: {
            where: { isTemplate: false },
            include: { _count: { select: { memberships: true } } },
          },
        },
        orderBy: { name: "asc" },
      },
      _count: { select: { memberships: true } },
    },
    orderBy: { name: "asc" },
  });

  function mapGroup(g: typeof groups[number]): GroupTree {
    return {
      id: g.id,
      slug: g.slug,
      name: g.name,
      subtitle: g.subtitle,
      color: g.color,
      icon: g.icon,
      visibility: g.visibility,
      memberCount: g._count.memberships,
      children: (g.children ?? []).map((c: any) => mapGroup(c)),
    };
  }

  return groups.map(mapGroup);
}

export async function loadGroupDetail(groupId: string): Promise<GroupDetail | null> {
  const g = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      parent: { select: { name: true, color: true } },
      _count: {
        select: { memberships: true, events: true, tasks: true, documents: true },
      },
    },
  });
  if (!g) return null;

  return {
    id: g.id,
    slug: g.slug,
    name: g.name,
    subtitle: g.subtitle,
    color: g.color,
    icon: g.icon,
    visibility: g.visibility,
    createdAt: g.createdAt.toISOString(),
    parentName: g.parent?.name ?? null,
    parentColor: g.parent?.color ?? null,
    memberCount: g._count.memberships,
    eventCount: g._count.events,
    taskCount: g._count.tasks,
    documentCount: g._count.documents,
  };
}

export type MemberWithGroups = {
  id: string;
  name: string;
  username: string;
  nickname: string | null;
  avatarUrl: string | null;
  description: string | null;
  groups: { id: string; name: string; color: string; role: string }[];
};

export async function loadAllMembers(): Promise<MemberWithGroups[]> {
  const users = await prisma.user.findMany({
    where: { isDemo: false },
    include: {
      memberships: {
        where: { group: { isTemplate: false } },
        include: {
          group: {
            select: { id: true, name: true, color: true, parentId: true, parent: { select: { color: true } } },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  const demoUsers = await prisma.user.findMany({
    where: { isDemo: true },
    include: {
      memberships: {
        where: { group: { isTemplate: false } },
        include: {
          group: {
            select: { id: true, name: true, color: true, parentId: true, parent: { select: { color: true } } },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  const allUsers = [...users, ...demoUsers];

  return allUsers.map((u) => ({
    id: u.id,
    name: u.name,
    username: u.username,
    nickname: u.nickname,
    avatarUrl: u.avatarUrl,
    description: u.description,
    groups: u.memberships.map((m) => ({
      id: m.group.id,
      name: m.group.name,
      color: m.group.parent?.color ?? m.group.color,
      role: m.role,
    })),
  }));
}

export async function loadGroupMembers(groupId: string): Promise<MemberInfo[]> {
  const memberships = await prisma.membership.findMany({
    where: { groupId },
    include: { user: { select: { id: true, name: true, username: true, nickname: true, avatarUrl: true, description: true } } },
    orderBy: { joinedAt: "asc" },
  });

  return memberships.map((m) => ({
    id: m.user.id,
    name: m.user.name,
    username: m.user.username,
    nickname: m.user.nickname,
    avatarUrl: m.user.avatarUrl,
    description: m.user.description,
    role: m.role,
    joinedAt: m.joinedAt.toISOString(),
  }));
}

export async function loadMemberProfile(userId: string, currentUserId: string): Promise<MemberProfile | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true, name: true, username: true, nickname: true,
      avatarUrl: true, description: true, createdAt: true,
    },
  });
  if (!user) return null;

  const [currentMemberships, targetMemberships] = await Promise.all([
    prisma.membership.findMany({ where: { userId: currentUserId }, select: { groupId: true } }),
    prisma.membership.findMany({
      where: { userId },
      include: { group: { select: { id: true, name: true, color: true, parentId: true, parent: { select: { color: true } } } } },
    }),
  ]);

  const currentGroupIds = new Set(currentMemberships.map((m) => m.groupId));
  const commonGroups = targetMemberships
    .filter((m) => currentGroupIds.has(m.groupId))
    .map((m) => ({
      id: m.group.id,
      name: m.group.name,
      color: m.group.parent?.color ?? m.group.color,
    }));

  const commonGroupIds = commonGroups.map((g) => g.id);

  const [events, chats, tasks] = await Promise.all([
    prisma.event.findMany({
      where: { groupId: { in: commonGroupIds } },
      include: { group: { select: { name: true, color: true, parent: { select: { color: true } } } } },
      orderBy: { startsAt: "desc" },
      take: 10,
    }),
    prisma.chatParticipant.findMany({
      where: { userId },
      include: {
        chat: {
          include: {
            participants: { where: { userId: currentUserId } },
            _count: { select: { participants: true } },
          },
        },
      },
    }),
    prisma.task.findMany({
      where: {
        groupId: { in: commonGroupIds },
        OR: [{ assigneeId: userId }, { creatorId: userId }],
      },
      include: { group: { select: { name: true, color: true, parent: { select: { color: true } } } } },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const commonChats = chats
    .filter((cp) => cp.chat.participants.length > 0)
    .map((cp) => ({
      id: cp.chat.id,
      subject: cp.chat.subject,
      type: cp.chat.type,
      participantCount: cp.chat._count.participants,
    }));

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    nickname: user.nickname,
    avatarUrl: user.avatarUrl,
    description: user.description,
    createdAt: user.createdAt.toISOString(),
    commonGroups,
    commonEvents: events.map((e) => ({
      id: e.id,
      title: e.title,
      startsAt: e.startsAt.toISOString(),
      groupName: e.group.name,
      groupColor: e.group.parent?.color ?? e.group.color,
    })),
    commonChats,
    commonTasks: tasks.map((t) => ({
      id: t.id,
      title: t.title,
      done: t.done,
      dueAt: t.dueAt?.toISOString() ?? null,
      groupName: t.group.name,
      groupColor: t.group.parent?.color ?? t.group.color,
    })),
  };
}
