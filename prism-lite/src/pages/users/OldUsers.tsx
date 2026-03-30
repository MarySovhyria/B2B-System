import { useMemo, useState } from "react";
import { track } from "../../lib/analytics";

type Role = "Viewer" | "Editor" | "Admin";
type Status = "Active" | "Invited";

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
};

function makeId() {
  return Math.random().toString(16).slice(2);
}

export default function OldUsers() {
  const [users, setUsers] = useState<User[]>([
    {
      id: makeId(),
      name: "Alex Johnson",
      email: "alex@acme.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: makeId(),
      name: "Sam Lee",
      email: "sam@acme.com",
      role: "Editor",
      status: "Active",
    },
    {
      id: makeId(),
      name: "Taylor Kim",
      email: "taylor@acme.com",
      role: "Viewer",
      status: "Invited",
    },
  ]);

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "All">("All");

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Viewer");
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const matchesQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      const matchesRole = roleFilter === "All" ? true : u.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [users, query, roleFilter]);

  const inviteEmailError = useMemo(() => {
    if (!inviteEmail.trim()) return "Email is required.";
    if (!inviteEmail.includes("@")) return "Enter a valid email.";
    return null;
  }, [inviteEmail]);

  async function submitInvite(e: React.FormEvent) {
    e.preventDefault();

    // Legacy UI: keeps old message visible until next action
    // (so we don’t clear it here)
    if (inviteEmailError) {
      setMessage({ type: "error", text: inviteEmailError });
      track("invite_submitted", {
        ui: "old",
        success: false,
        reason: "validation",
      });
      return;
    }

    try {
      setSubmitting(true);

      // (intentionally odd) we track success before the “API call”
      track("invite_submitted", { ui: "old", success: true });

      await new Promise((res) => setTimeout(res, 700));

      const newUser: User = {
        id: makeId(),
        name: inviteName.trim() || "Invited user",
        email: inviteEmail.trim(),
        role: inviteRole,
        status: "Invited",
      };

      setUsers((prev) => [newUser, ...prev]);

      // reset + close modal
      setInviteName("");
      setInviteEmail("");
      setInviteRole("Viewer");
      setInviteOpen(false);

      setMessage({ type: "success", text: "Invite sent (check email)." });

      // NOTE: no auto-dismiss on purpose
    } catch {
      setMessage({ type: "error", text: "Invite failed. Try again later." });
      track("invite_submitted", {
        ui: "old",
        success: false,
        reason: "exception",
      });
    } finally {
      setSubmitting(false);
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
      {/* Old UI banner */}
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
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          background: "#fff",
          border: "1px solid #cfcfcf",
          padding: 12,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 26, letterSpacing: "-0.3px" }}>
            Users
          </h1>
          <p style={{ marginTop: 6, color: "#777", fontSize: 13 }}>
            Manage access to your workspace.
          </p>
        </div>

        {/* Inconsistent CTA: small, sharp, blue */}
        <button
          onClick={() => {
            track("invite_opened", { ui: "old" });
            setInviteOpen(true);
          }}
          style={{
            padding: "6px 10px",
            borderRadius: 3,
            border: "1px solid #1b66ff",
            background: "#1b66ff",
            color: "white",
            cursor: "pointer",
            height: 30,
            fontSize: 13,
          }}
        >
          Invite user
        </button>
      </div>

      {/* Clunky message: same color for success/error, not dismissible */}
      {message && (
        <div
          style={{
            marginTop: 10,
            padding: 10,
            borderRadius: 2,
            background: "#fffbe6",
            border: "1px solid #e0d48a",
            color: "#333",
            maxWidth: 700,
            fontSize: 13,
          }}
        >
          <strong style={{ marginRight: 6 }}>
            {message.type === "success" ? "OK:" : "Error:"}
          </strong>
          {message.text}
        </div>
      )}

      {/* Filters box with inconsistent styling */}
      <div
        style={{
          marginTop: 12,
          background: "#fff",
          border: "1px solid #d0d0d0",
          padding: 10,
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          style={{
            padding: "6px 8px",
            borderRadius: 2,
            border: "2px solid #ddd",
            width: 260,
            fontSize: 13,
          }}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as any)}
          style={{
            padding: "6px 8px",
            borderRadius: 16,
            border: "1px solid #aaa",
            background: "#f2f2f2",
            height: 32,
            fontSize: 13,
          }}
        >
          <option value="All">All roles</option>
          <option value="Viewer">Viewer</option>
          <option value="Editor">Editor</option>
          <option value="Admin">Admin</option>
        </select>

        <div style={{ color: "#888", fontSize: 12 }}>
          Showing <strong>{filtered.length}</strong> of{" "}
          <strong>{users.length}</strong>
        </div>
      </div>

      {/* Table: heavier borders, cramped */}
      <div
        style={{ marginTop: 12, background: "#fff", border: "2px solid #ddd" }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#efefef" }}>
              {["Name", "Email", "Role", "Status"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "8px 10px",
                    fontSize: 12,
                    color: "#555",
                    borderBottom: "2px solid #d5d5d5",
                  }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{ padding: 12, color: "#999", fontStyle: "italic" }}
                >
                  Nothing here. Try a different search.
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id}>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {u.name}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {u.email}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {u.role}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {/* Status chip is inconsistent and low contrast */}
                    <span
                      style={{
                        padding: "2px 6px",
                        borderRadius: 4,
                        fontSize: 12,
                        background:
                          u.status === "Active" ? "#e9e9e9" : "#f1f1f1",
                        border: "1px solid #d8d8d8",
                        color: "#666",
                      }}
                    >
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Legacy modal: no click-outside close, no ESC, inconsistent controls */}
      {inviteOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "grid",
            placeItems: "center",
            padding: 16,
            zIndex: 20,
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            style={{
              width: "100%",
              maxWidth: 520,
              background: "#fff",
              borderRadius: 0, // harsh
              padding: 14,
              border: "3px solid #222",
              boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Invite user</div>
              </div>

              <button
                onClick={() => setInviteOpen(false)}
                style={{
                  border: "1px solid #999",
                  background: "#f3f3f3",
                  borderRadius: 0,
                  padding: "6px 8px",
                  cursor: "pointer",
                  height: 30,
                  fontSize: 12,
                }}
              >
                X
              </button>
            </div>

            <form
              onSubmit={submitInvite}
              style={{ display: "grid", gap: 10, marginTop: 12 }}
            >
              <div style={{ display: "grid", gap: 4 }}>
                <label
                  style={{ fontWeight: 600, fontSize: 12 }}
                  htmlFor="inviteName"
                >
                  Full name
                </label>
                <input
                  id="inviteName"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Jane Doe"
                  style={{
                    padding: "8px 8px",
                    borderRadius: 2,
                    border: "1px solid #bbb",
                    fontSize: 13,
                  }}
                />
              </div>

              <div style={{ display: "grid", gap: 4 }}>
                <label
                  style={{ fontWeight: 600, fontSize: 12 }}
                  htmlFor="inviteEmail"
                >
                  Email address
                </label>
                <input
                  id="inviteEmail"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="jane@acme.com"
                  style={{
                    padding: "8px 8px",
                    borderRadius: 2,
                    border: "1px solid #bbb", // intentionally NOT red even when invalid
                    fontSize: 13,
                  }}
                />
                {inviteEmailError && (
                  <div style={{ color: "#b00020", fontSize: 12 }}>
                    {inviteEmailError}
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gap: 4 }}>
                <label
                  style={{ fontWeight: 600, fontSize: 12 }}
                  htmlFor="inviteRole"
                >
                  Permission
                </label>
                <select
                  id="inviteRole"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as Role)}
                  style={{
                    padding: "8px 8px",
                    borderRadius: 2,
                    border: "2px solid #ddd",
                    background: "#fff",
                    height: 34,
                    fontSize: 13,
                  }}
                >
                  <option value="Viewer">Viewer</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                {/* Cancel as link-style, different from other buttons */}
                <button
                  type="button"
                  onClick={() => setInviteOpen(false)}
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
                  Cancel
                </button>

                {/* Submit as green pill, totally different style */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 999,
                    border: "none",
                    background: submitting ? "#9ad7a5" : "#22a447",
                    color: "white",
                    cursor: submitting ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {submitting ? "Sending..." : "Send invite"}
                </button>
              </div>
            </form>

            <div style={{ marginTop: 10, fontSize: 11, color: "#999" }}>
              In the New UI, modal + validation + feedback are consistent across
              pages.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
