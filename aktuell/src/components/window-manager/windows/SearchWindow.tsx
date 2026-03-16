"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, Mail, Calendar, CheckSquare, FileText, MessageSquare, ChevronRight, SquareCheck } from "lucide-react";
import type { WindowContent } from "../logic/WindowManager";
import { globalSearch, type SearchResult } from "@/app/_actions/search";
import { useGroupFilter } from "@/components/desktop/GroupFilterContext";

const TYPE_ICONS: Record<SearchResult["type"], typeof Mail> = {
  message: Mail,
  event: Calendar,
  task: CheckSquare,
  document: FileText,
  process: MessageSquare,
};

const TYPE_LABELS: Record<SearchResult["type"], string> = {
  message: "Message",
  event: "Event",
  task: "Task",
  document: "Document",
  process: "Process",
};

const TYPE_FILTER_OPTIONS: { value: SearchResult["type"]; label: string }[] = [
  { value: "event", label: "Events" },
  { value: "message", label: "Messages" },
  { value: "task", label: "Tasks" },
  { value: "document", label: "Documents" },
  { value: "process", label: "Processes" },
];

type DateRangePreset = "all" | "today" | "week" | "month" | "year";

const DATE_PRESETS: { value: DateRangePreset; label: string }[] = [
  { value: "all", label: "All" },
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
];

function getDateFilterStart(preset: DateRangePreset): Date | undefined {
  if (preset === "all") return undefined;
  const now = new Date();
  if (preset === "today") return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (preset === "week") {
    const d = new Date(now);
    d.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1));
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (preset === "month") return new Date(now.getFullYear(), now.getMonth(), 1);
  if (preset === "year") return new Date(now.getFullYear(), 0, 1);
  return undefined;
}

export function SearchContent({ initialFilter }: { initialFilter?: SearchResult["type"] }) {
  const { selectedGroupIds, allGroups } = useGroupFilter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTypes, setActiveTypes] = useState<Set<SearchResult["type"]>>(
    initialFilter ? new Set([initialFilter]) : new Set()
  );
  const [multiSelect, setMultiSelect] = useState(!initialFilter);
  const [dateRange, setDateRange] = useState<DateRangePreset>("all");
  const [showFilters, setShowFilters] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalGroups = allGroups.length;
  const selectedCount = selectedGroupIds.size;
  const allSelected = selectedCount === 0 || selectedCount === totalGroups;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const groupIds = selectedGroupIds.size > 0 ? Array.from(selectedGroupIds) : undefined;
      const res = await globalSearch({ query: q, groupIds });
      setResults(res);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [selectedGroupIds]);

  const handleChange = (val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 300);
  };

  const toggleType = (type: SearchResult["type"]) => {
    if (multiSelect) {
      setActiveTypes((prev) => {
        const next = new Set(prev);
        if (next.has(type)) next.delete(type);
        else next.add(type);
        return next;
      });
    } else {
      setActiveTypes((prev) => prev.has(type) && prev.size === 1 ? new Set() : new Set([type]));
    }
  };

  const dateFilterStart = getDateFilterStart(dateRange);

  let filtered = results;
  if (activeTypes.size > 0) {
    filtered = filtered.filter((r) => activeTypes.has(r.type));
  }
  if (dateFilterStart) {
    const startMs = dateFilterStart.getTime();
    filtered = filtered.filter((r) => new Date(r.date).getTime() >= startMs);
  }

  const placeholderText = allSelected
    ? "Search all groups..."
    : `Search in ${selectedCount} group${selectedCount !== 1 ? "s" : ""}...`;

  return (
    <div className="flex flex-col h-full">
      {/* Search Input */}
      <div className="px-4 pt-4 pb-3 border-b border-brand-150 shrink-0">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-200 bg-brand-0 focus-within:ring-1 focus-within:ring-brand-200">
          <Search className="size-4 text-brand-950 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholderText}
            className="flex-1 text-sm bg-transparent text-brand-950 outline-none placeholder:text-brand-400"
          />
        </div>

        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 mt-3">
          <div className="flex gap-1.5 flex-1 overflow-x-auto">
            {TYPE_FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleType(opt.value)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeTypes.has(opt.value)
                    ? "bg-brand-950 text-brand-0"
                    : "bg-brand-100 text-brand-950 hover:bg-brand-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {/* Multi-select toggle */}
          <button
            onClick={() => {
              setMultiSelect(!multiSelect);
              if (!multiSelect) {
                // switching to multi-select, keep current
              } else if (activeTypes.size > 1) {
                setActiveTypes(new Set());
              }
            }}
            className={`p-1.5 rounded transition-colors cursor-pointer border ${
              multiSelect
                ? "border-brand-950 bg-brand-950 text-brand-0"
                : "border-brand-200 text-brand-950 hover:bg-brand-100"
            }`}
            title={multiSelect ? "Single select" : "Multi select"}
          >
            <SquareCheck className="size-4" />
          </button>
        </div>

        {/* Collapsible Filters */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 mt-3 text-[11px] font-medium text-brand-950 cursor-pointer hover:opacity-70 transition-opacity"
        >
          <ChevronRight className={`size-3 transition-transform ${showFilters ? "rotate-90" : ""}`} />
          Filter
          {(dateRange !== "all" || !allSelected) && (
            <span className="w-1.5 h-1.5 rounded-full bg-brand-950 ml-0.5" />
          )}
        </button>
        {showFilters && (
          <div className="mt-2 pl-4 space-y-2">
            <div className="text-[11px] font-medium text-brand-950 uppercase tracking-wide">Time range</div>
            <div className="flex gap-1.5 flex-wrap">
              {DATE_PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setDateRange(p.value)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    dateRange === p.value
                      ? "bg-brand-950 text-brand-0"
                      : "bg-brand-100 text-brand-950 hover:bg-brand-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {!allSelected && (
              <div className="flex items-center gap-2 pt-1">
                <div className="flex -space-x-1">
                  {allGroups.filter((g) => selectedGroupIds.has(g.id)).slice(0, 4).map((g) => (
                    <span key={g.id} className="w-3 h-3 rounded-full border border-brand-0 shrink-0" style={{ backgroundColor: g.color }} />
                  ))}
                </div>
                <span className="text-[11px] text-brand-950">
                  {selectedCount} of {totalGroups} groups selected
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <span className="text-sm text-brand-950">Searching...</span>
          </div>
        )}

        {!loading && query && filtered.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <span className="text-sm text-brand-950">No results for &ldquo;{query}&rdquo;</span>
          </div>
        )}

        {!loading && !query && (
          <div className="flex flex-col items-center justify-center py-12 text-brand-950">
            <Search className="size-8 mb-3 opacity-30" />
            <span className="text-sm">{placeholderText.replace("...", "")}</span>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="py-1">
            <div className="px-4 py-1.5 text-[10px] text-brand-950">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              {activeTypes.size > 0 && ` in ${Array.from(activeTypes).map((t) => TYPE_LABELS[t]).join(", ")}`}
            </div>
            {filtered.map((r) => {
              const Icon = TYPE_ICONS[r.type];
              return (
                <div
                  key={`${r.type}-${r.id}`}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-brand-50 transition-colors cursor-default border-b border-brand-50 last:border-b-0"
                >
                  <div className="mt-0.5 shrink-0">
                    <Icon className="size-4 text-brand-950" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-brand-950 truncate">{r.title}</span>
                      <span className="text-[10px] font-medium text-brand-950 bg-brand-100 px-1.5 py-0.5 rounded shrink-0">
                        {TYPE_LABELS[r.type]}
                      </span>
                    </div>
                    <p className="text-xs text-brand-950 truncate">{r.snippet}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: r.groupColor }} />
                      <span className="text-[10px] text-brand-950">{r.groupName}</span>
                      <span className="text-[10px] text-brand-950 opacity-60">
                        {new Date(r.date).toLocaleDateString("en-US")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function searchWindowContent(initialFilter?: SearchResult["type"]): WindowContent {
  return {
    title: "Search",
    body: <SearchContent initialFilter={initialFilter} />,
    width: 480,
    height: 520,
    resizable: true,
  };
}
