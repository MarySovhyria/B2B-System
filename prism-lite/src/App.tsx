import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import Users from "@/pages/users/Users";
import Settings from "@/pages/settings/Settings";
import { usePageViews } from "@/lib/usePageViews";
import { Link, useLocation } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  padding: "8px 12px",
  borderRadius: 8,
  textDecoration: "none",
  color: isActive ? "white" : "#111",
  background: isActive ? "#111" : "transparent",
});

function VariantLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const location = useLocation();

  // Parse "to" into pathname + search
  const url = new URL(to, "http://dummy"); // dummy base needed for URL()
  const active =
    location.pathname === url.pathname && location.search === url.search;

  return (
    <Link
      to={to}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        textDecoration: "none",
        color: active ? "white" : "#111",
        background: active ? "#111" : "transparent",
      }}
    >
      {children}
    </Link>
  );
}

export default function App() {
  usePageViews();
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
          <VariantLink to="/users?ui=old">Users (Old)</VariantLink>
          <VariantLink to="/users?ui=new">Users (New)</VariantLink>
          <VariantLink to="/settings?ui=old">Settings (Old)</VariantLink>
          <VariantLink to="/settings?ui=new">Settings (New)</VariantLink>
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
