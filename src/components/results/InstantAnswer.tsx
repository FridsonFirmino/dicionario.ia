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
}

export function InstantAnswer({ data, onSearch }: InstantAnswerProps) {
  return (
    <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-16">
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
