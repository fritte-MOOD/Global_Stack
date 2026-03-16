"use client";

import { useState } from "react";
import { FileText, ArrowLeft } from "lucide-react";
import type { DemoData, DemoGroup } from "../../../../_actions/load-demo-data";

type Props = {
  data: DemoData;
  groupIds: string[];
  allGroups: (DemoGroup & { depth: number })[];
};

export default function DocumentsApp({ data, groupIds, allGroups }: Props) {
  const documents = data.documents.filter((d) => groupIds.includes(d.groupId));
  const [openDocId, setOpenDocId] = useState<string | null>(null);

  if (documents.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px]">
        <span className="text-xs text-brand-950">No documents in this group.</span>
      </div>
    );
  }

  const openDoc = documents.find((d) => d.id === openDocId);

  if (openDoc) {
    const group = allGroups.find((g) => g.id === openDoc.groupId);
    return (
      <div className="p-4 flex flex-col h-full">
        <button
          onClick={() => setOpenDocId(null)}
          className="flex items-center gap-1 text-xs text-brand-950 hover:text-brand-950 transition-colors mb-3 shrink-0"
        >
          <ArrowLeft className="size-3" />
          Back to documents
        </button>
        <div className="flex items-center gap-2 mb-1">
          <FileText className="size-4 text-brand-950" />
          <h2 className="text-sm font-semibold text-brand-950">{openDoc.title}</h2>
        </div>
        <div className="flex items-center gap-2 mb-4">
          {group && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
              <span className="text-[10px] text-brand-950">{group.name}</span>
            </span>
          )}
          <span className="text-[10px] text-brand-950">by {openDoc.author.name}</span>
        </div>
        <div className="flex-1 overflow-y-auto rounded-lg border border-brand-200 bg-brand-0 p-4">
          <pre className="text-xs text-brand-950 whitespace-pre-wrap font-sans leading-relaxed">{openDoc.content}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-1.5">
      {documents.map((doc) => {
        const group = allGroups.find((g) => g.id === doc.groupId);
        return (
          <button
            key={doc.id}
            onClick={() => setOpenDocId(doc.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-brand-50 transition-colors text-left"
          >
            <FileText className="size-4 text-brand-400 shrink-0" />
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
              {new Date(doc.updatedAt).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit" })}
            </span>
          </button>
        );
      })}
    </div>
  );
}
