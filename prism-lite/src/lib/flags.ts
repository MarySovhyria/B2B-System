import { useEffect, useState } from "react";
import { posthog } from "@/lib/posthog";

export function useNewPrismUIFlag() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    // initial value (may be false until flags load)
    return !!posthog.isFeatureEnabled("new_prism_ui");
  });

  useEffect(() => {
    // When flags load/refresh, update state
    const unsubscribe = posthog.onFeatureFlags(() => {
      setEnabled(!!posthog.isFeatureEnabled("new_prism_ui"));
    });

    return () => {
      // posthog-js returns a cleanup function in newer versions
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  return enabled;
}
