import { SearchX } from 'lucide-react';

interface NoResultsProps {
  term: string;
}

export function NoResults({ term }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
        <SearchX size={24} className="text-zinc-400" />
      </div>
      <h2 className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-2">
        Não encontramos uma resposta para &ldquo;{term}&rdquo;.
      </h2>
      <p className="text-sm text-zinc-400 dark:text-zinc-500 max-w-sm">
        Tente pesquisar usando outro termo ou uma expressão mais específica.
      </p>
    </div>
  );
}
