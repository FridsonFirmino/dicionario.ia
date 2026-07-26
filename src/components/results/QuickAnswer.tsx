interface QuickAnswerProps {
  text: string;
}

export function QuickAnswer({ text }: QuickAnswerProps) {
  return (
    <div className="mb-8 p-4 -mx-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50">
      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 block">
        Em uma frase
      </span>
      <p className="text-base md:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        {text}
      </p>
    </div>
  );
}
