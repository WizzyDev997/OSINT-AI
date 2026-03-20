"use client";

import { Badge } from "./Badge";
import type { VerdictKey } from "@/lib/types";

const VERDICT_MAP: Record<VerdictKey, { color: string; label: string }> = {
  fondé: { color: "#10b981", label: "Fondé" },
  partiellement_fondé: { color: "#f59e0b", label: "Partiellement fondé" },
  non_fondé: { color: "#ef4444", label: "Non fondé" },
  indéterminé: { color: "#6b7280", label: "Indéterminé" },
};

export function VerdictBadge({ verdict }: { verdict: VerdictKey }) {
  const v = VERDICT_MAP[verdict] ?? VERDICT_MAP["indéterminé"];
  return <Badge color={v.color}>{v.label}</Badge>;
}
