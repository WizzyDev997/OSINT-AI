import { useState, useEffect, useRef } from "react";

// ─── DATA LAYER ───────────────────────────────────────────────────────────
const CLAIM = {
  id: "CLM-001",
  text: "L'électricité éolienne coûte environ deux fois plus cher que l'électricité nucléaire si l'on intègre l'ensemble des coûts.",
  category: "Coûts énergétiques",
  dateAnalyzed: "2026-03-19",
  verdict: "partiellement_fondé",
  verdictLabel: "Partiellement fondé",
  verdictDetail:
    "L'affirmation dépend fortement du périmètre retenu : si l'on compare le LCOE seul, éolien terrestre et nucléaire existant sont proches (50-65 €/MWh). En intégrant les coûts système (réseau, flexibilité, back-up), l'écart se creuse, mais le facteur ×2 n'est documenté que dans certaines configurations spécifiques.",
};

const SOURCES = [
  {
    id: "S01",
    name: "ADEME – Coûts des EnR 2024",
    type: "Rapport institutionnel",
    access: "gratuit",
    credibility: 4,
    independence: 4,
    methodology: 4,
    url: "https://www.ademe.fr",
    keyData: "LCOE éolien terrestre : 59 €/MWh (installations 2022)",
    position: "neutre",
    date: "Décembre 2024",
  },
  {
    id: "S02",
    name: "CRE – Coût production nucléaire",
    type: "Rapport régulateur",
    access: "gratuit",
    credibility: 5,
    independence: 5,
    methodology: 4,
    url: "https://www.cre.fr",
    keyData: "Nucléaire existant : 60,7 €/MWh (période 2026-2030, démantèlement inclus)",
    position: "neutre",
    date: "2023",
  },
  {
    id: "S03",
    name: "RTE – Futurs Énergétiques 2050",
    type: "Étude prospective",
    access: "gratuit",
    credibility: 5,
    independence: 4,
    methodology: 5,
    url: "https://www.rte-france.com",
    keyData: "Coûts système : scénarios 100% EnR plus coûteux de 10-20% que mix nucléaire+EnR",
    position: "neutre",
    date: "2021 (actualisé 2023)",
  },
  {
    id: "S04",
    name: "Lazard – LCOE+ v18.0",
    type: "Analyse financière",
    access: "gratuit",
    credibility: 4,
    independence: 3,
    methodology: 4,
    url: "https://www.lazard.com",
    keyData: "Onshore wind : $27-73/MWh (moy. $50) vs Nuclear : $141-221/MWh (nouveau)",
    position: "pro_renouvelable",
    date: "Juin 2025",
  },
  {
    id: "S05",
    name: "OCDE/AEN – Projected Costs 2020",
    type: "Rapport international",
    access: "gratuit",
    credibility: 5,
    independence: 5,
    methodology: 5,
    url: "https://www.oecd-nea.org",
    keyData: "À 7% : nucléaire comparable au charbon, moins cher que CCGT. Coûts système non inclus dans LCOE.",
    position: "neutre",
    date: "2020",
  },
  {
    id: "S06",
    name: "Cour des Comptes – Le coût de production de l'électricité nucléaire",
    type: "Audit institutionnel",
    access: "gratuit",
    credibility: 5,
    independence: 5,
    methodology: 4,
    url: "https://www.ccomptes.fr",
    keyData: "Coût complet nucléaire existant : ~62 €/MWh (prolongation). EPR Flamanville : 110-120 €/MWh",
    position: "neutre",
    date: "2014 (actualisé 2020)",
  },
  {
    id: "S07",
    name: "Fondation iFRAP – Analyse coûts éolien",
    type: "Think tank libéral",
    access: "gratuit",
    credibility: 3,
    independence: 2,
    methodology: 3,
    url: "https://www.ifrap.org",
    keyData: "Coût complet éolien (avec intermittence) : ×3 le coût moyen de production français",
    position: "pro_nucleaire",
    date: "2018",
  },
  {
    id: "S08",
    name: "EIA – Annual Energy Outlook 2025",
    type: "Agence gouvernementale US",
    access: "gratuit",
    credibility: 5,
    independence: 4,
    methodology: 5,
    url: "https://www.eia.gov",
    keyData: "LCOE nucléaire avancé : ~$110/MWh. Pas de nouveau nucléaire projeté dans le scénario de référence.",
    position: "neutre",
    date: "2025",
  },
  {
    id: "S09",
    name: "IRENA – Renewable Power Generation Costs 2024",
    type: "Organisation internationale",
    access: "gratuit",
    credibility: 5,
    independence: 4,
    methodology: 5,
    url: "https://www.irena.org",
    keyData: "Éolien terrestre mondial : $0.034/kWh (34 $/MWh), le plus compétitif en 2024",
    position: "pro_renouvelable",
    date: "2025",
  },
  {
    id: "S10",
    name: "Sénat français – Commission d'enquête Électricité 2024",
    type: "Audition parlementaire",
    access: "gratuit",
    credibility: 4,
    independence: 4,
    methodology: 3,
    url: "https://www.senat.fr",
    keyData: "Écart de coût système entre 100% EnR et mix nucléaire confirmé, mais difficile d'attribuer à chaque filière",
    position: "neutre",
    date: "Mars 2024",
  },
];

const ARGUMENTS = [
  {
    id: "A1",
    type: "pour",
    title: "LCOE comparable, mais coûts système divergents",
    content: "Le LCOE brut de l'éolien terrestre (~59 €/MWh) et du nucléaire existant (~61 €/MWh) sont proches. En revanche, les coûts d'intégration système (réseau, flexibilité, back-up) élargissent l'écart en défaveur de l'éolien.",
    sources: ["S01", "S02", "S03"],
    strength: 4,
  },
  {
    id: "A2",
    type: "pour",
    title: "Les scénarios 100% EnR sont plus coûteux",
    content: "RTE estime que les scénarios fortement renouvelables coûtent 10 à 20% de plus que les scénarios incluant du nouveau nucléaire, en intégrant réseau, stockage et flexibilité.",
    sources: ["S03"],
    strength: 4,
  },
  {
    id: "A3",
    type: "pour",
    title: "Le facteur de charge crée un besoin de back-up",
    content: "L'éolien produit entre 2% et 75% de sa capacité selon la météo, avec une puissance garantie infime en période anticyclonique. Le coût du stockage ou du back-up fossile doit être intégré.",
    sources: ["S07", "S10"],
    strength: 3,
  },
  {
    id: "A4",
    type: "contre",
    title: "Le nucléaire neuf est bien plus cher",
    content: "L'EPR de Flamanville et Hinkley Point C montrent des coûts de 110-120 €/MWh, soit le double de l'éolien terrestre. Lazard place le nouveau nucléaire à $141-221/MWh.",
    sources: ["S04", "S06"],
    strength: 5,
  },
  {
    id: "A5",
    type: "contre",
    title: "Les coûts éoliens continuent de baisser",
    content: "L'ADEME documente une baisse de 39% du LCOE éolien terrestre entre 2012 et 2022. Les derniers appels d'offres offshore atteignent 44,9 €/MWh.",
    sources: ["S01", "S09"],
    strength: 4,
  },
  {
    id: "A6",
    type: "contre",
    title: "Le LCOE nucléaire est très sensible au taux d'actualisation",
    content: "L'OCDE montre que le LCOE nucléaire triple entre un taux de 0% et 10%, tandis que l'éolien ne double que. Le financement est déterminant.",
    sources: ["S05"],
    strength: 4,
  },
  {
    id: "A7",
    type: "nuance",
    title: "L'affirmation ×2 dépend du périmètre",
    content: "Comparer éolien et nucléaire requiert de préciser : existant vs neuf, LCOE vs coût système, taux d'actualisation, pays. Le facteur ×2 est plausible dans certaines configurations mais pas universel.",
    sources: ["S03", "S05", "S10"],
    strength: 5,
  },
  {
    id: "A8",
    type: "nuance",
    title: "Les coûts réseau sont partagés",
    content: "Les investissements réseau (200 Md€ projetés en France) servent à la fois les EnR et le nouveau nucléaire (ex: zone Dunkerque pour EPR2 et éolien offshore).",
    sources: ["S10"],
    strength: 3,
  },
];

const SYSTEM_DESIGN = {
  layers: [
    {
      name: "Collecte",
      icon: "📡",
      components: [
        { name: "Web Scraper", desc: "Extraction automatisée de sources publiques", status: "prototype", free: true },
        { name: "API Sources ouvertes", desc: "ADEME, data.gouv.fr, IRENA, IEA open data", status: "prototype", free: true },
        { name: "Flux RSS / Alertes", desc: "Veille automatisée par mots-clés", status: "planifié", free: true },
        { name: "API Presse payante", desc: "Europresse, Factiva, LexisNexis", status: "planifié", free: false },
      ],
    },
    {
      name: "Structuration",
      icon: "🧱",
      components: [
        { name: "NLP / NER", desc: "Extraction d'entités, chiffres, dates (spaCy, HuggingFace)", status: "prototype", free: true },
        { name: "Graphe de connaissances", desc: "Relations claims ↔ sources ↔ arguments (Neo4j Community)", status: "prototype", free: true },
        { name: "Classification automatique", desc: "Catégorisation des sources et arguments par LLM", status: "prototype", free: true },
        { name: "OCR / Extraction PDF", desc: "Traitement des rapports institutionnels scannés", status: "planifié", free: true },
      ],
    },
    {
      name: "Analyse",
      icon: "🔬",
      components: [
        { name: "Scoring de crédibilité", desc: "Évaluation multi-critères des sources", status: "prototype", free: true },
        { name: "Détection de biais", desc: "Identification du positionnement des sources", status: "planifié", free: true },
        { name: "Cross-référencement", desc: "Vérification croisée des données chiffrées", status: "prototype", free: true },
        { name: "LLM Analysis", desc: "Synthèse et argumentation via Claude API", status: "prototype", free: false },
      ],
    },
    {
      name: "Restitution",
      icon: "📊",
      components: [
        { name: "Dashboard interactif", desc: "Visualisation des claims et arguments", status: "prototype", free: true },
        { name: "Export structuré", desc: "JSON, CSV, PDF pour aide à la décision", status: "planifié", free: true },
        { name: "API REST", desc: "Interface programmatique pour intégration", status: "planifié", free: true },
        { name: "Cartographie géo", desc: "Dimension territoriale des données", status: "planifié", free: true },
      ],
    },
  ],
};

const SOURCE_CATALOG = [
  { name: "ADEME Open Data", type: "Données ouvertes", access: "gratuit", url: "data.ademe.fr", priority: "haute", lang: "FR" },
  { name: "data.gouv.fr", type: "Portail open data", access: "gratuit", url: "data.gouv.fr", priority: "haute", lang: "FR" },
  { name: "CRE – Publications", type: "Rapports régulateur", access: "gratuit", url: "cre.fr", priority: "haute", lang: "FR" },
  { name: "RTE – Bilan & Futurs", type: "Données réseau", access: "gratuit", url: "rte-france.com", priority: "haute", lang: "FR" },
  { name: "Cour des Comptes", type: "Audits publics", access: "gratuit", url: "ccomptes.fr", priority: "haute", lang: "FR" },
  { name: "Sénat / AN – Rapports", type: "Travaux parlementaires", access: "gratuit", url: "senat.fr", priority: "haute", lang: "FR" },
  { name: "IRENA – Data & Stats", type: "Organisation intl.", access: "gratuit", url: "irena.org", priority: "haute", lang: "EN" },
  { name: "IEA – Open Data", type: "Organisation intl.", access: "mixte", url: "iea.org", priority: "haute", lang: "EN" },
  { name: "OCDE/AEN", type: "Recherche intl.", access: "mixte", url: "oecd-nea.org", priority: "haute", lang: "EN/FR" },
  { name: "Lazard LCOE+", type: "Finance / Conseil", access: "gratuit", url: "lazard.com", priority: "moyenne", lang: "EN" },
  { name: "EIA (US)", type: "Agence gouv. US", access: "gratuit", url: "eia.gov", priority: "moyenne", lang: "EN" },
  { name: "BNEF", type: "Analyse financière", access: "payant", url: "bnef.com", priority: "basse", lang: "EN" },
  { name: "Europresse", type: "Agrégateur presse", access: "payant", url: "europresse.com", priority: "basse", lang: "FR" },
  { name: "Wood Mackenzie", type: "Consulting énergie", access: "payant", url: "woodmac.com", priority: "basse", lang: "EN" },
  { name: "Ember Climate", type: "Think tank énergie", access: "gratuit", url: "ember-climate.org", priority: "moyenne", lang: "EN" },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────

const StarRating = ({ value, max = 5, size = 14 }) => (
  <span style={{ display: "inline-flex", gap: 1 }}>
    {Array.from({ length: max }, (_, i) => (
      <span key={i} style={{ color: i < value ? "#f59e0b" : "#374151", fontSize: size, lineHeight: 1 }}>
        ★
      </span>
    ))}
  </span>
);

const Badge = ({ children, color = "#3b82f6", bg }) => (
  <span
    style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 0.5,
      textTransform: "uppercase",
      color: color,
      background: bg || `${color}18`,
      border: `1px solid ${color}30`,
    }}
  >
    {children}
  </span>
);

const VerdictBadge = ({ verdict }) => {
  const map = {
    fondé: { color: "#10b981", label: "Fondé" },
    partiellement_fondé: { color: "#f59e0b", label: "Partiellement fondé" },
    non_fondé: { color: "#ef4444", label: "Non fondé" },
    indéterminé: { color: "#6b7280", label: "Indéterminé" },
  };
  const v = map[verdict] || map["indéterminé"];
  return <Badge color={v.color}>{v.label}</Badge>;
};

const PositionBadge = ({ position }) => {
  const map = {
    neutre: { color: "#6b7280", label: "Neutre" },
    pro_nucleaire: { color: "#8b5cf6", label: "Pro-nucléaire" },
    pro_renouvelable: { color: "#10b981", label: "Pro-EnR" },
  };
  const p = map[position] || map["neutre"];
  return <Badge color={p.color}>{p.label}</Badge>;
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────

const tabs = [
  { id: "claim", label: "Affirmation", icon: "◈" },
  { id: "sources", label: "Sources", icon: "⊞" },
  { id: "args", label: "Arguments", icon: "⇌" },
  { id: "system", label: "Architecture", icon: "◰" },
  { id: "catalog", label: "Catalogue sources", icon: "▤" },
  { id: "method", label: "Méthodologie", icon: "◇" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("claim");
  const [selectedSource, setSelectedSource] = useState(null);
  const [filterPosition, setFilterPosition] = useState("all");
  const [argFilter, setArgFilter] = useState("all");
  const [catalogFilter, setCatalogFilter] = useState("all");
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimReady(true), 100);
  }, []);

  const filteredSources =
    filterPosition === "all" ? SOURCES : SOURCES.filter((s) => s.position === filterPosition);
  const filteredArgs = argFilter === "all" ? ARGUMENTS : ARGUMENTS.filter((a) => a.type === argFilter);
  const filteredCatalog =
    catalogFilter === "all" ? SOURCE_CATALOG : SOURCE_CATALOG.filter((s) => s.access === catalogFilter);

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .card { background: #111827; border: 1px solid #1e293b; border-radius: 8px; transition: border-color 0.2s; }
        .card:hover { border-color: #334155; }
        .tab-btn { padding: 10px 18px; border: none; background: transparent; color: #64748b; cursor: pointer; font-size: 13px; font-weight: 500; font-family: inherit; display: flex; align-items: center; gap: 6px; border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap; }
        .tab-btn:hover { color: #94a3b8; }
        .tab-btn.active { color: #e8b931; border-bottom-color: #e8b931; }
        .filter-btn { padding: 5px 14px; border: 1px solid #1e293b; background: transparent; color: #64748b; cursor: pointer; font-size: 12px; font-family: inherit; border-radius: 4px; transition: all 0.15s; }
        .filter-btn:hover { border-color: #334155; color: #94a3b8; }
        .filter-btn.active { background: #e8b93118; border-color: #e8b93140; color: #e8b931; }
        .strength-bar { height: 4px; border-radius: 2px; background: #1e293b; overflow: hidden; }
        .strength-fill { height: 100%; border-radius: 2px; transition: width 0.6s ease-out; }
        .anim-item { opacity: 0; animation: fadeSlideUp 0.4s ease-out forwards; }
      `}</style>

      {/* ── HEADER ── */}
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
              fontSize: 18,
              fontWeight: 700,
              color: "#0a0e17",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Σ
          </div>
          <div>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#f1f5f9",
                letterSpacing: -0.5,
              }}
            >
              ENERGY CLAIMS ANALYZER
            </h1>
            <p style={{ fontSize: 11, color: "#475569", letterSpacing: 1.2, textTransform: "uppercase", marginTop: 1 }}>
              Prototype OSINT/IA — Vérification & Cartographie argumentaire
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
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite" }} />
              PROTOTYPE v0.1
            </span>
          </div>
        </div>

        {/* Tabs */}
        <nav style={{ display: "flex", gap: 0, marginTop: 12, overflowX: "auto" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span style={{ fontSize: 15 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ── CONTENT ── */}
      <main style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        {/* ─ CLAIM TAB ─ */}
        {activeTab === "claim" && (
          <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
            {/* Claim card */}
            <div className="card" style={{ padding: 28, marginBottom: 20, borderLeft: "3px solid #e8b931" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#475569",
                    background: "#1e293b",
                    padding: "2px 8px",
                    borderRadius: 3,
                  }}
                >
                  {CLAIM.id}
                </span>
                <Badge color="#6366f1">{CLAIM.category}</Badge>
                <span style={{ fontSize: 12, color: "#475569", marginLeft: "auto" }}>
                  Analysé le {CLAIM.dateAnalyzed}
                </span>
              </div>
              <blockquote
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  color: "#e2e8f0",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  padding: "0 0 0 16px",
                  borderLeft: "2px solid #334155",
                  marginBottom: 20,
                }}
              >
                « {CLAIM.text} »
              </blockquote>

              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>
                      Verdict
                    </span>
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
                { label: "Sources gratuites", value: SOURCES.filter(() => true).length + "/10", accent: "#10b981" },
                { label: "Score confiance moyen", value: (SOURCES.reduce((a, s) => a + s.credibility, 0) / SOURCES.length).toFixed(1) + "/5", accent: "#f59e0b" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="card anim-item"
                  style={{ padding: "16px 18px", animationDelay: `${i * 80}ms` }}
                >
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: s.accent, fontFamily: "'JetBrains Mono', monospace" }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* LCOE Comparison visual */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 16 }}>
                Comparaison LCOE — Données croisées (€/MWh)
              </h3>
              {[
                { label: "Éolien terrestre (FR, 2022)", low: 50, high: 71, mid: 59, color: "#10b981", src: "ADEME 2024" },
                { label: "Nucléaire existant (FR)", low: 55, high: 70, mid: 61, color: "#8b5cf6", src: "CRE 2023" },
                { label: "EPR Flamanville", low: 110, high: 120, mid: 115, color: "#ef4444", src: "Cour des Comptes" },
                { label: "Éolien offshore posé (FR)", low: 45, high: 92, mid: 68, color: "#06b6d4", src: "ADEME 2019 + AO 2023" },
                { label: "Onshore wind (mondial)", low: 27, high: 73, mid: 50, color: "#22c55e", src: "Lazard 2025" },
                { label: "Nuclear new (US)", low: 141, high: 221, mid: 181, color: "#f43f5e", src: "Lazard 2025" },
              ].map((item, i) => {
                const maxVal = 240;
                const leftPct = (item.low / maxVal) * 100;
                const widthPct = ((item.high - item.low) / maxVal) * 100;
                const midPct = (item.mid / maxVal) * 100;
                return (
                  <div
                    key={i}
                    className="anim-item"
                    style={{ marginBottom: 14, animationDelay: `${i * 60}ms` }}
                  >
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
                      {/* Scale markers */}
                      {[0, 50, 100, 150, 200].map((v) => (
                        <div
                          key={v}
                          style={{
                            position: "absolute",
                            left: `${(v / maxVal) * 100}%`,
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
                Barres = fourchette basse–haute. Trait = valeur médiane/moyenne. Les comparaisons directes
                LCOE ne reflètent pas les coûts système (réseau, stockage, flexibilité).
              </p>
            </div>
          </div>
        )}

        {/* ─ SOURCES TAB ─ */}
        {activeTab === "sources" && (
          <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>Sources mobilisées</h2>
              <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
                {[
                  { value: "all", label: "Toutes" },
                  { value: "neutre", label: "Neutres" },
                  { value: "pro_nucleaire", label: "Pro-nucléaire" },
                  { value: "pro_renouvelable", label: "Pro-EnR" },
                ].map((f) => (
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
              {filteredSources.map((src, i) => (
                <div
                  key={src.id}
                  className="card anim-item"
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                    animationDelay: `${i * 50}ms`,
                    borderLeft: selectedSource === src.id ? "3px solid #e8b931" : "3px solid transparent",
                  }}
                  onClick={() => setSelectedSource(selectedSource === src.id ? null : src.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: "#475569",
                        background: "#1e293b",
                        padding: "2px 6px",
                        borderRadius: 2,
                      }}
                    >
                      {src.id}
                    </span>
                    <span style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13 }}>{src.name}</span>
                    <Badge color="#475569">{src.type}</Badge>
                    <PositionBadge position={src.position} />
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "#475569" }}>{src.date}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{src.keyData}</p>
                    </div>
                    <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 10, color: "#475569", marginBottom: 3 }}>Crédibilité</div>
                        <StarRating value={src.credibility} />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 10, color: "#475569", marginBottom: 3 }}>Indépendance</div>
                        <StarRating value={src.independence} />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 10, color: "#475569", marginBottom: 3 }}>Méthodo</div>
                        <StarRating value={src.methodology} />
                      </div>
                    </div>
                    <Badge color={src.access === "gratuit" ? "#10b981" : "#ef4444"}>
                      {src.access}
                    </Badge>
                  </div>

                  {selectedSource === src.id && (
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
                      <div>
                        <span style={{ color: "#64748b" }}>URL : </span>
                        <span style={{ color: "#3b82f6" }}>{src.url}</span>
                      </div>
                      <div>
                        <span style={{ color: "#64748b" }}>Utilisée dans : </span>
                        <span style={{ color: "#94a3b8" }}>
                          {ARGUMENTS.filter((a) => a.sources.includes(src.id))
                            .map((a) => a.id)
                            .join(", ") || "—"}
                        </span>
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <span style={{ color: "#64748b" }}>Score agrégé : </span>
                        <span
                          style={{
                            color: "#e8b931",
                            fontWeight: 600,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {((src.credibility + src.independence + src.methodology) / 3).toFixed(1)}/5
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─ ARGUMENTS TAB ─ */}
        {activeTab === "args" && (
          <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>Cartographie argumentaire</h2>
              <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
                {[
                  { value: "all", label: "Tous" },
                  { value: "pour", label: "⬆ Pour (coût ×2)" },
                  { value: "contre", label: "⬇ Contre" },
                  { value: "nuance", label: "↔ Nuances" },
                ].map((f) => (
                  <button
                    key={f.value}
                    className={`filter-btn ${argFilter === f.value ? "active" : ""}`}
                    onClick={() => setArgFilter(f.value)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {filteredArgs.map((arg, i) => {
                const typeMap = {
                  pour: { color: "#ef4444", label: "POUR", border: "#ef444440" },
                  contre: { color: "#10b981", label: "CONTRE", border: "#10b98140" },
                  nuance: { color: "#f59e0b", label: "NUANCE", border: "#f59e0b40" },
                };
                const t = typeMap[arg.type];
                return (
                  <div
                    key={arg.id}
                    className="card anim-item"
                    style={{
                      padding: "16px 20px",
                      animationDelay: `${i * 60}ms`,
                      borderLeft: `3px solid ${t.border}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <Badge color={t.color}>{t.label}</Badge>
                      <span style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13 }}>{arg.title}</span>
                      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 10, color: "#475569" }}>Force</span>
                        <div className="strength-bar" style={{ width: 60 }}>
                          <div
                            className="strength-fill"
                            style={{
                              width: `${(arg.strength / 5) * 100}%`,
                              background: t.color,
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                            color: t.color,
                          }}
                        >
                          {arg.strength}/5
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 8 }}>
                      {arg.content}
                    </p>
                    <div style={{ display: "flex", gap: 6 }}>
                      {arg.sources.map((sId) => {
                        const s = SOURCES.find((x) => x.id === sId);
                        return (
                          <span
                            key={sId}
                            style={{
                              fontSize: 10,
                              padding: "2px 8px",
                              borderRadius: 3,
                              background: "#1e293b",
                              color: "#64748b",
                              cursor: "default",
                            }}
                            title={s?.name}
                          >
                            {sId} — {s?.name?.split(" – ")[0]?.substring(0, 20)}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─ SYSTEM DESIGN TAB ─ */}
        {activeTab === "system" && (
          <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>
              Architecture technique du prototype
            </h2>

            {/* Pipeline visual */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
              {SYSTEM_DESIGN.layers.map((layer, li) => (
                <div
                  key={layer.name}
                  className="card anim-item"
                  style={{ padding: 0, overflow: "hidden", animationDelay: `${li * 100}ms` }}
                >
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
                    <span style={{ fontSize: 18 }}>{layer.icon}</span>
                    <span style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13 }}>{layer.name}</span>
                    {li < 3 && (
                      <span style={{ marginLeft: "auto", color: "#334155", fontSize: 16 }}>→</span>
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
                        <div style={{ marginTop: 3 }}>
                          <Badge color={comp.free ? "#10b981" : "#f59e0b"}>
                            {comp.free ? "Gratuit" : "Payant"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div className="card" style={{ padding: 20 }}>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 14,
                }}
              >
                Stack technique recommandée (prototype)
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, fontSize: 12 }}>
                {[
                  {
                    title: "Backend",
                    items: [
                      "Python 3.11+ (FastAPI)",
                      "spaCy / HuggingFace (NLP)",
                      "Neo4j Community (graphe)",
                      "SQLite (métadonnées)",
                      "Scrapy (collecte web)",
                    ],
                  },
                  {
                    title: "Frontend",
                    items: [
                      "React + Vite",
                      "D3.js (visualisations)",
                      "TailwindCSS",
                      "React Flow (graphe interactif)",
                    ],
                  },
                  {
                    title: "IA / LLM",
                    items: [
                      "Claude API (analyse, synthèse)",
                      "Sentence Transformers (embeddings)",
                      "LangChain (orchestration)",
                      "ChromaDB (vector store, gratuit)",
                    ],
                  },
                ].map((stack) => (
                  <div key={stack.title}>
                    <div style={{ fontWeight: 600, color: "#e8b931", marginBottom: 8 }}>{stack.title}</div>
                    {stack.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "4px 0",
                          color: "#94a3b8",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <span style={{ color: "#334155" }}>›</span>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─ CATALOG TAB ─ */}
        {activeTab === "catalog" && (
          <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>Catalogue des sources exploitables</h2>
              <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
                {[
                  { value: "all", label: "Toutes" },
                  { value: "gratuit", label: "Gratuites" },
                  { value: "payant", label: "Payantes" },
                  { value: "mixte", label: "Mixtes" },
                ].map((f) => (
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

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2.5fr 1.5fr 1fr 1fr 0.8fr",
                gap: 0,
                fontSize: 12,
              }}
            >
              {/* Header */}
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
              {/* Rows */}
              {filteredCatalog.map((src, i) => {
                const prioColor = { haute: "#10b981", moyenne: "#f59e0b", basse: "#64748b" };
                const accessColor = { gratuit: "#10b981", payant: "#ef4444", mixte: "#f59e0b" };
                return ["name", "type", "access", "priority", "lang"].map((field, fi) => (
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
                      <Badge color={accessColor[src.access]}>{src.access}</Badge>
                    ) : field === "priority" ? (
                      <Badge color={prioColor[src.priority]}>{src.priority}</Badge>
                    ) : (
                      src[field]
                    )}
                  </div>
                ));
              })}
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
        )}

        {/* ─ METHODOLOGY TAB ─ */}
        {activeTab === "method" && (
          <div style={{ animation: "fadeSlideUp 0.35s ease-out" }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>
              Méthodologie d'analyse
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Grille d'évaluation */}
              <div className="card" style={{ padding: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e8b931", marginBottom: 12 }}>
                  Grille d'évaluation des sources
                </h3>
                {[
                  {
                    criterion: "Crédibilité",
                    desc: "Réputation de l'institution, historique de publications, processus de revue",
                    weight: "30%",
                  },
                  {
                    criterion: "Indépendance",
                    desc: "Absence de conflit d'intérêt, financement, positionnement déclaré",
                    weight: "30%",
                  },
                  {
                    criterion: "Méthodologie",
                    desc: "Transparence des hypothèses, reproductibilité, périmètre explicite",
                    weight: "25%",
                  },
                  {
                    criterion: "Actualité",
                    desc: "Date de publication, pertinence des données utilisées",
                    weight: "15%",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "10px 0",
                      borderBottom: i < 3 ? "1px solid #1e293b" : "none",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 12 }}>{c.criterion}</span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: "#e8b931",
                        }}
                      >
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
                  Processus d'analyse (par claim)
                </h3>
                {[
                  {
                    step: 1,
                    title: "Identification de l'affirmation",
                    desc: "Formulation précise, contexte, auteur(s)",
                    auto: false,
                  },
                  {
                    step: 2,
                    title: "Collecte des sources",
                    desc: "Recherche automatisée + curation manuelle",
                    auto: true,
                  },
                  {
                    step: 3,
                    title: "Évaluation des sources",
                    desc: "Scoring multi-critères, détection de biais",
                    auto: true,
                  },
                  {
                    step: 4,
                    title: "Extraction des données clés",
                    desc: "NLP pour identifier chiffres, méthodologies, conclusions",
                    auto: true,
                  },
                  {
                    step: 5,
                    title: "Structuration argumentaire",
                    desc: "Cartographie pour/contre/nuance avec traçabilité",
                    auto: false,
                  },
                  {
                    step: 6,
                    title: "Synthèse et verdict",
                    desc: "Conclusion pondérée, niveau de confiance, réserves",
                    auto: false,
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "8px 0",
                      borderBottom: i < 5 ? "1px solid #1e293b" : "none",
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
                          {s.auto ? "Automatisable" : "Contrôle humain"}
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
                  {[
                    {
                      level: "Niveau 1 — LCOE brut",
                      color: "#10b981",
                      items: [
                        "CAPEX (investissement initial)",
                        "OPEX (exploitation, maintenance)",
                        "Coût du combustible",
                        "Démantèlement",
                        "Aval du cycle (nucléaire)",
                      ],
                      result: "Éolien ≈ Nucléaire existant (~60 €/MWh)",
                    },
                    {
                      level: "Niveau 2 — Coûts système",
                      color: "#f59e0b",
                      items: [
                        "Renforcement réseau transport",
                        "Adaptation réseau distribution",
                        "Stockage / batteries",
                        "Flexibilité (back-up gaz, import)",
                        "Coûts de raccordement",
                      ],
                      result: "Éolien > Nucléaire (écart 10-30%)",
                    },
                    {
                      level: "Niveau 3 — Coûts élargis",
                      color: "#ef4444",
                      items: [
                        "Externalités CO₂",
                        "Subventions directes/indirectes",
                        "Impact foncier / acceptabilité",
                        "Sécurité d'approvisionnement",
                        "Dépendance géopolitique (composants)",
                      ],
                      result: "Comparaison très dépendante des hypothèses",
                    },
                  ].map((level) => (
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
                        <div
                          key={i}
                          style={{
                            fontSize: 11,
                            color: "#94a3b8",
                            padding: "3px 0",
                            display: "flex",
                            gap: 6,
                          }}
                        >
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
        )}
      </main>

      {/* ── FOOTER ── */}
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
        <span>
          Sources : ADEME, CRE, RTE, Lazard, OCDE/AEN, EIA, IRENA, Cour des Comptes, Sénat, iFRAP
        </span>
      </footer>
    </div>
  );
}