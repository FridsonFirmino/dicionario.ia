export interface TermData {
  term: string;
  categories: string[];
  quickAnswer: string;
  concept: string[];
  example?: {
    language: string;
    code: string;
    description: string;
  };
  whenToUse: string[];
  whenToAvoid: string[];
  commonMistakes: {
    mistake: string;
    correction: string;
  }[];
  relatedTerms: string[];
}

export type SearchStatus =
  | "idle"
  | "searching"
  | "results"
  | "no-results"
  | "error";
