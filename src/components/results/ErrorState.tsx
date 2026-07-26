import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
        <AlertCircle size={24} className="text-zinc-400" />
      </div>
      <h2 className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-2">
        Não foi possível obter uma resposta agora.
      </h2>
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );
}
