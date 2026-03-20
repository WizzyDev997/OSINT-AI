"use client";

import { FileText, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { VerdictBadge } from "@/components/ui/VerdictBadge";
import { CLAIM, SOURCES, ARGUMENTS, LCOE_DATA } from "@/lib/data";

const MAX_VAL = 240;

export function ClaimTab() {
  const avgCredibility = (SOURCES.reduce((a, s) => a + s.credibility, 0) / SOURCES.length).toFixed(1);

  return (
    <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
      {/* Claim card */}
      <div className="card" style={{ padding: 28, marginBottom: 20, borderLeft: "3px solid #e8b931" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span className="mono-tag">{CLAIM.id}</span>
          <Badge color="#6366f1">{CLAIM.category}</Badge>
          <span style={{ fontSize: 12, color: "#475569", marginLeft: "auto" }}>
            Analysé le {CLAIM.dateAnalyzed}
          </span>
        </div>
        <blockquote className="claim-quote">« {CLAIM.text} »</blockquote>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span className="label-caps">Verdict</span>
              <VerdictBadge verdict={CLAIM.verdict} />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: "#94a3b8" }}>{CLAIM.verdictDetail}</p>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Sources analysées", value: SOURCES.length, accent: "#3b82f6" },
          { label: "Arguments identifiés", value: ARGUMENTS.length, accent: "#8b5cf6" },
          { label: "Sources gratuites", value: `${SOURCES.filter((s) => s.access === "gratuit").length}/${SOURCES.length}`, accent: "#10b981" },
          { label: "Score confiance moyen", value: `${avgCredibility}/5`, accent: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} className="card anim-item" style={{ padding: "16px 18px", animationDelay: `${i * 80}ms` }}>
            <div className="label-caps" style={{ marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: s.accent, fontFamily: "'JetBrains Mono', monospace" }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* LCOE Comparison */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <TrendingUp size={14} color="#94a3b8" />
          <h3 className="label-caps">Comparaison LCOE — Données croisées (€/MWh)</h3>
        </div>
        {LCOE_DATA.map((item, i) => {
          const leftPct = (item.low / MAX_VAL) * 100;
          const widthPct = ((item.high - item.low) / MAX_VAL) * 100;
          const midPct = (item.mid / MAX_VAL) * 100;
          return (
            <div key={i} className="anim-item" style={{ marginBottom: 14, animationDelay: `${i * 60}ms` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#c8d0df" }}>{item.label}</span>
                <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#64748b" }}>
                  {item.low}–{item.high} €/MWh • {item.src}
                </span>
              </div>
              <div style={{ position: "relative", height: 18, background: "#1a1f2e", borderRadius: 3 }}>
                <div
                  style={{
                    position: "absolute",
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    height: "100%",
                    background: `${item.color}30`,
                    borderRadius: 3,
                    border: `1px solid ${item.color}50`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: `${midPct}%`,
                    top: 0,
                    width: 2,
                    height: "100%",
                    background: item.color,
                    borderRadius: 1,
                  }}
                />
                {[0, 50, 100, 150, 200].map((v) => (
                  <div
                    key={v}
                    style={{
                      position: "absolute",
                      left: `${(v / MAX_VAL) * 100}%`,
                      bottom: -14,
                      fontSize: 9,
                      color: "#334155",
                      fontFamily: "'JetBrains Mono', monospace",
                      transform: "translateX(-50%)",
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div style={{ height: 14 }} />
        <p style={{ fontSize: 11, color: "#475569", fontStyle: "italic", marginTop: 8 }}>
          Barres = fourchette basse–haute. Trait = valeur médiane/moyenne. Les comparaisons directes LCOE
          ne reflètent pas les coûts système (réseau, stockage, flexibilité).
        </p>
      </div>
    </div>
  );
}
