interface RelatedTermsProps {
  terms: string[];
  onSearch: (term: string) => void;
}

export function RelatedTerms({ terms, onSearch }: RelatedTermsProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
        Explore também
      </h2>
      <div className="flex flex-wrap gap-2">
        {terms.map((term) => (
          <button
            key={term}
            onClick={() => onSearch(term)}
            className="px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </section>
  );
}
