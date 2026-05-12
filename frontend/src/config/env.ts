import { parseFrontendPublicEnv } from "../utils/validators/env.validator";
const parsedEnv = parseFrontendPublicEnv({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_BACKEND_ORIGIN: process.env.NEXT_PUBLIC_BACKEND_ORIGIN,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_PREFIX: process.env.NEXT_PUBLIC_API_PREFIX,
  NEXT_PUBLIC_API_TIMEOUT_MS: process.env.NEXT_PUBLIC_API_TIMEOUT_MS,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
} as NodeJS.ProcessEnv);
const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, "");
const appUrl = trimTrailingSlash(parsedEnv.NEXT_PUBLIC_BASE_URL || parsedEnv.NEXT_PUBLIC_APP_URL);
const backendOrigin = trimTrailingSlash(parsedEnv.NEXT_PUBLIC_BACKEND_ORIGIN);
const apiPrefix = parsedEnv.NEXT_PUBLIC_API_PREFIX.replace(/\/+$/, "");
export const env = {
  APP_URL: appUrl,
  BACKEND_ORIGIN: backendOrigin,
  API_PREFIX: apiPrefix,
  API_BASE_URL: parsedEnv.NEXT_PUBLIC_API_URL || `${backendOrigin}${apiPrefix}`,
  API_TIMEOUT_MS: parsedEnv.NEXT_PUBLIC_API_TIMEOUT_MS,
  APP_NAME: parsedEnv.NEXT_PUBLIC_APP_NAME,
  IS_PRODUCTION: process.env.NODE_ENV === "production",
} as const;

export type FrontendEnv = typeof env;