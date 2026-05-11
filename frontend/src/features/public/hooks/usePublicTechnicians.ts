"use client";

import { useEffect, useState } from "react";
import { publicApi } from "../services";
import type { PublicTechnician } from "../types";

export const usePublicTechnicians = (skill?: string | null) => {
  const [technicians, setTechnicians] = useState<PublicTechnician[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await publicApi.getTechnicians(skill || undefined);
        if (!ignore) setTechnicians(res.data?.data || res.data || []);
      } catch {
        if (!ignore) setTechnicians([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetch();
    return () => {
      ignore = true;
    };
  }, [skill]);

  return { technicians, loading };
};
