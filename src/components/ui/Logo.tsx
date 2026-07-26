interface LogoProps {
  size?: "sm" | "lg";
  onClick?: () => void;
}

export function Logo({ size = "sm", onClick }: LogoProps) {
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={`font-semibold tracking-tight select-none ${
        size === "lg" ? "text-5xl md:text-6xl" : "text-xl"
      } ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
    >
      Dicionário
      <span className="text-zinc-400 dark:text-zinc-500">.ia</span>
    </Component>
  );
}
