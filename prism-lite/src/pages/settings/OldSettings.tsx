import { useMemo, useState } from "react";
import { track } from "@/lib/analytics";

type SaveStatus = "idle" | "saving" | "success" | "error";
type Role = "Viewer" | "Editor" | "Admin";

export default function OldSettings() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [defaultRole, setDefaultRole] = useState<Role>("Viewer");
  const [allowInvites, setAllowInvites] = useState(true);

  const [status, setStatus] = useState<SaveStatus>("idle");
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const e: { workspaceName?: string } = {};
    if (!workspaceName.trim()) e.workspaceName = "Workspace name is required.";
    if (workspaceName.trim().length > 40)
      e.workspaceName = "Keep the name under 40 characters.";
    return e;
  }, [workspaceName]);

  const canSave = Object.keys(errors).length === 0 && status !== "saving";

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);

    if (!canSave) {
      // old UI: no clear inline feedback except a status line
      setStatus("error");
      track("settings_saved", {
        ui: "old",
        success: false,
        reason: "validation",
      });
      return;
    }

    try {
      setStatus("saving");

      // old UI: tracks success immediately (a bit wrong, intentionally)
      track("settings_saved", { ui: "old", success: true });

      await new Promise((res) => setTimeout(res, 900));

      setStatus("success");
      // old UI: keeps success message visible longer
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      track("settings_saved", {
        ui: "old",
        success: false,
        reason: "exception",
      });
    }
  }

  return (
    <div
      style={{
        padding: 18,
        fontFamily: "Georgia, serif",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          marginBottom: 10,
          padding: "6px 8px",
          border: "2px dotted #999",
          background: "#fff",
          color: "#444",
          fontSize: 12,
        }}
      >
        Old UI (intentionally inconsistent / legacy)
      </div>

      <div
        style={{ background: "#fff", border: "1px solid #cfcfcf", padding: 12 }}
      >
        <h1 style={{ marginTop: 0, marginBottom: 6, fontSize: 26 }}>
          Settings
        </h1>
        <p style={{ color: "#888", marginTop: 0, fontSize: 13 }}>
          Legacy settings form with inconsistent patterns.
        </p>

        {/* Clunky global status line */}
        <div
          style={{
            marginTop: 10,
            padding: 10,
            borderRadius: 2,
            background: "#fffbe6", // same for success/error (confusing)
            border: "1px solid #e0d48a",
            color: "#333",
            fontSize: 13,
            display: status === "idle" ? "none" : "block",
          }}
        >
          {status === "saving" && <strong>Saving…</strong>}
          {status === "success" && <strong>Saved (maybe).</strong>}
          {status === "error" && <strong>Could not save.</strong>}
        </div>

        <form
          onSubmit={onSave}
          style={{ display: "grid", gap: 12, marginTop: 12 }}
        >
          {/* Workspace name: inconsistent validation (text error, but no red border) */}
          <div style={{ display: "grid", gap: 4 }}>
            <label
              htmlFor="workspaceName"
              style={{ fontWeight: 600, fontSize: 12 }}
            >
              Workspace name
            </label>
            <input
              id="workspaceName"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Acme Inc."
              style={{
                padding: "8px 8px",
                borderRadius: 2,
                border: "2px solid #ddd",
                outline: "none",
                fontSize: 13,
              }}
            />
            {touched && errors.workspaceName && (
              <div style={{ color: "#b00020", fontSize: 12 }}>
                {errors.workspaceName}
              </div>
            )}
          </div>

          {/* Default role: different shape and background */}
          <div style={{ display: "grid", gap: 4 }}>
            <label
              htmlFor="defaultRole"
              style={{ fontWeight: 600, fontSize: 12 }}
            >
              Default role
            </label>
            <select
              id="defaultRole"
              value={defaultRole}
              onChange={(e) => setDefaultRole(e.target.value as Role)}
              style={{
                padding: "6px 8px",
                borderRadius: 16,
                border: "1px solid #aaa",
                background: "#f2f2f2",
                height: 32,
                fontSize: 13,
                width: 220,
              }}
            >
              <option value="Viewer">Viewer</option>
              <option value="Editor">Editor</option>
              <option value="Admin">Admin</option>
            </select>
            <div style={{ color: "#999", fontSize: 12 }}>
              (Hard to understand)
            </div>
          </div>

          {/* Checkbox: mismatched spacing */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={allowInvites}
              onChange={(e) => setAllowInvites(e.target.checked)}
            />
            <span style={{ fontSize: 13, color: "#333" }}>Allow invites</span>
          </div>

          {/* Buttons: inconsistent (primary blue small + cancel link) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setWorkspaceName("");
                setDefaultRole("Viewer");
                setAllowInvites(true);
                setTouched(false);
                setStatus("idle");
                track("settings_reset", { ui: "old" });
              }}
              style={{
                padding: 0,
                border: "none",
                background: "transparent",
                color: "#1b66ff",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={!canSave}
              style={{
                padding: "6px 10px",
                borderRadius: 3,
                border: "1px solid #1b66ff",
                background: canSave ? "#1b66ff" : "#9bbcff",
                color: "white",
                cursor: canSave ? "pointer" : "not-allowed",
                height: 30,
                fontSize: 13,
              }}
            >
              {status === "saving" ? "Saving..." : "Save"}
            </button>
          </div>

          {/* Old UI footer note */}
          <div style={{ marginTop: 6, fontSize: 11, color: "#999" }}>
            In the New UI, form fields + errors + actions look consistent across
            pages.
          </div>
        </form>
      </div>
    </div>
  );
}
