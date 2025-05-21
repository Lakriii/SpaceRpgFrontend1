export type SubResearch = {
  id: number;
  parent_id: number;
  name: string;
  level: number;
  description: string;
  x: number;
  y: number;
  status?: string;
  timeRequired?: string;
};

export type ResearchNode = {
  id: number;
  parent_id: number | null;
  name: string;
  level: number;
  description: string;
  x: number;
  y: number;
  subResearch: SubResearch[];
};
