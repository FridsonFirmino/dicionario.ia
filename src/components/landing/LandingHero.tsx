import { Target } from "lucide-react";
import { SearchBar } from "../search/SearchBar";
import { SearchExamples } from "../search/SearchExamples";
import { Logo } from "../ui/Logo";

interface LandingHeroProps {
  area: string;
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: (value: string) => void;
}

export function LandingHero({
  area,
  query,
  onQueryChange,
  onSearch,
}: LandingHeroProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 sm:px-6 mb-8 gap-8 -mt-20">
        <Logo size="lg" />

        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
          Pesquise qualquer termo ou expressão técnica e entenda{" "}
          <span className="text-zinc-700 dark:text-zinc-300 font-medium">
            pelo contexto certo
          </span>
        </p>

        <div className="w-full">
          <SearchBar
            value={query}
            onChange={onQueryChange}
            onSubmit={onSearch}
            size="large"
          />
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
          <Target size={14} />
          Área de conhecimento atual: {area}
        </div>

        <SearchExamples onSelect={onSearch} />
      </div>
    </div>
  );
}
