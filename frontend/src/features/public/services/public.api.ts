import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";

export const publicApi = {
  getTopTechnicians: () =>
    clientApi.get(API_ROUTES.PUBLIC.TOP_TECHNICIANS),

  getRecentJobs: () =>
    clientApi.get(API_ROUTES.PUBLIC.RECENT_JOBS),

  getHighPriceJobs: () =>
    clientApi.get(API_ROUTES.PUBLIC.HIGH_PRICE_JOBS),

  getStats: () =>
    clientApi.get(API_ROUTES.PUBLIC.STATS),

  getSkills: () =>
    clientApi.get(API_ROUTES.PUBLIC.SKILLS),

  getTechnicians: (skill?: string) =>
    clientApi.get(
      skill
        ? `${API_ROUTES.PUBLIC.TECHNICIANS}?skill=${encodeURIComponent(skill)}`
        : API_ROUTES.PUBLIC.TECHNICIANS
    ),

  getTechnician: (id: string) =>
    clientApi.get(API_ROUTES.PUBLIC.TECHNICIAN(id)),

  getSearchSuggestions: (query: string) =>
    clientApi.get(`${API_ROUTES.PUBLIC.SEARCH_SUGGESTIONS}?q=${query}`),
};