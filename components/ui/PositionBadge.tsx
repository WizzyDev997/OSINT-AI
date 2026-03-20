"use client";

import { Badge } from "./Badge";
import type { PositionKey } from "@/lib/types";

const POSITION_MAP: Record<PositionKey, { color: string; label: string }> = {
  neutre: { color: "#6b7280", label: "Neutre" },
  pro_nucleaire: { color: "#8b5cf6", label: "Pro-nucléaire" },
  pro_renouvelable: { color: "#10b981", label: "Pro-EnR" },
};

export function PositionBadge({ position }: { position: PositionKey }) {
  const p = POSITION_MAP[position] ?? POSITION_MAP["neutre"];
  return <Badge color={p.color}>{p.label}</Badge>;
}
