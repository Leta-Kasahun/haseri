"use client";

import { useEffect, useState, useCallback } from "react";
import { providersApi } from "../services";

const normalizeSkills = (input: unknown): string[] => {
  if (Array.isArray(input)) {
    return input
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object") {
          const maybeName = (item as any).skill_name ?? (item as any).name ?? (item as any).title;
          return typeof maybeName === "string" ? maybeName : null;
        }
        return null;
      })
      .filter((value): value is string => Boolean(value));
  }
  
  if (input && typeof input === "object" && "skills" in input) {
    return normalizeSkills((input as any).skills);
  }

  return [];
};

export const useProviderSkills = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const res = await providersApi.getSkills();
      const data = res.data?.data ?? res.data?.skills ?? res.data;
      setSkills(normalizeSkills(data));
    } catch {
      setSkills([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Re-syncing dependency array to [fetchSkills] to resolve HMR state conflict.
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { skills, loading, refresh: fetchSkills };
};
