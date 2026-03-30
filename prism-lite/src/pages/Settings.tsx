import { useMemo, useState } from "react";

type SaveStatus = "idle" | "saving" | "success" | "error";

export default function Settings() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [defaultRole, setDefaultRole] = useState<"Viewer" | "Editor" | "Admin">(
    "Viewer",
  );
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

    if (!canSave) return;

    try {
      setStatus("saving");

      // Fake API call
      await new Promise((res) => setTimeout(res, 800));

      setStatus("success");

      // Optional: reset success state after a moment
      setTimeout(() => setStatus("idle"), 1500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <h1 style={{ marginTop: 0 }}>Settings</h1>
      <p style={{ color: "#555" }}>
        Basic settings form (later you’ll swap these controls for shared UI
        components).
      </p>

      <form onSubmit={onSave} style={{ display: "grid", gap: 16 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <label htmlFor="workspaceName" style={{ fontWeight: 600 }}>
            Workspace name
          </label>
          <input
            id="workspaceName"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Acme Inc."
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border:
                touched && errors.workspaceName
                  ? "1px solid #d33"
                  : "1px solid #ccc",
              outline: "none",
            }}
          />
          {touched && errors.workspaceName && (
            <div style={{ color: "#d33", fontSize: 13 }}>
              {errors.workspaceName}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label htmlFor="defaultRole" style={{ fontWeight: 600 }}>
            Default role
          </label>
          <select
            id="defaultRole"
            value={defaultRole}
            onChange={(e) => setDefaultRole(e.target.value as any)}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ccc",
              background: "white",
            }}
          >
            <option value="Viewer">Viewer</option>
            <option value="Editor">Editor</option>
            <option value="Admin">Admin</option>
          </select>
          <div style={{ color: "#666", fontSize: 13 }}>
            New users start with this role.
          </div>
        </div>

        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={allowInvites}
            onChange={(e) => setAllowInvites(e.target.checked)}
          />
          <span>Allow team members to invite users</span>
        </label>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            type="submit"
            disabled={!canSave}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #111",
              background: canSave ? "#111" : "#999",
              color: "white",
              cursor: canSave ? "pointer" : "not-allowed",
            }}
          >
            {status === "saving" ? "Saving..." : "Save changes"}
          </button>

          {status === "success" && (
            <span style={{ color: "green" }}>Saved</span>
          )}
          {status === "error" && (
            <span style={{ color: "#d33" }}>Failed to save</span>
          )}
        </div>
      </form>
    </div>
  );
}
