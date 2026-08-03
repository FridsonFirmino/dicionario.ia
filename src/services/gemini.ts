import { GoogleGenAI, Type } from "@google/genai";
import type { TermData } from "../types";

interface Schema {
  type?: string;
  description?: string;
  items?: Schema;
  properties?: Record<string, Schema>;
  required?: string[];
  nullable?: boolean;
  enum?: string[];
}

let client: GoogleGenAI | null = null;

export function isGeminiConfigured(): boolean {
  return Boolean(import.meta.env.VITE_GEMINI_API_KEY);
}

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null;

  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }
  return client;
}

function buildSystemPrompt(area: string, language: string): string {
  return `
Você é um assistente que escreve verbetes de dicionário técnico e de conhecimento geral.
Idioma de resposta: ${language}.
Para o termo fornecido, responda no formato JSON estruturado conforme o schema definido.
Preencha todos os campos com conteúdo coerente, didático e factual.
- LIMITE o contexto de resposta à área de conhecimento "${area}". Interprete o termo exclusivamente sob a perspectiva desta área; quando o termo tiver significados em outras áreas, priorize a interpretação desta área.
- Use "example.language" = "text" quando não houver código de programação (definições gerais); caso contrário indique a linguagem (tsx, js, html, etc.).
- "concept" deve ter 3 parágrafos e "commonMistakes" pelo menos 2 itens.
- Responda apenas com dados no schema.`;
}

const termSchema: Schema = {
  type: Type.OBJECT,
  description: "Verbetes de dicionário para um termo",
  properties: {
    term: { type: Type.STRING, description: "Nome do termo consultado." },
    categories: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Categorias/áreas de conhecimento do termo.",
    },
    quickAnswer: {
      type: Type.STRING,
      description: "Resposta curta e direta em uma frase.",
    },
    concept: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Três parágrafos explicando o conceito em detalhe.",
    },
    example: {
      type: Type.OBJECT,
      properties: {
        language: {
          type: Type.STRING,
          description:
            '"text" quando não há código, senão a linguagem (tsx, js, html).',
        },
        code: { type: Type.STRING, description: "Código de exemplo." },
        description: {
          type: Type.STRING,
          description: "Descrição breve do exemplo.",
        },
      },
      required: ["language", "code", "description"],
    },
    whenToUse: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Situações em que o termo se aplica.",
    },
    whenToAvoid: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Situações em que o termo deve ser evitado.",
    },
    commonMistakes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          mistake: { type: Type.STRING, description: "Erro comum." },
          correction: {
            type: Type.STRING,
            description: "Correção para o erro.",
          },
        },
        required: ["mistake", "correction"],
      },
    },
    relatedTerms: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Termos relacionados.",
    },
  },
  required: [
    "term",
    "categories",
    "quickAnswer",
    "concept",
    "example",
    "whenToUse",
    "whenToAvoid",
    "commonMistakes",
    "relatedTerms",
  ],
};

export async function fetchTermData(
  term: string,
  context: { area: string; language: string },
): Promise<TermData> {
  const api = getGeminiClient();
  if (!api) {
    throw new Error(
      "API do Gemini não configurada. Defina VITE_GEMINI_API_KEY no arquivo .env.",
    );
  }

  const response = await api.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${buildSystemPrompt(
      context.area,
      context.language,
    )}\n\nTermo a definir: "${term}".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: termSchema,
      temperature: 0.7,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Resposta vazia do Gemini.");
  }

  const parsed = JSON.parse(text) as Partial<TermData>;

  return {
    term: parsed.term || term,
    categories: parsed.categories ?? [term],
    quickAnswer: parsed.quickAnswer ?? "",
    concept: parsed.concept ?? [],
    example: parsed.example,
    whenToUse: parsed.whenToUse ?? [],
    whenToAvoid: parsed.whenToAvoid ?? [],
    commonMistakes: parsed.commonMistakes ?? [],
    relatedTerms: parsed.relatedTerms ?? [],
  };
}
