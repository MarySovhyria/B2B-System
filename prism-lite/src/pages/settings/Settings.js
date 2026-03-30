import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import OldSettings from "./OldSettings";
import NewSettings from "./NewSettings";
import { useNewPrismUIFlag } from "@/lib/flags"; // optional if you're using PostHog flags
export default function Settings() {
    var location = useLocation();
    var flagEnabled = useNewPrismUIFlag(); // if you’re not using flags yet, set this to false
    var override = useMemo(function () {
        var ui = new URLSearchParams(location.search).get("ui"); // "new" | "old" | null
        if (ui === "new")
            return "new";
        if (ui === "old")
            return "old";
        return null;
    }, [location.search]);
    var useNew = override ? override === "new" : flagEnabled;
    return useNew ? _jsx(NewSettings, {}) : _jsx(OldSettings, {});
}
