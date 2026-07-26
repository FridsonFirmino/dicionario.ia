interface ConceptSectionProps {
  paragraphs: string[];
}

export function ConceptSection({ paragraphs }: ConceptSectionProps) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
        Conceito
      </h2>
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] md:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
