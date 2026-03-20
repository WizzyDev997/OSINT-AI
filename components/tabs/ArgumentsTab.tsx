"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeftRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ARGUMENTS, SOURCES } from "@/lib/data";
import type { ArgType } from "@/lib/types";

type Filter = "all" | ArgType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "pour", label: "Pour (coût ×2)" },
  { value: "contre", label: "Contre" },
  { value: "nuance", label: "Nuances" },
];

const TYPE_MAP: Record<ArgType, { color: string; label: string; border: string }> = {
  pour: { color: "#ef4444", label: "POUR", border: "#ef444440" },
  contre: { color: "#10b981", label: "CONTRE", border: "#10b98140" },
  nuance: { color: "#f59e0b", label: "NUANCE", border: "#f59e0b40" },
};

function FilterIcon({ type }: { type: Filter }) {
  const size = 12;
  if (type === "pour") return <ArrowUp size={size} />;
  if (type === "contre") return <ArrowDown size={size} />;
  if (type === "nuance") return <ArrowLeftRight size={size} />;
  return null;
}

export function ArgumentsTab() {
  const [argFilter, setArgFilter] = useState<Filter>("all");
  const filtered = argFilter === "all" ? ARGUMENTS : ARGUMENTS.filter((a) => a.type === argFilter);

  return (
    <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>Cartographie argumentaire</h2>
        <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn ${argFilter === f.value ? "active" : ""}`}
              onClick={() => setArgFilter(f.value)}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <FilterIcon type={f.value} />
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map((arg, i) => {
          const t = TYPE_MAP[arg.type];
          return (
            <div
              key={arg.id}
              className="card anim-item"
              style={{ padding: "16px 20px", animationDelay: `${i * 60}ms`, borderLeft: `3px solid ${t.border}` }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Badge color={t.color}>{t.label}</Badge>
                <span style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13 }}>{arg.title}</span>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 10, color: "#475569" }}>Force</span>
                  <div className="strength-bar" style={{ width: 60 }}>
                    <div
                      className="strength-fill"
                      style={{ width: `${(arg.strength / 5) * 100}%`, background: t.color }}
                    />
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: t.color }}>
                    {arg.strength}/5
                  </span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 8 }}>{arg.content}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {arg.sources.map((sId) => {
                  const s = SOURCES.find((x) => x.id === sId);
                  return (
                    <span
                      key={sId}
                      title={s?.name}
                      style={{
                        fontSize: 10,
                        padding: "2px 8px",
                        borderRadius: 3,
                        background: "#1e293b",
                        color: "#64748b",
                      }}
                    >
                      {sId} — {s?.name?.split(" – ")[0]?.substring(0, 20)}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
