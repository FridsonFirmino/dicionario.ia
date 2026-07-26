interface WhenToUseProps {
  whenToUse: string[];
  whenToAvoid: string[];
}

export function WhenToUse({ whenToUse, whenToAvoid }: WhenToUseProps) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
        Quando usar / evitar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50">
          <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-500 mb-3 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            Usar quando
          </h3>
          <ul className="space-y-2">
            {whenToUse.map((item, i) => (
              <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                <span className="text-zinc-300 dark:text-zinc-600 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50">
          <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-500 mb-3 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Evitar quando
          </h3>
          <ul className="space-y-2">
            {whenToAvoid.map((item, i) => (
              <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                <span className="text-zinc-300 dark:text-zinc-600 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
