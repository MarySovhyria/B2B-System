import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import OldUsers from "./OldUsers";
import NewUsers from "./NewUsers";
// import { useNewPrismUIFlag } from "@/lib/flags"; // optional if you're using PostHog flags
import { useNewPrismUIFlag } from "../../lib/flags";
export default function Users() {
  var location = useLocation();
  var flagEnabled = useNewPrismUIFlag(); // if you’re not using flags yet, set this to false
  var override = useMemo(
    function () {
      var ui = new URLSearchParams(location.search).get("ui"); // "new" | "old" | null
      if (ui === "new") return "new";
      if (ui === "old") return "old";
      return null;
    },
    [location.search],
  );
  var useNew = override ? override === "new" : flagEnabled;
  return useNew ? _jsx(NewUsers, {}) : _jsx(OldUsers, {});
}
