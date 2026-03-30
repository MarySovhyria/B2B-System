import { useMemo, useState } from "react";

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

export default function Users() {
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
    setMessage(null);

    if (inviteEmailError) {
      setMessage({ type: "error", text: inviteEmailError });
      return;
    }

    try {
      setSubmitting(true);

      // Fake request delay
      await new Promise((res) => setTimeout(res, 600));

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

      setMessage({ type: "success", text: "Invite sent." });
      setTimeout(() => setMessage(null), 1500);
    } catch {
      setMessage({ type: "error", text: "Invite failed. Try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Users</h1>
          <p style={{ marginTop: 8, color: "#555" }}>
            Manage access to your workspace.
          </p>
        </div>

        <button
          onClick={() => setInviteOpen(true)}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #111",
            background: "#111",
            color: "white",
            cursor: "pointer",
            height: 40,
          }}
        >
          Invite user
        </button>
      </div>

      {message && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 12px",
            borderRadius: 10,
            background: message.type === "success" ? "#e8f7ee" : "#fdecec",
            border:
              message.type === "success"
                ? "1px solid #bfe8cc"
                : "1px solid #f2b8b8",
            color: "#111",
            maxWidth: 520,
          }}
        >
          {message.text}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginTop: 16,
          flexWrap: "wrap",
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name or email…"
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ccc",
            width: 320,
          }}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as any)}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #ccc",
            background: "white",
          }}
        >
          <option value="All">All roles</option>
          <option value="Viewer">Viewer</option>
          <option value="Editor">Editor</option>
          <option value="Admin">Admin</option>
        </select>

        <div style={{ color: "#666" }}>
          Showing <strong>{filtered.length}</strong> of{" "}
          <strong>{users.length}</strong>
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          border: "1px solid #eee",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fafafa" }}>
              {["Name", "Email", "Role", "Status"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "12px 14px",
                    fontSize: 13,
                    color: "#555",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: 18, color: "#666" }}>
                  No users match your search.
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id}>
                  <td
                    style={{
                      padding: "12px 14px",
                      borderBottom: "1px solid #f2f2f2",
                    }}
                  >
                    {u.name}
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      borderBottom: "1px solid #f2f2f2",
                    }}
                  >
                    {u.email}
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      borderBottom: "1px solid #f2f2f2",
                    }}
                  >
                    {u.role}
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      borderBottom: "1px solid #f2f2f2",
                    }}
                  >
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 999,
                        fontSize: 12,
                        border: "1px solid #ddd",
                        background:
                          u.status === "Active" ? "#eef7ff" : "#fff6e5",
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

      {/* Basic modal (later replace with your UI Modal component) */}
      {inviteOpen && (
        <div
          onMouseDown={() => setInviteOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            style={{
              width: "100%",
              maxWidth: 520,
              background: "white",
              borderRadius: 14,
              padding: 16,
              border: "1px solid #eee",
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
                <div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>
                  They’ll receive an email invitation.
                </div>
              </div>

              <button
                onClick={() => setInviteOpen(false)}
                style={{
                  border: "1px solid #ddd",
                  background: "white",
                  borderRadius: 10,
                  padding: "8px 10px",
                  cursor: "pointer",
                  height: 36,
                }}
              >
                Close
              </button>
            </div>

            <form
              onSubmit={submitInvite}
              style={{ display: "grid", gap: 12, marginTop: 14 }}
            >
              <div style={{ display: "grid", gap: 6 }}>
                <label style={{ fontWeight: 600 }} htmlFor="inviteName">
                  Name (optional)
                </label>
                <input
                  id="inviteName"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Jane Doe"
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <label style={{ fontWeight: 600 }} htmlFor="inviteEmail">
                  Email
                </label>
                <input
                  id="inviteEmail"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="jane@acme.com"
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: inviteEmailError
                      ? "1px solid #d33"
                      : "1px solid #ccc",
                  }}
                />
                {inviteEmailError && (
                  <div style={{ color: "#d33", fontSize: 13 }}>
                    {inviteEmailError}
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <label style={{ fontWeight: 600 }} htmlFor="inviteRole">
                  Role
                </label>
                <select
                  id="inviteRole"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as Role)}
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
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 10,
                  marginTop: 4,
                }}
              >
                <button
                  type="button"
                  onClick={() => setInviteOpen(false)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid #111",
                    background: submitting ? "#777" : "#111",
                    color: "white",
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? "Sending..." : "Send invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
