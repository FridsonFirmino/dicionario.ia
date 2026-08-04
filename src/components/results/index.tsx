import type { TermData } from "../../types";
import { CommonMistakes } from "./CommonMistakes";
import { ConceptSection } from "./ConceptSection";
import { ExampleSection } from "./ExampleSection";
import { QuickAnswer } from "./QuickAnswer";
import { RelatedTerms } from "./RelatedTerms";
import { TermHeader } from "./TermHeader";
import { WhenToUse } from "./WhenToUse";

interface InstantAnswerProps {
  data: TermData;
  onSearch: (term: string) => void;
  source?: "mock" | "groq";
  contextArea: string;
}

export function InstantAnswer({
  data,
  onSearch,
  source,
  contextArea,
}: InstantAnswerProps) {
  return (
    <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      <div className="mb-3 text-xs font-medium flex flex-col gap-3 text-zinc-400 dark:text-zinc-500">
        {source === "groq" && (
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Conteúdo gerado por IA
          </span>
        )}
        <div className="flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <p>
            A área de conhecimento usada para gerar este conteúdo foi:{" "}
            {contextArea}
          </p>
        </div>
      </div>
      <TermHeader term={data.term} categories={data.categories} />

      <QuickAnswer text={data.quickAnswer} />

      <ConceptSection paragraphs={data.concept} />

      {data.example && (
        <ExampleSection
          language={data.example.language}
          code={data.example.code}
          description={data.example.description}
        />
      )}

      <WhenToUse whenToUse={data.whenToUse} whenToAvoid={data.whenToAvoid} />

      <CommonMistakes mistakes={data.commonMistakes} />

      <RelatedTerms terms={data.relatedTerms} onSearch={onSearch} />
    </article>
  );
}
