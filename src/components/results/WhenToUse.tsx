import { Check, TriangleAlert } from 'lucide-react';

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
            <Check size={16} />
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
            <TriangleAlert size={16} />
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
