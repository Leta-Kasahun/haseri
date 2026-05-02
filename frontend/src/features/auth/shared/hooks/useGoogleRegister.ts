"use client";

import { useEffect, useRef, useState } from "react";
import { env } from "@/src/config/env";
import { userAuthApi } from "@/src/features/auth/user/services";

type GooglePayload = {
  new_user?: boolean;
  user?: { id: string | number };
};

type UseGoogleRegisterOptions = {
  onNewUser: (userId: string | null) => void;
  onExistingUser: (user: unknown) => void;
};

declare global {
  interface Window {
    google?: any;
  }
}

export const useGoogleRegister = ({ onNewUser, onExistingUser }: UseGoogleRegisterOptions) => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const googleInitRef = useRef(false);
  const onNewUserRef = useRef(onNewUser);
  const onExistingUserRef = useRef(onExistingUser);

  useEffect(() => {
    onNewUserRef.current = onNewUser;
    onExistingUserRef.current = onExistingUser;
  }, [onExistingUser, onNewUser]);

  useEffect(() => {
    if (!env.GOOGLE_CLIENT_ID || typeof window === "undefined") return;

    const loadGoogleScript = () =>
      new Promise<void>((resolve, reject) => {
        if (document.querySelector("script[data-google-identity]")) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.dataset.googleIdentity = "true";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Google sign-in"));
        document.head.appendChild(script);
      });

    const initGoogle = async () => {
      try {
        await loadGoogleScript();
        if (!window.google?.accounts?.id || googleInitRef.current) return;

        window.google.accounts.id.initialize({
          client_id: env.GOOGLE_CLIENT_ID,
          callback: async (response: { credential?: string }) => {
            if (!response?.credential) {
              setGoogleLoading(false);
              setGoogleError("Google sign-in failed");
              return;
            }

            try {
              setGoogleError(null);
              const res = await userAuthApi.google({ id_token: response.credential });
              const payload = res.data.data as GooglePayload;

              if (payload?.new_user) {
                const userId = payload.user?.id ? String(payload.user.id) : null;
                onNewUserRef.current(userId);
                return;
              }

              if (payload?.user) {
                onExistingUserRef.current(payload.user);
                return;
              }

              setGoogleError("Google sign-in failed");
            } catch (err: any) {
              const message = err?.message || "Google sign-in failed";
              setGoogleError(message);
            } finally {
              setGoogleLoading(false);
            }
          },
        });

        googleInitRef.current = true;
        setGoogleReady(true);
      } catch (err: any) {
        const message = err?.message || "Google sign-in failed";
        setGoogleError(message);
      }
    };

    initGoogle();
  }, []);

  const handleGoogleLogin = () => {
    if (!env.GOOGLE_CLIENT_ID) {
      setGoogleError("Google sign-in is not configured");
      return;
    }

    if (!googleReady || !window.google?.accounts?.id) {
      setGoogleError("Google sign-in is not ready yet");
      return;
    }

    setGoogleError(null);
    setGoogleLoading(true);
    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        setGoogleLoading(false);
      }
    });
  };

  return { googleLoading, googleReady, googleError, handleGoogleLogin };
};
