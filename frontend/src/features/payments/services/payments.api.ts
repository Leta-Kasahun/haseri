import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";

export const paymentsApi = {
  initiateCustomerVerification: () =>
    clientApi.post(API_ROUTES.CUSTOMER.VERIFY),
  initiateJobPayment: (data: any) =>
    clientApi.post(API_ROUTES.JOBS.PAY, data),

  confirmJobPayment: (txRef?: string | null, jobId?: string | null) =>
    clientApi.post(API_ROUTES.JOBS.PAY_CONFIRM, { tx_ref: txRef, job_id: jobId }),
};