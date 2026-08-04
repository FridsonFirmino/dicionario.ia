import Groq from "groq-sdk";

import { z } from "zod";
import type { TermData } from "../types";

let client: Groq | null = null;

export function isGroqConfigured(): boolean {
  return Boolean(import.meta.env.VITE_GROQ_API_KEY);
}

export function getGroqClient(): Groq | null {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) return null;

  if (!client) {
    client = new Groq({ apiKey, dangerouslyAllowBrowser: true });
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
- "concept" deve ter 3 parágrafos curtos e "commonMistakes" pelo menos 2 itens. Seja conciso para caber no limite de tokens e preencha TODOS os campos do schema, inclusive "example", "whenToUse" e "relatedTerms".
- Responda apenas com dados no schema.`;
}

export const termSchema = z.object({
  term: z.string().describe("Nome do termo consultado."),
  categories: z
    .array(z.string())
    .describe("Categorias/áreas de conhecimento do termo."),
  quickAnswer: z.string().describe("Resposta curta e direta em uma frase."),
  concept: z
    .array(z.string())
    .describe("Três parágrafos explicando o conceito em detalhe."),
  example: z.object({
    language: z
      .string()
      .describe(
        '"text" quando não há código, senão a linguagem (tsx, js, html).',
      ),
    code: z.string().describe("Código de exemplo."),
    description: z.string().describe("Descrição breve do exemplo."),
  }),
  whenToUse: z
    .array(z.string())
    .describe("Situações em que o termo se aplica."),
  whenToAvoid: z
    .array(z.string())
    .describe("Situações em que o termo deve ser evitado."),
  commonMistakes: z.array(
    z.object({
      mistake: z.string().describe("Erro comum."),
      correction: z.string().describe("Correção para o erro."),
    }),
  ),
  relatedTerms: z.array(z.string()).describe("Termos relacionados."),
});

export type Term = z.infer<typeof termSchema>;

const termJsonSchema: Record<string, unknown> = {
  type: "object",
  description: "Verbetes de dicionário para um termo",
  additionalProperties: false,
  properties: {
    term: { type: "string", description: "Nome do termo consultado." },
    categories: {
      type: "array",
      items: { type: "string" },
      description: "Categorias/áreas de conhecimento do termo.",
    },
    quickAnswer: {
      type: "string",
      description: "Resposta curta e direta em uma frase.",
    },
    concept: {
      type: "array",
      items: { type: "string" },
      description: "Três parágrafos explicando o conceito em detalhe.",
    },
    example: {
      type: "object",
      additionalProperties: false,
      properties: {
        language: {
          type: "string",
          description:
            '"text" quando não há código, senão a linguagem (tsx, js, html).',
        },
        code: { type: "string", description: "Código de exemplo." },
        description: {
          type: "string",
          description: "Descrição breve do exemplo.",
        },
      },
      required: ["language", "code", "description"],
    },
    whenToUse: {
      type: "array",
      items: { type: "string" },
      description: "Situações em que o termo se aplica.",
    },
    whenToAvoid: {
      type: "array",
      items: { type: "string" },
      description: "Situações em que o termo deve ser evitado.",
    },
    commonMistakes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          mistake: { type: "string", description: "Erro comum." },
          correction: { type: "string", description: "Correção para o erro." },
        },
        required: ["mistake", "correction"],
      },
      description: "Erros comuns e suas correções.",
    },
    relatedTerms: {
      type: "array",
      items: { type: "string" },
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
  const groq = getGroqClient();

  if (!groq) {
    throw new Error(
      "API do Groq não configurada. Defina VITE_GROQ_API_KEY no arquivo .env.",
    );
  }

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    temperature: 0,
    max_completion_tokens: 4096,
    messages: [
      {
        role: "system",
        content: buildSystemPrompt(context.area, context.language),
      },
      { role: "user", content: `Termo a definir: "${term}".` },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "term_data",
        description: "Verbetes de dicionário para um termo",
        schema: termJsonSchema,
        strict: true,
      },
    },
  });

  const text = response.choices[0].message.content;
  if (!text) {
    throw new Error("Resposta vazia do Groq.");
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
