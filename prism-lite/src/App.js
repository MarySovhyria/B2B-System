import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes, Navigate } from "react-router-dom";
import Users from "@/pages/users/Users";
import Settings from "@/pages/settings/Settings";
import { usePageViews } from "@/lib/usePageViews";
import { Link, useLocation } from "react-router-dom";
var linkStyle = function (_a) {
    var isActive = _a.isActive;
    return ({
        padding: "8px 12px",
        borderRadius: 8,
        textDecoration: "none",
        color: isActive ? "white" : "#111",
        background: isActive ? "#111" : "transparent",
    });
};
function VariantLink(_a) {
    var to = _a.to, children = _a.children;
    var location = useLocation();
    // Parse "to" into pathname + search
    var url = new URL(to, "http://dummy"); // dummy base needed for URL()
    var active = location.pathname === url.pathname && location.search === url.search;
    return (_jsx(Link, { to: to, style: {
            padding: "8px 12px",
            borderRadius: 8,
            textDecoration: "none",
            color: active ? "white" : "#111",
            background: active ? "#111" : "transparent",
        }, children: children }));
}
export default function App() {
    usePageViews();
    return (_jsxs("div", { style: {
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            minHeight: "100vh",
        }, children: [_jsxs("aside", { style: { padding: 16, borderRight: "1px solid #eee" }, children: [_jsx("div", { style: { fontWeight: 700, marginBottom: 12 }, children: "Prism-lite" }), _jsxs("nav", { style: { display: "grid", gap: 8 }, children: [_jsx(VariantLink, { to: "/users?ui=old", children: "Users (Old)" }), _jsx(VariantLink, { to: "/users?ui=new", children: "Users (New)" }), _jsx(VariantLink, { to: "/settings?ui=old", children: "Settings (Old)" }), _jsx(VariantLink, { to: "/settings?ui=new", children: "Settings (New)" })] })] }), _jsx("main", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/users", replace: true }) }), _jsx(Route, { path: "/users", element: _jsx(Users, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) }), _jsx(Route, { path: "*", element: _jsx("div", { style: { padding: 24 }, children: "Not found" }) })] }) })] }));
}
