import { LandingHero } from "../components/landing/LandingHero";
import { ErrorState } from "../components/results/ErrorState";
import { InstantAnswer } from "../components/results/InstantAnswer";
import { NoResults } from "../components/results/NoResults";
import { SearchBar } from "../components/search/SearchBar";
import { SettingsPanel } from "../components/settings/SettingsPanel";
import { LoadingSkeleton } from "../components/ui/Skeleton";
import { useSearch } from "../hooks/useSearch";
import { useSettings } from "../hooks/useSettings";

export function Home() {
  const { language, setLanguage, area, setArea } = useSettings();
  const {
    query,
    setQuery,
    status,
    result,
    searchedTerm,
    source,
    search,
    reset,
    retry,
  } = useSearch(area, language);

  return (
    <>
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
              <InstantAnswer data={result} onSearch={search} source={source} />
            )}

            {status === "no-results" && <NoResults term={searchedTerm} />}

            {status === "error" && <ErrorState onRetry={retry} />}
          </div>
        )}
      </main>

      <SettingsPanel
        language={language}
        area={area}
        onLanguageChange={setLanguage}
        onAreaChange={setArea}
      />
    </>
  );
}
