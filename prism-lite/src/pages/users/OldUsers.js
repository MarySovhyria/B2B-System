var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { track } from "@/lib/analytics";
function makeId() {
    return Math.random().toString(16).slice(2);
}
export default function OldUsers() {
    var _a = useState([
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
    ]), users = _a[0], setUsers = _a[1];
    var _b = useState(""), query = _b[0], setQuery = _b[1];
    var _c = useState("All"), roleFilter = _c[0], setRoleFilter = _c[1];
    var _d = useState(false), inviteOpen = _d[0], setInviteOpen = _d[1];
    var _e = useState(""), inviteName = _e[0], setInviteName = _e[1];
    var _f = useState(""), inviteEmail = _f[0], setInviteEmail = _f[1];
    var _g = useState("Viewer"), inviteRole = _g[0], setInviteRole = _g[1];
    var _h = useState(false), submitting = _h[0], setSubmitting = _h[1];
    var _j = useState(null), message = _j[0], setMessage = _j[1];
    var filtered = useMemo(function () {
        var q = query.trim().toLowerCase();
        return users.filter(function (u) {
            var matchesQuery = !q ||
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q);
            var matchesRole = roleFilter === "All" ? true : u.role === roleFilter;
            return matchesQuery && matchesRole;
        });
    }, [users, query, roleFilter]);
    var inviteEmailError = useMemo(function () {
        if (!inviteEmail.trim())
            return "Email is required.";
        if (!inviteEmail.includes("@"))
            return "Enter a valid email.";
        return null;
    }, [inviteEmail]);
    function submitInvite(e) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
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
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        setSubmitting(true);
                        // (intentionally odd) we track success before the “API call”
                        track("invite_submitted", { ui: "old", success: true });
                        return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 700); })];
                    case 2:
                        _b.sent();
                        newUser_1 = {
                            id: makeId(),
                            name: inviteName.trim() || "Invited user",
                            email: inviteEmail.trim(),
                            role: inviteRole,
                            status: "Invited",
                        };
                        setUsers(function (prev) { return __spreadArray([newUser_1], prev, true); });
                        // reset + close modal
                        setInviteName("");
                        setInviteEmail("");
                        setInviteRole("Viewer");
                        setInviteOpen(false);
                        setMessage({ type: "success", text: "Invite sent (check email)." });
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        setMessage({ type: "error", text: "Invite failed. Try again later." });
                        track("invite_submitted", {
                            ui: "old",
                            success: false,
                            reason: "exception",
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        setSubmitting(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    return (_jsxs("div", { style: {
            padding: 18,
            fontFamily: "Georgia, serif",
            background: "#f5f5f5",
            minHeight: "100vh",
        }, children: [_jsx("div", { style: {
                    marginBottom: 10,
                    padding: "6px 8px",
                    border: "2px dotted #999",
                    background: "#fff",
                    color: "#444",
                    fontSize: 12,
                }, children: "Old UI (intentionally inconsistent / legacy)" }), _jsxs("div", { style: {
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    background: "#fff",
                    border: "1px solid #cfcfcf",
                    padding: 12,
                }, children: [_jsxs("div", { children: [_jsx("h1", { style: { margin: 0, fontSize: 26, letterSpacing: "-0.3px" }, children: "Users" }), _jsx("p", { style: { marginTop: 6, color: "#777", fontSize: 13 }, children: "Manage access to your workspace." })] }), _jsx("button", { onClick: function () {
                            track("invite_opened", { ui: "old" });
                            setInviteOpen(true);
                        }, style: {
                            padding: "6px 10px",
                            borderRadius: 3,
                            border: "1px solid #1b66ff",
                            background: "#1b66ff",
                            color: "white",
                            cursor: "pointer",
                            height: 30,
                            fontSize: 13,
                        }, children: "Invite user" })] }), message && (_jsxs("div", { style: {
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 2,
                    background: "#fffbe6",
                    border: "1px solid #e0d48a",
                    color: "#333",
                    maxWidth: 700,
                    fontSize: 13,
                }, children: [_jsx("strong", { style: { marginRight: 6 }, children: message.type === "success" ? "OK:" : "Error:" }), message.text] })), _jsxs("div", { style: {
                    marginTop: 12,
                    background: "#fff",
                    border: "1px solid #d0d0d0",
                    padding: 10,
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    flexWrap: "wrap",
                }, children: [_jsx("input", { value: query, onChange: function (e) { return setQuery(e.target.value); }, placeholder: "Search\u2026", style: {
                            padding: "6px 8px",
                            borderRadius: 2,
                            border: "2px solid #ddd",
                            width: 260,
                            fontSize: 13,
                        } }), _jsxs("select", { value: roleFilter, onChange: function (e) { return setRoleFilter(e.target.value); }, style: {
                            padding: "6px 8px",
                            borderRadius: 16,
                            border: "1px solid #aaa",
                            background: "#f2f2f2",
                            height: 32,
                            fontSize: 13,
                        }, children: [_jsx("option", { value: "All", children: "All roles" }), _jsx("option", { value: "Viewer", children: "Viewer" }), _jsx("option", { value: "Editor", children: "Editor" }), _jsx("option", { value: "Admin", children: "Admin" })] }), _jsxs("div", { style: { color: "#888", fontSize: 12 }, children: ["Showing ", _jsx("strong", { children: filtered.length }), " of", " ", _jsx("strong", { children: users.length })] })] }), _jsx("div", { style: { marginTop: 12, background: "#fff", border: "2px solid #ddd" }, children: _jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [_jsx("thead", { children: _jsx("tr", { style: { background: "#efefef" }, children: ["Name", "Email", "Role", "Status"].map(function (h) { return (_jsx("th", { style: {
                                        textAlign: "left",
                                        padding: "8px 10px",
                                        fontSize: 12,
                                        color: "#555",
                                        borderBottom: "2px solid #d5d5d5",
                                    }, children: h.toUpperCase() }, h)); }) }) }), _jsx("tbody", { children: filtered.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 4, style: { padding: 12, color: "#999", fontStyle: "italic" }, children: "Nothing here. Try a different search." }) })) : (filtered.map(function (u) { return (_jsxs("tr", { children: [_jsx("td", { style: {
                                            padding: "8px 10px",
                                            borderBottom: "1px solid #eee",
                                        }, children: u.name }), _jsx("td", { style: {
                                            padding: "8px 10px",
                                            borderBottom: "1px solid #eee",
                                        }, children: u.email }), _jsx("td", { style: {
                                            padding: "8px 10px",
                                            borderBottom: "1px solid #eee",
                                        }, children: u.role }), _jsx("td", { style: {
                                            padding: "8px 10px",
                                            borderBottom: "1px solid #eee",
                                        }, children: _jsx("span", { style: {
                                                padding: "2px 6px",
                                                borderRadius: 4,
                                                fontSize: 12,
                                                background: u.status === "Active" ? "#e9e9e9" : "#f1f1f1",
                                                border: "1px solid #d8d8d8",
                                                color: "#666",
                                            }, children: u.status }) })] }, u.id)); })) })] }) }), inviteOpen && (_jsx("div", { style: {
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.55)",
                    display: "grid",
                    placeItems: "center",
                    padding: 16,
                    zIndex: 20,
                }, children: _jsxs("div", { role: "dialog", "aria-modal": "true", style: {
                        width: "100%",
                        maxWidth: 520,
                        background: "#fff",
                        borderRadius: 0, // harsh
                        padding: 14,
                        border: "3px solid #222",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
                    }, children: [_jsxs("div", { style: {
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 12,
                            }, children: [_jsx("div", { children: _jsx("div", { style: { fontWeight: 700, fontSize: 16 }, children: "Invite user" }) }), _jsx("button", { onClick: function () { return setInviteOpen(false); }, style: {
                                        border: "1px solid #999",
                                        background: "#f3f3f3",
                                        borderRadius: 0,
                                        padding: "6px 8px",
                                        cursor: "pointer",
                                        height: 30,
                                        fontSize: 12,
                                    }, children: "X" })] }), _jsxs("form", { onSubmit: submitInvite, style: { display: "grid", gap: 10, marginTop: 12 }, children: [_jsxs("div", { style: { display: "grid", gap: 4 }, children: [_jsx("label", { style: { fontWeight: 600, fontSize: 12 }, htmlFor: "inviteName", children: "Full name" }), _jsx("input", { id: "inviteName", value: inviteName, onChange: function (e) { return setInviteName(e.target.value); }, placeholder: "Jane Doe", style: {
                                                padding: "8px 8px",
                                                borderRadius: 2,
                                                border: "1px solid #bbb",
                                                fontSize: 13,
                                            } })] }), _jsxs("div", { style: { display: "grid", gap: 4 }, children: [_jsx("label", { style: { fontWeight: 600, fontSize: 12 }, htmlFor: "inviteEmail", children: "Email address" }), _jsx("input", { id: "inviteEmail", value: inviteEmail, onChange: function (e) { return setInviteEmail(e.target.value); }, placeholder: "jane@acme.com", style: {
                                                padding: "8px 8px",
                                                borderRadius: 2,
                                                border: "1px solid #bbb", // intentionally NOT red even when invalid
                                                fontSize: 13,
                                            } }), inviteEmailError && (_jsx("div", { style: { color: "#b00020", fontSize: 12 }, children: inviteEmailError }))] }), _jsxs("div", { style: { display: "grid", gap: 4 }, children: [_jsx("label", { style: { fontWeight: 600, fontSize: 12 }, htmlFor: "inviteRole", children: "Permission" }), _jsxs("select", { id: "inviteRole", value: inviteRole, onChange: function (e) { return setInviteRole(e.target.value); }, style: {
                                                padding: "8px 8px",
                                                borderRadius: 2,
                                                border: "2px solid #ddd",
                                                background: "#fff",
                                                height: 34,
                                                fontSize: 13,
                                            }, children: [_jsx("option", { value: "Viewer", children: "Viewer" }), _jsx("option", { value: "Editor", children: "Editor" }), _jsx("option", { value: "Admin", children: "Admin" })] })] }), _jsxs("div", { style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: 6,
                                    }, children: [_jsx("button", { type: "button", onClick: function () { return setInviteOpen(false); }, style: {
                                                padding: 0,
                                                border: "none",
                                                background: "transparent",
                                                color: "#1b66ff",
                                                textDecoration: "underline",
                                                cursor: "pointer",
                                                fontSize: 13,
                                            }, children: "Cancel" }), _jsx("button", { type: "submit", disabled: submitting, style: {
                                                padding: "10px 16px",
                                                borderRadius: 999,
                                                border: "none",
                                                background: submitting ? "#9ad7a5" : "#22a447",
                                                color: "white",
                                                cursor: submitting ? "not-allowed" : "pointer",
                                                fontWeight: 700,
                                                fontSize: 13,
                                            }, children: submitting ? "Sending..." : "Send invite" })] })] }), _jsx("div", { style: { marginTop: 10, fontSize: 11, color: "#999" }, children: "In the New UI, modal + validation + feedback are consistent across pages." })] }) }))] }));
}
