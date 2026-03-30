import { useEffect, useState } from "react";
import { posthog } from "@/lib/posthog";
export function useNewPrismUIFlag() {
    var _a = useState(function () {
        // initial value (may be false until flags load)
        return !!posthog.isFeatureEnabled("new_prism_ui");
    }), enabled = _a[0], setEnabled = _a[1];
    useEffect(function () {
        // When flags load/refresh, update state
        var unsubscribe = posthog.onFeatureFlags(function () {
            setEnabled(!!posthog.isFeatureEnabled("new_prism_ui"));
        });
        return function () {
            // posthog-js returns a cleanup function in newer versions
            if (typeof unsubscribe === "function")
                unsubscribe();
        };
    }, []);
    return enabled;
}
