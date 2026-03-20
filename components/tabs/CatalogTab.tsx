"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { SOURCE_CATALOG } from "@/lib/data";
import type { AccessKey } from "@/lib/types";

type Filter = "all" | AccessKey;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "gratuit", label: "Gratuites" },
  { value: "payant", label: "Payantes" },
  { value: "mixte", label: "Mixtes" },
];

const PRIO_COLOR: Record<string, string> = { haute: "#10b981", moyenne: "#f59e0b", basse: "#64748b" };
const ACCESS_COLOR: Record<string, string> = { gratuit: "#10b981", payant: "#ef4444", mixte: "#f59e0b" };

export function CatalogTab() {
  const [catalogFilter, setCatalogFilter] = useState<Filter>("all");
  const filtered = catalogFilter === "all" ? SOURCE_CATALOG : SOURCE_CATALOG.filter((s) => s.access === catalogFilter);

  return (
    <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>Catalogue des sources exploitables</h2>
        <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn ${catalogFilter === f.value ? "active" : ""}`}
              onClick={() => setCatalogFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1.5fr 1fr 1fr 0.8fr", gap: 0, fontSize: 12 }}>
        {["Source", "Type", "Accès", "Priorité", "Langue"].map((h) => (
          <div
            key={h}
            style={{
              padding: "8px 12px",
              background: "#1a1f2e",
              color: "#64748b",
              fontWeight: 600,
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              borderBottom: "1px solid #1e293b",
            }}
          >
            {h}
          </div>
        ))}

        {filtered.map((src, i) =>
          (["name", "type", "access", "priority", "lang"] as const).map((field, fi) => (
            <div
              key={`${i}-${fi}`}
              className="anim-item"
              style={{
                padding: "10px 12px",
                borderBottom: "1px solid #1e293b10",
                background: i % 2 === 0 ? "transparent" : "#111827",
                color: "#94a3b8",
                animationDelay: `${i * 30}ms`,
                display: "flex",
                alignItems: "center",
              }}
            >
              {field === "name" ? (
                <div>
                  <div style={{ fontWeight: 500, color: "#e2e8f0" }}>{src.name}</div>
                  <div style={{ fontSize: 10, color: "#475569" }}>{src.url}</div>
                </div>
              ) : field === "access" ? (
                <Badge color={ACCESS_COLOR[src.access]}>{src.access}</Badge>
              ) : field === "priority" ? (
                <Badge color={PRIO_COLOR[src.priority]}>{src.priority}</Badge>
              ) : (
                src[field]
              )}
            </div>
          ))
        )}
      </div>

      <div className="card" style={{ padding: 16, marginTop: 16 }}>
        <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
          <strong style={{ color: "#e8b931" }}>Stratégie prototype :</strong> Privilégier les{" "}
          <strong style={{ color: "#10b981" }}>sources gratuites à haute priorité</strong> (ADEME, CRE, RTE,
          data.gouv.fr, IRENA) pour la v0. Les sources payantes (BNEF, Europresse, Wood Mackenzie) pourront
          être intégrées dans une phase ultérieure si le prototype est validé.
        </p>
      </div>
    </div>
  );
}
