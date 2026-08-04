import { useCallback, useState } from "react";
import { fetchTermData, isGroqConfigured } from "../services/groq";
import type { SearchStatus, TermData } from "../types";

export function useSearch(area: string, language: string) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [result, setResult] = useState<TermData | null>(null);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [source, setSource] = useState<"mock" | "groq">("mock");

  const search = useCallback(
    async (q: string) => {
      const term = q.trim();
      if (!term) return;

      setQuery(term);
      setSearchedTerm(term);
      setStatus("searching");

      if (!isGroqConfigured()) {
        setResult(null);
        setStatus("no-results");
        return;
      }

      try {
        const data = await fetchTermData(term, {
          area,
          language,
        });
        if (data) {
          setResult(data);
          setSource("groq");
          setStatus("results");
        } else {
          setResult(null);
          setStatus("no-results");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    },
    [area, language],
  );

  const reset = useCallback(() => {
    setQuery("");
    setStatus("idle");
    setResult(null);
    setSearchedTerm("");
  }, []);

  const retry = useCallback(() => {
    if (searchedTerm) search(searchedTerm);
  }, [searchedTerm, search]);

  return {
    query,
    setQuery,
    status,
    result,
    searchedTerm,
    source,
    search,
    reset,
    retry,
  };
}
