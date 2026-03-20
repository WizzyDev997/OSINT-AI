import type { Claim, Source, Argument, SystemLayer, CatalogSource } from "./types";

export const CLAIM: Claim = {
  id: "CLM-001",
  text: "L'électricité éolienne coûte environ deux fois plus cher que l'électricité nucléaire si l'on intègre l'ensemble des coûts.",
  category: "Coûts énergétiques",
  dateAnalyzed: "2026-03-19",
  verdict: "partiellement_fondé",
  verdictLabel: "Partiellement fondé",
  verdictDetail:
    "L'affirmation dépend fortement du périmètre retenu : si l'on compare le LCOE seul, éolien terrestre et nucléaire existant sont proches (50-65 €/MWh). En intégrant les coûts système (réseau, flexibilité, back-up), l'écart se creuse, mais le facteur ×2 n'est documenté que dans certaines configurations spécifiques.",
};

export const SOURCES: Source[] = [
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
    keyData:
      "Écart de coût système entre 100% EnR et mix nucléaire confirmé, mais difficile d'attribuer à chaque filière",
    position: "neutre",
    date: "Mars 2024",
  },
];

export const ARGUMENTS: Argument[] = [
  {
    id: "A1",
    type: "pour",
    title: "LCOE comparable, mais coûts système divergents",
    content:
      "Le LCOE brut de l'éolien terrestre (~59 €/MWh) et du nucléaire existant (~61 €/MWh) sont proches. En revanche, les coûts d'intégration système (réseau, flexibilité, back-up) élargissent l'écart en défaveur de l'éolien.",
    sources: ["S01", "S02", "S03"],
    strength: 4,
  },
  {
    id: "A2",
    type: "pour",
    title: "Les scénarios 100% EnR sont plus coûteux",
    content:
      "RTE estime que les scénarios fortement renouvelables coûtent 10 à 20% de plus que les scénarios incluant du nouveau nucléaire, en intégrant réseau, stockage et flexibilité.",
    sources: ["S03"],
    strength: 4,
  },
  {
    id: "A3",
    type: "pour",
    title: "Le facteur de charge crée un besoin de back-up",
    content:
      "L'éolien produit entre 2% et 75% de sa capacité selon la météo, avec une puissance garantie infime en période anticyclonique. Le coût du stockage ou du back-up fossile doit être intégré.",
    sources: ["S07", "S10"],
    strength: 3,
  },
  {
    id: "A4",
    type: "contre",
    title: "Le nucléaire neuf est bien plus cher",
    content:
      "L'EPR de Flamanville et Hinkley Point C montrent des coûts de 110-120 €/MWh, soit le double de l'éolien terrestre. Lazard place le nouveau nucléaire à $141-221/MWh.",
    sources: ["S04", "S06"],
    strength: 5,
  },
  {
    id: "A5",
    type: "contre",
    title: "Les coûts éoliens continuent de baisser",
    content:
      "L'ADEME documente une baisse de 39% du LCOE éolien terrestre entre 2012 et 2022. Les derniers appels d'offres offshore atteignent 44,9 €/MWh.",
    sources: ["S01", "S09"],
    strength: 4,
  },
  {
    id: "A6",
    type: "contre",
    title: "Le LCOE nucléaire est très sensible au taux d'actualisation",
    content:
      "L'OCDE montre que le LCOE nucléaire triple entre un taux de 0% et 10%, tandis que l'éolien ne double que. Le financement est déterminant.",
    sources: ["S05"],
    strength: 4,
  },
  {
    id: "A7",
    type: "nuance",
    title: "L'affirmation ×2 dépend du périmètre",
    content:
      "Comparer éolien et nucléaire requiert de préciser : existant vs neuf, LCOE vs coût système, taux d'actualisation, pays. Le facteur ×2 est plausible dans certaines configurations mais pas universel.",
    sources: ["S03", "S05", "S10"],
    strength: 5,
  },
  {
    id: "A8",
    type: "nuance",
    title: "Les coûts réseau sont partagés",
    content:
      "Les investissements réseau (200 Md€ projetés en France) servent à la fois les EnR et le nouveau nucléaire (ex: zone Dunkerque pour EPR2 et éolien offshore).",
    sources: ["S10"],
    strength: 3,
  },
];

export const SYSTEM_DESIGN: { layers: SystemLayer[] } = {
  layers: [
    {
      name: "Collecte",
      icon: "collect",
      components: [
        { name: "Web Scraper", desc: "Extraction automatisée de sources publiques", status: "prototype", free: true },
        { name: "API Sources ouvertes", desc: "ADEME, data.gouv.fr, IRENA, IEA open data", status: "prototype", free: true },
        { name: "Flux RSS / Alertes", desc: "Veille automatisée par mots-clés", status: "planifié", free: true },
        { name: "API Presse payante", desc: "Europresse, Factiva, LexisNexis", status: "planifié", free: false },
      ],
    },
    {
      name: "Structuration",
      icon: "structure",
      components: [
        { name: "NLP / NER", desc: "Extraction d'entités, chiffres, dates (spaCy, HuggingFace)", status: "prototype", free: true },
        { name: "Graphe de connaissances", desc: "Relations claims ↔ sources ↔ arguments (Neo4j Community)", status: "prototype", free: true },
        { name: "Classification automatique", desc: "Catégorisation des sources et arguments par LLM", status: "prototype", free: true },
        { name: "OCR / Extraction PDF", desc: "Traitement des rapports institutionnels scannés", status: "planifié", free: true },
      ],
    },
    {
      name: "Analyse",
      icon: "analyze",
      components: [
        { name: "Scoring de crédibilité", desc: "Évaluation multi-critères des sources", status: "prototype", free: true },
        { name: "Détection de biais", desc: "Identification du positionnement des sources", status: "planifié", free: true },
        { name: "Cross-référencement", desc: "Vérification croisée des données chiffrées", status: "prototype", free: true },
        { name: "LLM Analysis", desc: "Synthèse et argumentation via Claude API", status: "prototype", free: false },
      ],
    },
    {
      name: "Restitution",
      icon: "output",
      components: [
        { name: "Dashboard interactif", desc: "Visualisation des claims et arguments", status: "prototype", free: true },
        { name: "Export structuré", desc: "JSON, CSV, PDF pour aide à la décision", status: "planifié", free: true },
        { name: "API REST", desc: "Interface programmatique pour intégration", status: "planifié", free: true },
        { name: "Cartographie géo", desc: "Dimension territoriale des données", status: "planifié", free: true },
      ],
    },
  ],
};

export const SOURCE_CATALOG: CatalogSource[] = [
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
  { name: "Ember Climate", type: "Think tank énergie", access: "gratuit", url: "ember-climate.org", priority: "moyenne", lang: "EN" },
  { name: "BNEF", type: "Analyse financière", access: "payant", url: "bnef.com", priority: "basse", lang: "EN" },
  { name: "Europresse", type: "Agrégateur presse", access: "payant", url: "europresse.com", priority: "basse", lang: "FR" },
  { name: "Wood Mackenzie", type: "Consulting énergie", access: "payant", url: "woodmac.com", priority: "basse", lang: "EN" },
];

export const LCOE_DATA = [
  { label: "Éolien terrestre (FR, 2022)", low: 50, high: 71, mid: 59, color: "#10b981", src: "ADEME 2024" },
  { label: "Nucléaire existant (FR)", low: 55, high: 70, mid: 61, color: "#8b5cf6", src: "CRE 2023" },
  { label: "EPR Flamanville", low: 110, high: 120, mid: 115, color: "#ef4444", src: "Cour des Comptes" },
  { label: "Éolien offshore posé (FR)", low: 45, high: 92, mid: 68, color: "#06b6d4", src: "ADEME 2019 + AO 2023" },
  { label: "Onshore wind (mondial)", low: 27, high: 73, mid: 50, color: "#22c55e", src: "Lazard 2025" },
  { label: "Nuclear new (US)", low: 141, high: 221, mid: 181, color: "#f43f5e", src: "Lazard 2025" },
];

export const TECH_STACK = [
  {
    title: "Backend",
    items: ["Python 3.11+ (FastAPI)", "spaCy / HuggingFace (NLP)", "Neo4j Community (graphe)", "SQLite (métadonnées)", "Scrapy (collecte web)"],
  },
  {
    title: "Frontend",
    items: ["Next.js 15 (App Router)", "D3.js (visualisations)", "TailwindCSS", "React Flow (graphe interactif)"],
  },
  {
    title: "IA / LLM",
    items: ["Claude API (analyse, synthèse)", "Sentence Transformers (embeddings)", "LangChain (orchestration)", "ChromaDB (vector store, gratuit)"],
  },
];

export const EVAL_CRITERIA = [
  { criterion: "Crédibilité", desc: "Réputation de l'institution, historique de publications, processus de revue", weight: "30%" },
  { criterion: "Indépendance", desc: "Absence de conflit d'intérêt, financement, positionnement déclaré", weight: "30%" },
  { criterion: "Méthodologie", desc: "Transparence des hypothèses, reproductibilité, périmètre explicite", weight: "25%" },
  { criterion: "Actualité", desc: "Date de publication, pertinence des données utilisées", weight: "15%" },
];

export const ANALYSIS_STEPS = [
  { step: 1, title: "Identification de l'affirmation", desc: "Formulation précise, contexte, auteur(s)", auto: false },
  { step: 2, title: "Collecte des sources", desc: "Recherche automatisée + curation manuelle", auto: true },
  { step: 3, title: "Évaluation des sources", desc: "Scoring multi-critères, détection de biais", auto: true },
  { step: 4, title: "Extraction des données clés", desc: "NLP pour identifier chiffres, méthodologies, conclusions", auto: true },
  { step: 5, title: "Structuration argumentaire", desc: "Cartographie pour/contre/nuance avec traçabilité", auto: false },
  { step: 6, title: "Synthèse et verdict", desc: "Conclusion pondérée, niveau de confiance, réserves", auto: false },
];

export const COST_LEVELS = [
  {
    level: "Niveau 1 — LCOE brut",
    color: "#10b981",
    items: ["CAPEX (investissement initial)", "OPEX (exploitation, maintenance)", "Coût du combustible", "Démantèlement", "Aval du cycle (nucléaire)"],
    result: "Éolien ≈ Nucléaire existant (~60 €/MWh)",
  },
  {
    level: "Niveau 2 — Coûts système",
    color: "#f59e0b",
    items: ["Renforcement réseau transport", "Adaptation réseau distribution", "Stockage / batteries", "Flexibilité (back-up gaz, import)", "Coûts de raccordement"],
    result: "Éolien > Nucléaire (écart 10-30%)",
  },
  {
    level: "Niveau 3 — Coûts élargis",
    color: "#ef4444",
    items: ["Externalités CO₂", "Subventions directes/indirectes", "Impact foncier / acceptabilité", "Sécurité d'approvisionnement", "Dépendance géopolitique (composants)"],
    result: "Comparaison très dépendante des hypothèses",
  },
];
