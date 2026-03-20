"use client";

import { useState } from "react";
import { AppHeader, type TabId } from "./AppHeader";
import { AppFooter } from "./AppFooter";
import { ClaimTab } from "./tabs/ClaimTab";
import { SourcesTab } from "./tabs/SourcesTab";
import { ArgumentsTab } from "./tabs/ArgumentsTab";
import { SystemTab } from "./tabs/SystemTab";
import { CatalogTab } from "./tabs/CatalogTab";
import { MethodologyTab } from "./tabs/MethodologyTab";

const TAB_COMPONENTS: Record<TabId, React.ComponentType> = {
  claim: ClaimTab,
  sources: SourcesTab,
  args: ArgumentsTab,
  system: SystemTab,
  catalog: CatalogTab,
  method: MethodologyTab,
};

export function OsintApp() {
  const [activeTab, setActiveTab] = useState<TabId>("claim");
  const ActiveTab = TAB_COMPONENTS[activeTab];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0e17",
        color: "#c8d0df",
        fontFamily: "'DM Sans', 'Satoshi', system-ui, sans-serif",
        fontSize: 14,
      }}
    >
      <AppHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <ActiveTab />
      </main>
      <AppFooter />
    </div>
  );
}
