import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import OldSettings from "./OldSettings";
import NewSettings from "./NewSettings";
import { useNewPrismUIFlag } from "@/lib/flags"; // optional if you're using PostHog flags

export default function Settings() {
  const location = useLocation();
  const flagEnabled = useNewPrismUIFlag(); // if you’re not using flags yet, set this to false

  const override = useMemo(() => {
    const ui = new URLSearchParams(location.search).get("ui"); // "new" | "old" | null
    if (ui === "new") return "new";
    if (ui === "old") return "old";
    return null;
  }, [location.search]);

  const useNew = override ? override === "new" : flagEnabled;

  return useNew ? <NewSettings /> : <OldSettings />;
}
