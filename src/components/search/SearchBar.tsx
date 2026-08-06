import { LoaderCircle, Search, X } from "lucide-react";
import { useEffect, useRef, type FormEvent, type KeyboardEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  size?: "default" | "large";
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  loading = false,
  size = "default",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener(
      "keydown",
      handleKeyDown as unknown as EventListener,
    );
    return () =>
      document.removeEventListener(
        "keydown",
        handleKeyDown as unknown as EventListener,
      );
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSubmit(value.trim());
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
    onClear?.();
  };

  const height = size === "large" ? "h-12 md:h-14" : "h-12";
  const textSize =
    size === "large" ? "text-base md:text-base" : "text-sm md:text-base";

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="flex items-center justify-center mb-1">
        <span className="text-center text-[13px] text-zinc-400 dark:text-zinc-500">
          O Dicionario.IA pode conter imprecisões. Confirme informações
          importantes em outras fontes.
        </span>
      </div>
      <div
        className={`relative flex items-center ${height} w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm transition-all duration-200 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 focus-within:shadow-md focus-within:shadow-zinc-900/5 dark:focus-within:shadow-black/20`}
      >
        <span className="pl-4 pr-2 text-zinc-400 shrink-0">
          <Search size={20} />
        </span>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Pesquise uma palavra ou conceito..."
          className={`flex-1 bg-transparent border-none outline-none ${textSize} text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 px-2 min-w-0`}
          autoComplete="off"
          autoFocus={size === "large"}
        />

        {loading && (
          <span className="pr-2">
            <LoaderCircle size={20} className="animate-spin text-zinc-400" />
          </span>
        )}

        <div className="flex items-center gap-1 pr-3 shrink-0 w-[72px] justify-end">
          {value && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              <X size={20} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded-md font-mono">
            <span>⌘</span>
            <span>K</span>
          </kbd>
        </div>
      </div>
    </form>
  );
}
