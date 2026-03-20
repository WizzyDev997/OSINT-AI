export function AppFooter() {
  return (
    <footer
      style={{
        padding: "16px 28px",
        borderTop: "1px solid #1e293b",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 11,
        color: "#334155",
      }}
    >
      <span>Energy Claims Analyzer — Prototype OSINT/IA v0.1 — Mars 2026</span>
      <span>Sources : ADEME, CRE, RTE, Lazard, OCDE/AEN, EIA, IRENA, Cour des Comptes, Sénat, iFRAP</span>
    </footer>
  );
}
