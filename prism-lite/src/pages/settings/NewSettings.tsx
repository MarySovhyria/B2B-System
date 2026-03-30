import { useMemo, useState, type FormEvent } from "react";
import { Button, Input, useToast } from "@/ui";
import { track } from "@/lib/analytics";

type Role = "Viewer" | "Editor" | "Admin";
type SaveStatus = "idle" | "saving";

export default function NewSettings() {
  const ui = "new";
  const { push } = useToast();

  const [workspaceName, setWorkspaceName] = useState("");
  const [defaultRole, setDefaultRole] = useState<Role>("Viewer");
  const [allowInvites, setAllowInvites] = useState(true);

  const [status, setStatus] = useState<SaveStatus>("idle");
  const [touched, setTouched] = useState(false);

  const workspaceNameError = useMemo(() => {
    const v = workspaceName.trim();
    if (!touched) return null;
    if (!v) return "Workspace name is required.";
    if (v.length > 40) return "Keep the name under 40 characters.";
    return null;
  }, [workspaceName, touched]);

  const canSave = !workspaceNameError && status !== "saving";

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setTouched(true);

    if (!canSave) {
      track("settings_saved", { ui, success: false, reason: "validation" });
      push({
        type: "error",
        message: "Please fix the form errors before saving.",
      });
      return;
    }

    try {
      setStatus("saving");

      // fake API
      await new Promise((res) => setTimeout(res, 800));

      track("settings_saved", { ui, success: true });
      push({ type: "success", message: "Settings saved." });
    } catch {
      track("settings_saved", { ui, success: false, reason: "exception" });
      push({ type: "error", message: "Failed to save settings." });
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <h1 style={{ marginTop: 0 }}>Settings</h1>
      <form onSubmit={onSave} style={{ display: "grid", gap: 16 }}>
        <Input
          id="workspaceName"
          label="Workspace name"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Acme Inc."
          error={workspaceNameError}
          hint={
            !workspaceNameError
              ? "This name appears in the header and invites."
              : undefined
          }
        />

        <div style={{ display: "grid", gap: 6 }}>
          <label htmlFor="defaultRole" style={{ fontWeight: 600 }}>
            Default role
          </label>

          <select
            id="defaultRole"
            value={defaultRole}
            onChange={(e) => setDefaultRole(e.target.value as Role)}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ccc",
              background: "white",
              height: 42,
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
          <Button
            type="submit"
            loading={status === "saving"}
            disabled={!canSave}
          >
            Save changes
          </Button>

          {/* Secondary action just to show consistent variants */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setWorkspaceName("");
              setDefaultRole("Viewer");
              setAllowInvites(true);
              setTouched(false);
              track("settings_reset", { ui });
              push({ type: "info", message: "Reset form." });
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
