import { useState } from "react";

export const knowledgeAreas = [
  // "Geral",
  "Tecnologia",
  "Ciências",
  // "Humanas",
  "Economia",
] as const;

export type KnowledgeArea = (typeof knowledgeAreas)[number];

export function useSettings() {
  const [language, setLanguage] = useState("Português (BR)");
  const [area, setArea] = useState<KnowledgeArea>("Tecnologia");

  return {
    language,
    setLanguage,
    area,
    setArea,
  };
}
