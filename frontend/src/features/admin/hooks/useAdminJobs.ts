"use client";

import { useState, useCallback } from "react";
import { jobsApi } from "../../jobs/services";
import type { Job } from "../../jobs/types";
import { toast } from "react-hot-toast";

export const useAdminJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await jobsApi.adminGetAll();
      setJobs(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteJob = async (id: string) => {
    try {
      await jobsApi.adminDelete(id);
      toast.success("Job deleted successfully");
      fetchJobs();
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete job");
      return false;
    }
  };

  return { jobs, loading, fetchJobs, deleteJob };
};
