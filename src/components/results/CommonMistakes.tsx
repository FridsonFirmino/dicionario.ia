interface CommonMistakesProps {
  mistakes: { mistake: string; correction: string }[];
}

export function CommonMistakes({ mistakes }: CommonMistakesProps) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-zinc-400">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
        </svg>
        Erros comuns e pegadinhas
      </h2>
      <div className="space-y-4">
        {mistakes.map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50"
          >
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <span className="text-zinc-400 dark:text-zinc-500 mr-1">!</span>
              {item.mistake}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {item.correction}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
