export type VerdictKey = "fondé" | "partiellement_fondé" | "non_fondé" | "indéterminé";
export type PositionKey = "neutre" | "pro_nucleaire" | "pro_renouvelable";
export type AccessKey = "gratuit" | "payant" | "mixte";
export type PriorityKey = "haute" | "moyenne" | "basse";
export type StatusKey = "prototype" | "planifié";
export type ArgType = "pour" | "contre" | "nuance";

export interface Claim {
  id: string;
  text: string;
  category: string;
  dateAnalyzed: string;
  verdict: VerdictKey;
  verdictLabel: string;
  verdictDetail: string;
}

export interface Source {
  id: string;
  name: string;
  type: string;
  access: AccessKey;
  credibility: number;
  independence: number;
  methodology: number;
  url: string;
  keyData: string;
  position: PositionKey;
  date: string;
}

export interface Argument {
  id: string;
  type: ArgType;
  title: string;
  content: string;
  sources: string[];
  strength: number;
}

export interface SystemComponent {
  name: string;
  desc: string;
  status: StatusKey;
  free: boolean;
}

export interface SystemLayer {
  name: string;
  icon: string;
  components: SystemComponent[];
}

export interface CatalogSource {
  name: string;
  type: string;
  access: AccessKey;
  url: string;
  priority: PriorityKey;
  lang: string;
}
