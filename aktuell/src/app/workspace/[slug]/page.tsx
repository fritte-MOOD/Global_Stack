/**
 * workspace/[slug]/page.tsx — Einzelne Community/Server-Ansicht.
 *
 * Zeigt den Server mit seinen Untergruppen und Inhalten.
 * Daten kommen aus der Datenbank.
 */

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, EyeOff, Users, MessageSquare, Calendar, CheckSquare, FileText, Scale } from "lucide-react";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const group = await prisma.group.findUnique({
    where: { slug },
    include: {
      children: {
        orderBy: { name: "asc" },
        include: {
          _count: { select: { memberships: true, messages: true } },
        },
      },
      memberships: { include: { user: true } },
      messages: { orderBy: { createdAt: "desc" }, take: 5, include: { author: true } },
      events: { orderBy: { startsAt: "asc" }, take: 5 },
      tasks: { where: { done: false }, orderBy: { createdAt: "desc" }, take: 5 },
      processes: { orderBy: { createdAt: "desc" }, take: 5 },
      documents: { orderBy: { updatedAt: "desc" }, take: 5 },
    },
  });

  if (!group) notFound();

  const visibilityIcon = (v: string) => {
    if (v === "private") return <Lock className="size-3 text-brand-950" />;
    if (v === "hidden") return <EyeOff className="size-3 text-brand-950" />;
    return null;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="shrink-0 h-14 border-b border-brand-200 flex items-center gap-4 px-6">
        <Link href="/workspace" className="text-brand-950 hover:text-brand-950 transition-colors cursor-pointer">
          <ArrowLeft className="size-5" />
        </Link>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: group.color }}
        >
          {group.name[0]}
        </div>
        <div>
          <h1 className="font-heading text-lg font-semibold text-brand-950">{group.name}</h1>
          <p className="text-xs text-brand-950">{group.subtitle}</p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-8">

          {/* Subgroups */}
          {group.children.length > 0 && (
            <section>
              <h2 className="font-heading text-base font-semibold text-brand-950 mb-3 flex items-center gap-2">
                <Users className="size-4" />
                Groups
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.children.map((child) => (
                  <div
                    key={child.id}
                    className="rounded-lg border border-brand-200 bg-brand-50 p-4 flex items-start gap-3"
                  >
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: child.color }}
                    >
                      {child.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-sm text-brand-950 truncate">{child.name}</span>
                        {visibilityIcon(child.visibility)}
                      </div>
                      <p className="text-xs text-brand-950">{child.subtitle}</p>
                      <p className="text-xs text-brand-950 mt-1">
                        {child._count.memberships} members &middot; {child._count.messages} messages
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recent Activity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Messages */}
            <section className="rounded-xl border border-brand-200 bg-brand-50 p-5">
              <h3 className="font-heading text-sm font-semibold text-brand-950 mb-3 flex items-center gap-2">
                <MessageSquare className="size-4" />
                Recent Messages
              </h3>
              {group.messages.length === 0 ? (
                <p className="text-xs text-brand-950">No messages yet.</p>
              ) : (
                <ul className="space-y-2">
                  {group.messages.map((msg) => (
                    <li key={msg.id} className="text-sm">
                      <span className="font-medium text-brand-950">{msg.author.name}:</span>{" "}
                      <span className="text-brand-950">{msg.content}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Events */}
            <section className="rounded-xl border border-brand-200 bg-brand-50 p-5">
              <h3 className="font-heading text-sm font-semibold text-brand-950 mb-3 flex items-center gap-2">
                <Calendar className="size-4" />
                Upcoming Events
              </h3>
              {group.events.length === 0 ? (
                <p className="text-xs text-brand-950">No events scheduled.</p>
              ) : (
                <ul className="space-y-2">
                  {group.events.map((evt) => (
                    <li key={evt.id} className="text-sm">
                      <span className="font-medium text-brand-950">{evt.title}</span>
                      <span className="text-xs text-brand-950 ml-2">
                        {evt.startsAt.toLocaleDateString("de-DE")}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Tasks */}
            <section className="rounded-xl border border-brand-200 bg-brand-50 p-5">
              <h3 className="font-heading text-sm font-semibold text-brand-950 mb-3 flex items-center gap-2">
                <CheckSquare className="size-4" />
                Open Tasks
              </h3>
              {group.tasks.length === 0 ? (
                <p className="text-xs text-brand-950">All done.</p>
              ) : (
                <ul className="space-y-2">
                  {group.tasks.map((task) => (
                    <li key={task.id} className="text-sm text-brand-950">
                      {task.title}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Processes */}
            <section className="rounded-xl border border-brand-200 bg-brand-50 p-5">
              <h3 className="font-heading text-sm font-semibold text-brand-950 mb-3 flex items-center gap-2">
                <Scale className="size-4" />
                Processes
              </h3>
              {group.processes.length === 0 ? (
                <p className="text-xs text-brand-950">No processes yet.</p>
              ) : (
                <ul className="space-y-2">
                  {group.processes.map((proc) => (
                    <li key={proc.id} className="text-sm flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        proc.status === "active" ? "bg-green-100 text-green-700" :
                        proc.status === "draft" ? "bg-yellow-100 text-yellow-700" :
                        proc.status === "completed" ? "bg-blue-100 text-blue-700" :
                        "bg-brand-100 text-brand-950"
                      }`}>
                        {proc.status}
                      </span>
                      <span className="text-brand-950">{proc.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Documents */}
            <section className="rounded-xl border border-brand-200 bg-brand-50 p-5 md:col-span-2">
              <h3 className="font-heading text-sm font-semibold text-brand-950 mb-3 flex items-center gap-2">
                <FileText className="size-4" />
                Documents
              </h3>
              {group.documents.length === 0 ? (
                <p className="text-xs text-brand-950">No documents yet.</p>
              ) : (
                <ul className="space-y-2">
                  {group.documents.map((doc) => (
                    <li key={doc.id} className="text-sm text-brand-950">
                      {doc.title}
                    </li>
                  ))}
                </ul>
              )}
            </section>

          </div>

          {/* Members */}
          <section>
            <h2 className="font-heading text-base font-semibold text-brand-950 mb-3">
              Members ({group.memberships.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {group.memberships.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 pl-1 pr-3 py-1"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-[10px] font-bold text-brand-950">
                    {m.user.name[0]}
                  </div>
                  <span className="text-sm text-brand-950">{m.user.name}</span>
                  <span className="text-[10px] text-brand-950">{m.role}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
