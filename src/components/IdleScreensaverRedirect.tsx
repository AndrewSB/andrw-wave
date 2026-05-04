import { useRouter } from "next/router";
import React from "react";

const DEFAULT_IDLE_TIMEOUT_MS = 25_000;
const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
] as const;

type IdleScreensaverRedirectProps = {
  timeoutMs?: number;
};

export default function IdleScreensaverRedirect({
  timeoutMs = DEFAULT_IDLE_TIMEOUT_MS,
}: IdleScreensaverRedirectProps) {
  const router = useRouter();
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || router.pathname === "/pipes") {
      return;
    }

    const clearIdleTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };

    const startIdleTimer = () => {
      clearIdleTimer();
      timerRef.current = setTimeout(() => {
        router.push("/pipes");
      }, timeoutMs);
    };

    const handleActivity = () => {
      startIdleTimer();
    };

    startIdleTimer();
    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, handleActivity, { passive: true });
    });

    return () => {
      clearIdleTimer();
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, handleActivity);
      });
    };
  }, [router, router.pathname, timeoutMs]);

  return null;
}
