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

  const height = size === "large" ? "h-12 md:h-13" : "h-12";
  const textSize =
    size === "large" ? "text-base md:text-base" : "text-sm md:text-base";

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div
        className={`relative flex items-center ${height} w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm transition-all duration-200 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 focus-within:shadow-md focus-within:shadow-zinc-900/5 dark:focus-within:shadow-black/20`}
      >
        <span className="pl-4 pr-2 text-zinc-400 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
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
            <svg
              className="animate-spin w-5 h-5 text-zinc-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}

        <div className="flex items-center gap-1 pr-3 shrink-0 justify-end">
          {value && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
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
