import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  padding: "8px 12px",
  borderRadius: 8,
  textDecoration: "none",
  color: isActive ? "white" : "#111",
  background: isActive ? "#111" : "transparent",
});

export default function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        minHeight: "100vh",
      }}
    >
      <aside style={{ padding: 16, borderRight: "1px solid #eee" }}>
        <div style={{ fontWeight: 700, marginBottom: 12 }}>Prism-lite</div>
        <nav style={{ display: "grid", gap: 8 }}>
          <NavLink to="/users" style={linkStyle}>
            Users
          </NavLink>
          <NavLink to="/settings" style={linkStyle}>
            Settings
          </NavLink>
        </nav>
      </aside>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="*"
            element={<div style={{ padding: 24 }}>Not found</div>}
          />
        </Routes>
      </main>
    </div>
  );
}
