import { useCallback, useRef, useState } from "react";
import { mockData } from "../data/mockData";
import type { SearchStatus, TermData } from "../types";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [result, setResult] = useState<TermData | null>(null);
  const [searchedTerm, setSearchedTerm] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const search = useCallback((q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    setQuery(trimmed);
    setSearchedTerm(trimmed);
    setStatus("searching");

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const data = mockData[trimmed.toLowerCase()];
      if (data) {
        setResult(data);
        setStatus("results");
      } else {
        setResult(null);
        setStatus("no-results");
      }
    }, 800);
  }, []);

  const reset = useCallback(() => {
    setQuery("");
    setStatus("idle");
    setResult(null);
    setSearchedTerm("");
    if (timerRef.current) clearTimeout(timerRef.current);
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
    search,
    reset,
    retry,
  };
}
