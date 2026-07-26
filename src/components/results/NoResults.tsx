interface NoResultsProps {
  term: string;
}

export function NoResults({ term }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6 text-zinc-400"
        >
          <path
            fillRule="evenodd"
            d="M4.5 2A2.5 2.5 0 002 4.5v3.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 2H4.5zM5 6a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
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
