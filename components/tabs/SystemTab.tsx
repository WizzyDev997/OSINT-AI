"use client";

import { Radio, Layers, Microscope, BarChart2, ArrowRight, Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SYSTEM_DESIGN, TECH_STACK } from "@/lib/data";

const LAYER_ICONS: Record<string, React.ReactNode> = {
  collect: <Radio size={16} />,
  structure: <Layers size={16} />,
  analyze: <Microscope size={16} />,
  output: <BarChart2 size={16} />,
};

export function SystemTab() {
  return (
    <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>
        Architecture technique du prototype
      </h2>

      {/* Pipeline */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {SYSTEM_DESIGN.layers.map((layer, li) => (
          <div key={layer.name} className="card anim-item" style={{ padding: 0, overflow: "hidden", animationDelay: `${li * 100}ms` }}>
            <div
              style={{
                padding: "12px 16px",
                background: "#1a1f2e",
                borderBottom: "1px solid #1e293b",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ color: "#e8b931" }}>{LAYER_ICONS[layer.icon]}</span>
              <span style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13 }}>{layer.name}</span>
              {li < 3 && (
                <span style={{ marginLeft: "auto", color: "#334155" }}>
                  <ArrowRight size={14} />
                </span>
              )}
            </div>
            <div style={{ padding: 12 }}>
              {layer.components.map((comp, ci) => (
                <div
                  key={ci}
                  style={{
                    padding: "8px 10px",
                    marginBottom: 6,
                    borderRadius: 4,
                    background: comp.status === "prototype" ? "#10b98108" : "#1e293b40",
                    border: `1px solid ${comp.status === "prototype" ? "#10b98120" : "#1e293b"}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                    <span style={{ color: comp.status === "prototype" ? "#10b981" : "#64748b" }}>
                      {comp.status === "prototype" ? <Check size={10} /> : <Clock size={10} />}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#c8d0df" }}>{comp.name}</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: 9,
                        padding: "1px 6px",
                        borderRadius: 2,
                        background: comp.status === "prototype" ? "#10b98120" : "#64748b20",
                        color: comp.status === "prototype" ? "#10b981" : "#64748b",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {comp.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 10, color: "#64748b", lineHeight: 1.4 }}>{comp.desc}</div>
                  <div style={{ marginTop: 4 }}>
                    <Badge color={comp.free ? "#10b981" : "#f59e0b"}>{comp.free ? "Gratuit" : "Payant"}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="card" style={{ padding: 20 }}>
        <h3 className="label-caps" style={{ marginBottom: 14 }}>Stack technique recommandée (prototype)</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, fontSize: 12 }}>
          {TECH_STACK.map((stack) => (
            <div key={stack.title}>
              <div style={{ fontWeight: 600, color: "#e8b931", marginBottom: 8 }}>{stack.title}</div>
              {stack.items.map((item, i) => (
                <div key={i} style={{ padding: "4px 0", color: "#94a3b8", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#334155" }}>›</span>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
