import { useState, useEffect } from "react";
import { publicApi } from "@/src/features/public/services/public.api";

interface SearchSuggestions {
  categories: Array<{ id: number; name: string }>;
  jobs: Array<{ id: number; title: string }>;
  technicians: Array<{ id: number; first_name: string; last_name: string }>;
}

export const useSearchSuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestions | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        try {
          const res = await publicApi.getSearchSuggestions(query);
          setSuggestions(res.data?.data || res.data || null);
          setShowDropdown(true);
        } catch (err) {
          console.error("Search suggestions error:", err);
          setSuggestions(null);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions(null);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { suggestions, loading, showDropdown, setShowDropdown };
};
