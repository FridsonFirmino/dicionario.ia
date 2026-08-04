import { useCallback, useState } from "react";
import { mockData } from "../data/mockData";
import { fetchTermData, isGroqConfigured } from "../services/groq";
import type { SearchStatus, TermData } from "../types";

export function useSearch(area: string, language: string) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [result, setResult] = useState<TermData | null>(null);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [source, setSource] = useState<"mock" | "groq">("mock");

  const search = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    setQuery(trimmed);
    setSearchedTerm(trimmed);
    setStatus("searching");

    const mock = mockData[trimmed.toLowerCase()];

    if (mock) {
      setResult(mock);
      setSource("mock");
      setStatus("results");
      return;
    }

    if (!isGroqConfigured()) {
      setResult(null);
      setStatus("no-results");
      return;
    }

    try {
      const data = await fetchTermData(trimmed, {
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
  }, [area, language]);

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
