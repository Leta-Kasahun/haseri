"use client";

import { useState } from "react";
import { paymentsApi } from "../services";
import type { PaymentResponse } from "../types";

export const useJobPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiateJobPayment = async (jobData: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await paymentsApi.initiateJobPayment(jobData);
      const data = res.data.data;
      
      if (data?.status === 'error' || data?.status === 'failed') {
        setError(data?.message || "Chapa payment initiation failed");
        return false;
      }

      const checkoutUrl = 
        data?.checkout_url || 
        data?.checkoutUrl || 
        data?.url || 
        data?.data?.checkout_url || 
        data?.data?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return true;
      }

      setError("No checkout URL received from payment gateway");
      return false;
    } catch (err: any) {
      // Handle custom error structure from clientApi interceptor
      const message = err.message || "Payment initiation failed";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const confirmJobPayment = async (txRef?: string | null, jobId?: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const res = await paymentsApi.confirmJobPayment(txRef, jobId);
      return res.data.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Payment confirmation failed";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { initiateJobPayment, confirmJobPayment, loading, error };
};
