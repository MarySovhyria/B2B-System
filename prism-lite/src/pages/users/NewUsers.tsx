import { useMemo, useState, type FormEvent } from "react";
import { Button, EmptyState, Input, Modal, useToast } from "../../ui";
import { track } from "../../lib/analytics";
import { SurveyPrompt } from "../../ui/SurveyPrompt";
import { useCallback } from "react";

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

export default function NewUsers() {
  const ui = "new"; // helpful for analytics comparisons
  const { push } = useToast();

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
  const [surveyOpen, setSurveyOpen] = useState(false);

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

  function openInvite() {
    track("invite_opened", { ui });
    setInviteOpen(true);
  }

  async function submitInvite(e: FormEvent) {
    e.preventDefault();

    if (inviteEmailError) {
      track("invite_submitted", { ui, success: false, reason: "validation" });
      push({ type: "error", message: inviteEmailError });
      return;
    }

    try {
      setSubmitting(true);

      // fake request delay
      await new Promise((res) => setTimeout(res, 600));

      const newUser: User = {
        id: makeId(),
        name: inviteName.trim() || "Invited user",
        email: inviteEmail.trim(),
        role: inviteRole,
        status: "Invited",
      };

      setUsers((prev) => [newUser, ...prev]);

      setInviteName("");
      setInviteEmail("");
      setInviteRole("Viewer");
      setInviteOpen(false);

      track("invite_submitted", { ui, success: true });
      push({ type: "success", message: "Invite sent." });

      track("survey_shown", { context: "invite", ui });
      setSurveyOpen(true);
    } catch {
      track("invite_submitted", { ui, success: false, reason: "exception" });
      push({ type: "error", message: "Invite failed. Try again." });
    } finally {
      setSubmitting(false);
    }
  }
  const closeInvite = useCallback(() => setInviteOpen(false), []);

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          alignItems: "flex-start",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Users</h1>
          <p style={{ marginTop: 8, color: "#555" }}>
            Manage access to your workspace.
          </p>
        </div>

        <Button onClick={openInvite}>Invite user</Button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "end",
          marginTop: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: 320 }}>
          <Input
            label="Search"
            value={query}
            onChange={(e) => {
              const v = e.target.value;
              setQuery(v);
              track("search_used", {
                ui,
                page: "users",
                query_length: v.length,
              });
            }}
            placeholder="Search name or email…"
          />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontWeight: 600 }}>Role</label>
          <select
            value={roleFilter}
            onChange={(e) => {
              const v = e.target.value as any;
              setRoleFilter(v);
              track("role_filter_changed", { ui, page: "users", role: v });
            }}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ccc",
              background: "white",
              height: 42,
            }}
          >
            <option value="All">All roles</option>
            <option value="Viewer">Viewer</option>
            <option value="Editor">Editor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div style={{ color: "#666", paddingBottom: 6 }}>
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
                <td colSpan={4}>
                  <EmptyState
                    title="No users found"
                    description="Try changing your search or role filter."
                  />
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
                    {u.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={inviteOpen}
        title="Invite user"
        description="They’ll receive an email invitation."
        onClose={closeInvite}
        footer={
          <>
            <Button variant="secondary" type="button" onClick={closeInvite}>
              Cancel
            </Button>
            <Button loading={submitting} type="submit" form="invite-form">
              Send invite
            </Button>
          </>
        }
      >
        <form
          id="invite-form"
          onSubmit={submitInvite}
          style={{ display: "grid", gap: 12 }}
        >
          <Input
            label="Name (optional)"
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            placeholder="Jane Doe"
          />

          <Input
            label="Email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="jane@acme.com"
            error={inviteEmailError}
          />

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontWeight: 600 }}>Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as Role)}
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
          </div>
        </form>
      </Modal>
      <SurveyPrompt
        open={surveyOpen}
        onClose={() => setSurveyOpen(false)}
        context="invite"
        ui="new"
      />
    </div>
  );
}
