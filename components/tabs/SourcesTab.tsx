"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { PositionBadge } from "@/components/ui/PositionBadge";
import { SOURCES, ARGUMENTS } from "@/lib/data";
import type { PositionKey } from "@/lib/types";

type Filter = "all" | PositionKey;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "neutre", label: "Neutres" },
  { value: "pro_nucleaire", label: "Pro-nucléaire" },
  { value: "pro_renouvelable", label: "Pro-EnR" },
];

export function SourcesTab() {
  const [filterPosition, setFilterPosition] = useState<Filter>("all");
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const filtered = filterPosition === "all" ? SOURCES : SOURCES.filter((s) => s.position === filterPosition);

  return (
    <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>Sources mobilisées</h2>
        <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn ${filterPosition === f.value ? "active" : ""}`}
              onClick={() => setFilterPosition(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map((src, i) => {
          const isOpen = selectedSource === src.id;
          const usedIn = ARGUMENTS.filter((a) => a.sources.includes(src.id)).map((a) => a.id);
          const avgScore = ((src.credibility + src.independence + src.methodology) / 3).toFixed(1);

          return (
            <div
              key={src.id}
              className="card anim-item"
              style={{
                padding: "16px 20px",
                cursor: "pointer",
                animationDelay: `${i * 50}ms`,
                borderLeft: isOpen ? "3px solid #e8b931" : "3px solid transparent",
              }}
              onClick={() => setSelectedSource(isOpen ? null : src.id)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span className="mono-tag">{src.id}</span>
                <span style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13 }}>{src.name}</span>
                <Badge color="#475569">{src.type}</Badge>
                <PositionBadge position={src.position} />
                <span style={{ marginLeft: "auto", fontSize: 11, color: "#475569" }}>{src.date}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <p style={{ flex: 1, fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{src.keyData}</p>
                <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
                  {[
                    { label: "Crédibilité", value: src.credibility },
                    { label: "Indépendance", value: src.independence },
                    { label: "Méthodo", value: src.methodology },
                  ].map((m) => (
                    <div key={m.label} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "#475569", marginBottom: 3 }}>{m.label}</div>
                      <StarRating value={m.value} />
                    </div>
                  ))}
                </div>
                <Badge color={src.access === "gratuit" ? "#10b981" : "#ef4444"}>{src.access}</Badge>
              </div>

              {isOpen && (
                <div
                  style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: "1px solid #1e293b",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    fontSize: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <ExternalLink size={11} color="#3b82f6" />
                    <span style={{ color: "#64748b" }}>URL : </span>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#3b82f6", textDecoration: "none" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {src.url}
                    </a>
                  </div>
                  <div>
                    <span style={{ color: "#64748b" }}>Utilisée dans : </span>
                    <span style={{ color: "#94a3b8" }}>{usedIn.join(", ") || "—"}</span>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <span style={{ color: "#64748b" }}>Score agrégé : </span>
                    <span style={{ color: "#e8b931", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                      {avgScore}/5
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
