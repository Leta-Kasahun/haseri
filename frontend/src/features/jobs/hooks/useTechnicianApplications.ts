"use client";

import { useState, useCallback } from "react";
import { jobsApi } from "../services";
import type { JobApplication } from "../types";

export const useTechnicianApplications = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const fetchMyApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobsApi.getMyApplications();
      setApplications(res.data.data);
      return res.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch your applications");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteApplication = async (id: string) => {
    // This would need a backend endpoint, for now we simulate or use a generic one if exists
    // Assuming we might have a delete endpoint in the future
    setApplications(prev => prev.filter(app => app.id.toString() !== id));
    return true;
  };

  return { 
    applications, 
    loading, 
    error, 
    fetchMyApplications,
    deleteApplication 
  };
};
