"use client";

import { useState, useCallback } from "react";
import { adminApi } from "../services";
import type { PendingVerification } from "../types";
import { toast } from "sonner";

export const useAdminVerifications = () => {
  const [verifications, setVerifications] = useState<PendingVerification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAllVerifications();
      setVerifications(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch verifications");
    } finally {
      setLoading(false);
    }
  }, []);

  const approve = async (id: number) => {
    try {
      await adminApi.approveVerification(id);
      toast.success("Technician approved successfully");
      await fetchAll();
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to approve technician");
      return false;
    }
  };

  const reject = async (id: number, reason: string) => {
    try {
      await adminApi.rejectVerification(id, reason);
      toast.success("Technician rejected");
      await fetchAll();
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reject technician");
      return false;
    }
  };

  return { verifications, loading, fetchAll, approve, reject };
};