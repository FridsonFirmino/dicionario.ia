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
  source?: "mock" | "gemini";
}

export function InstantAnswer({ data, onSearch, source }: InstantAnswerProps) {
  return (
    <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      {source === "gemini" && (
        <div className="mb-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Gerado por inteligência artificial (Gemini)
        </div>
      )}
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
