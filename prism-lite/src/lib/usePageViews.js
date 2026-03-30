import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track } from "./analytics";
export function usePageViews() {
    var location = useLocation();
    useEffect(function () {
        track("page_view", {
            path: location.pathname,
        });
    }, [location.pathname]);
}
