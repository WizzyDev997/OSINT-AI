"use client";

import { Bot, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EVAL_CRITERIA, ANALYSIS_STEPS, COST_LEVELS } from "@/lib/data";

export function MethodologyTab() {
  return (
    <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>
        Méthodologie d&apos;analyse
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Grille d'évaluation */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e8b931", marginBottom: 12 }}>
            Grille d&apos;évaluation des sources
          </h3>
          {EVAL_CRITERIA.map((c, i) => (
            <div key={i} style={{ padding: "10px 0", borderBottom: i < EVAL_CRITERIA.length - 1 ? "1px solid #1e293b" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 12 }}>{c.criterion}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#e8b931" }}>
                  {c.weight}
                </span>
              </div>
              <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Processus */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e8b931", marginBottom: 12 }}>
            Processus d&apos;analyse (par claim)
          </h3>
          {ANALYSIS_STEPS.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: "8px 0",
                borderBottom: i < ANALYSIS_STEPS.length - 1 ? "1px solid #1e293b" : "none",
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#1e293b",
                  color: "#e8b931",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  flexShrink: 0,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {s.step}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontWeight: 500, color: "#e2e8f0", fontSize: 12 }}>{s.title}</span>
                  <Badge color={s.auto ? "#3b82f6" : "#f59e0b"}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      {s.auto ? <Bot size={10} /> : <User size={10} />}
                      {s.auto ? "Automatisable" : "Contrôle humain"}
                    </span>
                  </Badge>
                </div>
                <p style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Périmètre des coûts */}
        <div className="card" style={{ padding: 20, gridColumn: "1 / -1" }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e8b931", marginBottom: 12 }}>
            Périmètre des coûts — Clé de lecture essentielle
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {COST_LEVELS.map((level) => (
              <div key={level.level}>
                <div
                  style={{
                    fontWeight: 600,
                    color: level.color,
                    fontSize: 12,
                    marginBottom: 8,
                    paddingBottom: 6,
                    borderBottom: `1px solid ${level.color}30`,
                  }}
                >
                  {level.level}
                </div>
                {level.items.map((item, i) => (
                  <div key={i} style={{ fontSize: 11, color: "#94a3b8", padding: "3px 0", display: "flex", gap: 6 }}>
                    <span style={{ color: "#334155" }}>›</span>
                    {item}
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 8,
                    padding: "6px 10px",
                    borderRadius: 4,
                    background: `${level.color}10`,
                    border: `1px solid ${level.color}20`,
                    fontSize: 11,
                    color: level.color,
                    fontWeight: 500,
                  }}
                >
                  → {level.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
