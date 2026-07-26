import { LandingHero } from "./components/landing/LandingHero";
import { Navbar } from "./components/layout/Navbar";
import { ErrorState } from "./components/results/ErrorState";
import { InstantAnswer } from "./components/results/InstantAnswer";
import { NoResults } from "./components/results/NoResults";
import { SearchBar } from "./components/search/SearchBar";
import { LoadingSkeleton } from "./components/ui/Skeleton";
import { useSearch } from "./hooks/useSearch";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const {
    query,
    setQuery,
    status,
    result,
    searchedTerm,
    search,
    reset,
    retry,
  } = useSearch();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-zinc-800 dark:text-zinc-200 transition-colors duration-200">
      <Navbar theme={theme} onToggleTheme={toggleTheme} onLogoClick={reset} />

      <main>
        {status === "idle" && (
          <LandingHero
            query={query}
            onQueryChange={setQuery}
            onSearch={search}
          />
        )}

        {(status === "searching" ||
          status === "results" ||
          status === "no-results" ||
          status === "error") && (
          <div className="pt-6 pb-8">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 mb-8">
              <SearchBar
                value={query}
                onChange={setQuery}
                onSubmit={search}
                onClear={reset}
                loading={status === "searching"}
              />
            </div>

            {status === "searching" && <LoadingSkeleton />}

            {status === "results" && result && (
              <InstantAnswer data={result} onSearch={search} />
            )}

            {status === "no-results" && <NoResults term={searchedTerm} />}

            {status === "error" && <ErrorState onRetry={retry} />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
