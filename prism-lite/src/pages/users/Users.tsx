import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import OldUsers from "./OldUsers";
import NewUsers from "./NewUsers";
import { useNewPrismUIFlag } from "@/lib/flags";

export default function Users() {
  const location = useLocation();
  const flagEnabled = useNewPrismUIFlag(); // if you’re not using flags yet, set this to false

  const override = useMemo(() => {
    const ui = new URLSearchParams(location.search).get("ui"); // "new" | "old" | null
    if (ui === "new") return "new";
    if (ui === "old") return "old";
    return null;
  }, [location.search]);

  const useNew = override ? override === "new" : flagEnabled;

  return useNew ? <NewUsers /> : <OldUsers />;
}
