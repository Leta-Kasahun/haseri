"use client";

import { useEffect, useState } from "react";
import { publicApi } from "../services";

export const usePublicSkills = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await publicApi.getSkills();
        if (!ignore) setSkills(res.data?.data || res.data || []);
      } catch {
        if (!ignore) setSkills([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetch();
    return () => {
      ignore = true;
    };
  }, []);

  return { skills, loading };
};
