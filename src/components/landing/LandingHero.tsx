import { SearchBar } from "../search/SearchBar";
import { SearchExamples } from "../search/SearchExamples";
import { Logo } from "../ui/Logo";

interface LandingHeroProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: (value: string) => void;
}

export function LandingHero({
  query,
  onQueryChange,
  onSearch,
}: LandingHeroProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
      <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 sm:px-6 mb-8 gap-8 -mt-20">
        <Logo size="lg" />

        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
          O teu dicionário de conhecimento, pronto para te ajudar a entender
          qualquer coisa em segundos.
        </p>

        <div className="w-full">
          <SearchBar
            value={query}
            onChange={onQueryChange}
            onSubmit={onSearch}
            size="large"
          />
        </div>

        <SearchExamples onSelect={onSearch} />
      </div>
    </div>
  );
}
