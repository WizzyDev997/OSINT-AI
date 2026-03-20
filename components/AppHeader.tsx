"use client";

import { Sigma, Activity } from "lucide-react";

export type TabId = "claim" | "sources" | "args" | "system" | "catalog" | "method";

const TABS: { id: TabId; label: string; Icon: React.ComponentType<{ size: number }> }[] = [
  { id: "claim", label: "Affirmation", Icon: ({ size }) => <span style={{ fontSize: size, lineHeight: 1 }}>◈</span> },
  { id: "sources", label: "Sources", Icon: ({ size }) => <span style={{ fontSize: size, lineHeight: 1 }}>⊞</span> },
  { id: "args", label: "Arguments", Icon: ({ size }) => <span style={{ fontSize: size, lineHeight: 1 }}>⇌</span> },
  { id: "system", label: "Architecture", Icon: ({ size }) => <span style={{ fontSize: size, lineHeight: 1 }}>◰</span> },
  { id: "catalog", label: "Catalogue sources", Icon: ({ size }) => <span style={{ fontSize: size, lineHeight: 1 }}>▤</span> },
  { id: "method", label: "Méthodologie", Icon: ({ size }) => <span style={{ fontSize: size, lineHeight: 1 }}>◇</span> },
];

interface AppHeaderProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export function AppHeader({ activeTab, onTabChange }: AppHeaderProps) {
  return (
    <header
      style={{
        padding: "20px 28px 0",
        borderBottom: "1px solid #1e293b",
        background: "linear-gradient(180deg, #0f1520 0%, #0a0e17 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 6,
            background: "linear-gradient(135deg, #e8b931, #b8860b)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0a0e17",
          }}
        >
          <Sigma size={20} strokeWidth={2.5} />
        </div>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", letterSpacing: -0.5 }}>
            ENERGY CLAIMS ANALYZER
          </h1>
          <p style={{ fontSize: 11, color: "#475569", letterSpacing: 1.2, textTransform: "uppercase", marginTop: 1 }}>
            Prototype OSINT/IA — Vérification &amp; Cartographie argumentaire
          </p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 12px",
              borderRadius: 4,
              background: "#10b98118",
              border: "1px solid #10b98130",
              color: "#10b981",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            <Activity size={12} style={{ animation: "pulse 2s infinite" }} />
            PROTOTYPE v0.1
          </span>
        </div>
      </div>

      <nav style={{ display: "flex", gap: 0, marginTop: 12, overflowX: "auto" }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
            onClick={() => onTabChange(t.id)}
          >
            <t.Icon size={15} />
            {t.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
