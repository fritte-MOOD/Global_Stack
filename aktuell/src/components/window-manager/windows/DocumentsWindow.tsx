"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FileText, ArrowLeft } from "lucide-react";
import Tag from "../logic/Tag";
import type { WindowContent } from "../logic/WindowManager";
import { loadDemoData, type DemoData } from "@/app/(site)/open-os/_actions/load-demo-data";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";

const SERVER_SLUGS = ["park-club", "marin-quarter", "rochefort"];

function DocumentsContent() {
  const { selectedGroupIds } = useGroupFilter();
  const [data, setData] = useState<DemoData | null>(null);
  const [openDocId, setOpenDocId] = useState<string | null>(null);

  useEffect(() => {
    loadDemoData(SERVER_SLUGS).then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-500">Loading...</span>
      </div>
    );
  }

  const documents = data.documents;
  const filteredDocuments = selectedGroupIds.size > 0 ? documents.filter((d) => selectedGroupIds.has(d.groupId)) : documents;
  const allGroups = data.groups.flatMap((g) => [
    { ...g, depth: 0 },
    ...g.children.map((c) => ({ ...c, depth: 1 as const, parentId: g.id, children: [] as typeof g.children })),
  ]);

  if (filteredDocuments.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-500">No documents.</span>
      </div>
    );
  }

  const openDoc = filteredDocuments.find((d) => d.id === openDocId);

  if (openDoc) {
    const group = allGroups.find((g) => g.id === openDoc.groupId);
    return (
      <div className="flex flex-col h-full p-3">
        <button
          onClick={() => setOpenDocId(null)}
          className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-950 transition-colors mb-2 shrink-0 cursor-pointer"
        >
          <ArrowLeft className="size-3" />
          Back
        </button>
        <div className="flex items-center gap-2 mb-1">
          <FileText className="size-3.5 text-brand-500" />
          <h2 className="text-xs font-semibold text-brand-950">{openDoc.title}</h2>
        </div>
        <div className="flex items-center gap-2 mb-3">
          {group && (
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
              <span className="text-[10px] text-brand-500">{group.name}</span>
            </span>
          )}
          <span className="text-[10px] text-brand-500">by {openDoc.author.name}</span>
        </div>
        <div className="flex-1 overflow-y-auto rounded-lg border border-brand-200 bg-brand-0 p-3">
          <pre className="text-xs text-brand-800 whitespace-pre-wrap font-sans leading-relaxed">{openDoc.content}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-3 space-y-1">
      {filteredDocuments.map((doc) => {
        const group = allGroups.find((g) => g.id === doc.groupId);
        return (
          <button
            key={doc.id}
            onClick={() => setOpenDocId(doc.id)}
            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-brand-50 transition-colors text-left cursor-pointer"
          >
            <FileText className="size-3.5 text-brand-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-brand-950">{doc.title}</div>
              <div className="flex items-center gap-2 mt-0.5">
                {group && (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                    <span className="text-[10px] text-brand-500">{group.name}</span>
                  </span>
                )}
                <span className="text-[10px] text-brand-500">by {doc.author.name}</span>
              </div>
            </div>
            <span className="text-[10px] text-brand-500 shrink-0">
              {new Date(doc.updatedAt).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function DocumentsTooltip() {
  return (
    <div className="p-3 flex flex-col items-center gap-2 text-center">
      <FileText className="size-6 text-brand-700" />
      <span className="text-sm font-medium text-brand-900">Documents</span>
      <span className="text-xs text-brand-600">Click to open documents</span>
    </div>
  );
}

export default function DocumentsWindow({ children }: { children?: ReactNode }) {
  const windowContent: WindowContent = {
    title: "Documents",
    body: <DocumentsContent />,
    width: 460,
    height: 400,
    resizable: true,
  };

  return (
    <Tag
      id="app-documents"
      tooltip={children ? undefined : <DocumentsTooltip />}
      window={windowContent}
      tooltipWidth={200}
      className={children ? "" : "font-semibold underline decoration-brand-300 underline-offset-2 transition-colors text-brand-900"}
      activeClassName={children ? "" : "text-brand-700"}
    >
      {children ?? "Documents"}
    </Tag>
  );
}
