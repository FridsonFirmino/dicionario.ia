interface TagProps {
  children: string;
  onClick?: () => void;
  variant?: "default" | "category";
}

export function Tag({ children, onClick, variant = "default" }: TagProps) {
  const base =
    "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full transition-colors select-none";

  const styles = {
    default:
      "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700",
    category:
      "bg-zinc-100 text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400",
  };

  const cls = `${base} ${styles[variant]} ${onClick ? "cursor-pointer" : ""}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={cls}>
        {children}
      </button>
    );
  }

  return <span className={cls}>{children}</span>;
}
