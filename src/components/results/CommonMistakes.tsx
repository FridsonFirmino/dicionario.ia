import { Info } from 'lucide-react';

interface CommonMistakesProps {
  mistakes: { mistake: string; correction: string }[];
}

export function CommonMistakes({ mistakes }: CommonMistakesProps) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4 flex items-center gap-2">
        <Info size={16} className="text-zinc-400" />
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
