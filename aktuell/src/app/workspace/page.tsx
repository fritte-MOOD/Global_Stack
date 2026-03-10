/**
 * workspace/page.tsx — Einstiegsseite der persistenten App.
 *
 * Zeigt die Server/Gruppen des Users und bietet Template-Import an.
 * Später: Redirect zu Login wenn nicht angemeldet.
 */

import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, Plus, LayoutTemplate } from "lucide-react";
import { cloneTemplate } from "./_actions/clone-template";

export default async function WorkspacePage() {
  const servers = await prisma.group.findMany({
    where: { parentId: null, isTemplate: false },
    include: {
      children: true,
      memberships: true,
      _count: { select: { messages: true, events: true, tasks: true, processes: true } },
    },
    orderBy: { name: "asc" },
  });

  const templates = await prisma.group.findMany({
    where: { isTemplate: true, parentId: null },
    include: { children: { where: { isTemplate: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="shrink-0 h-14 border-b border-brand-200 flex items-center justify-between px-6">
        <h1 className="font-heading text-xl font-semibold text-brand-900">
          OpenOS Workspace
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm text-brand-700 hover:text-brand-900 transition-colors"
          >
            Back to Site
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Servers / Communities */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-semibold text-brand-900">
                Your Communities
              </h2>
              <button className="flex items-center gap-1.5 text-sm text-brand-700 hover:text-brand-900 transition-colors">
                <Plus className="size-4" />
                New Community
              </button>
            </div>

            {servers.length === 0 ? (
              <div className="rounded-xl border border-brand-200 bg-brand-50 p-8 text-center">
                <p className="text-brand-950 mb-4">
                  You don&apos;t have any communities yet. Start from a template or create one from scratch.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {servers.map((server) => (
                  <Link
                    key={server.id}
                    href={`/workspace/${server.slug}`}
                    className="group rounded-xl border border-brand-200 bg-brand-50 p-5 hover:border-brand-800 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white text-lg font-bold"
                        style={{ backgroundColor: server.color }}
                      >
                        {server.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-brand-950 truncate">
                          {server.name}
                        </h3>
                        <p className="text-xs text-brand-700 mt-0.5">
                          {server.subtitle}
                        </p>
                      </div>
                      <ArrowRight className="size-4 text-brand-700 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                    </div>

                    <div className="mt-3 flex items-center gap-3 text-xs text-brand-700">
                      <span>{server.children.length} groups</span>
                      <span>{server.memberships.length} members</span>
                      <span>{server._count.processes} processes</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Templates */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <LayoutTemplate className="size-5 text-brand-700" />
              <h2 className="font-heading text-lg font-semibold text-brand-900">
                Templates
              </h2>
            </div>
            <p className="text-sm text-brand-700 mb-4">
              Start with a pre-built community structure. All data will be copied into your workspace.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="rounded-xl border border-brand-200 bg-brand-50 p-5 flex flex-col"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white text-lg font-bold"
                      style={{ backgroundColor: tpl.color }}
                    >
                      {tpl.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-950">{tpl.name}</h3>
                      <p className="text-xs text-brand-700 mt-0.5">
                        {tpl.children.length} subgroups included
                      </p>
                    </div>
                  </div>

                  {tpl.templateDescription && (
                    <p className="text-sm text-brand-950 mt-3 leading-relaxed flex-1">
                      {tpl.templateDescription}
                    </p>
                  )}

                  <form action={cloneTemplate.bind(null, tpl.id)} className="mt-4">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 h-10 rounded-md text-sm font-medium border border-brand-800 bg-brand-0 text-brand-900 hover:shadow-md transition-all"
                    >
                      Use Template
                      <ArrowRight className="size-3.5" />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
