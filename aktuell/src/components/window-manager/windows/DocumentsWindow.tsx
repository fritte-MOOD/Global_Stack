"use client";

import { useEffect, useState, type ReactNode } from "react";
import { FileText, ArrowLeft, Search } from "lucide-react";
import Tag from "../logic/Tag";
import { useWindowManager, type WindowContent } from "../logic/WindowManager";
import { loadDemoData, type DemoData } from "@/app/(site)/open-os/_actions/load-demo-data";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";
import { searchWindowContent } from "./SearchWindow";

const SERVER_SLUGS = ["park-club", "marin-quarter", "rochefort"];

export function DocumentsContent() {
  const { selectedGroupIds } = useGroupFilter();
  const { openNewInstance } = useWindowManager();
  const [data, setData] = useState<DemoData | null>(null);
  const [openDocId, setOpenDocId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadDemoData(SERVER_SLUGS).then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-950">Loading...</span>
      </div>
    );
  }

  const documents = data.documents;
  const groupFiltered = documents.filter((d) => selectedGroupIds.has(d.groupId));
  const allGroups = data.groups.flatMap((g) => [
    { ...g, depth: 0 },
    ...g.children.map((c) => ({ ...c, depth: 1 as const, parentId: g.id, children: [] as typeof g.children })),
  ]);

  const q = searchQuery.toLowerCase();
  const filteredDocuments = q
    ? groupFiltered.filter((d) =>
        d.title.toLowerCase().includes(q) ||
        d.content.toLowerCase().includes(q) ||
        d.author.name.toLowerCase().includes(q)
      )
    : groupFiltered;

  if (groupFiltered.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <span className="text-xs text-brand-950">No documents.</span>
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
          className="flex items-center gap-1 text-xs text-brand-950 hover:text-brand-950 transition-colors mb-2 shrink-0 cursor-pointer"
        >
          <ArrowLeft className="size-3" />
          Back
        </button>
        <div className="flex items-center gap-2 mb-1">
          <FileText className="size-3.5 text-brand-950" />
          <h2 className="text-xs font-semibold text-brand-950">{openDoc.title}</h2>
        </div>
        <div className="flex items-center gap-2 mb-3">
          {group && (
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
              <span className="text-[10px] text-brand-950">{group.name}</span>
            </span>
          )}
          <span className="text-[10px] text-brand-950">by {openDoc.author.name}</span>
        </div>
        <div className="flex-1 overflow-y-auto rounded-lg border border-brand-200 bg-brand-0 p-3">
          <pre className="text-xs text-brand-950 whitespace-pre-wrap font-sans leading-relaxed">{openDoc.content}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search bar */}
      <div className="px-3 pt-3 pb-2 border-b border-brand-100 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-brand-200 bg-brand-0 flex-1">
            <Search className="size-3.5 text-brand-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Dokumente durchsuchen..."
              className="flex-1 text-xs bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
            />
          </div>
          <button
            onClick={() => openNewInstance("search", searchWindowContent("document"))}
            className="p-1.5 rounded-md hover:bg-brand-100 transition-colors cursor-pointer shrink-0"
            title="Globale Suche (Dokumente)"
          >
            <Search className="size-3.5 text-brand-950" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1 min-h-0">
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
                      <span className="text-[10px] text-brand-950">{group.name}</span>
                    </span>
                  )}
                  <span className="text-[10px] text-brand-950">by {doc.author.name}</span>
                </div>
              </div>
              <span className="text-[10px] text-brand-950 shrink-0">
                {new Date(doc.updatedAt).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DocumentsTooltip() {
  return (
    <div className="p-3 flex flex-col items-center gap-2 text-center">
      <FileText className="size-6 text-brand-950" />
      <span className="text-sm font-medium text-brand-950">Documents</span>
      <span className="text-xs text-brand-950">Click to open documents</span>
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
      className={children ? "" : "font-semibold underline decoration-brand-200 underline-offset-2 transition-colors text-brand-950"}
      activeClassName={children ? "" : "text-brand-950"}
    >
      {children ?? "Documents"}
    </Tag>
  );
}
