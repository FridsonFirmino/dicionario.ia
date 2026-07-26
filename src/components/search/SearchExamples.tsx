import { defaultExamples } from "../../data/mockData";

interface SearchExamplesProps {
  onSelect: (term: string) => void;
}

export function SearchExamples({ onSelect }: SearchExamplesProps) {
  return (
    <div className="flex flex-col items-center gap-3 mt-8">
      <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
        Experimente pesquisar por:
      </span>
      <div className="flex flex-wrap items-center justify-center mt-4 gap-2">
        {defaultExamples.map((term) => (
          <button
            key={term}
            onClick={() => onSelect(term)}
            className="px-3 py-1.5 text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 rounded-full transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
