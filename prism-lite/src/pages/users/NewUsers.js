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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Button, EmptyState, Input, Modal, useToast } from "@/ui";
import { track } from "@/lib/analytics";
import { SurveyPrompt } from "@/ui/SurveyPrompt";
import { useCallback } from "react";
function makeId() {
    return Math.random().toString(16).slice(2);
}
export default function NewUsers() {
    var ui = "new"; // helpful for analytics comparisons
    var push = useToast().push;
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
    var _j = useState(false), surveyOpen = _j[0], setSurveyOpen = _j[1];
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
    function openInvite() {
        track("invite_opened", { ui: ui });
        setInviteOpen(true);
    }
    function submitInvite(e) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.preventDefault();
                        if (inviteEmailError) {
                            track("invite_submitted", { ui: ui, success: false, reason: "validation" });
                            push({ type: "error", message: inviteEmailError });
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        setSubmitting(true);
                        // fake request delay
                        return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 600); })];
                    case 2:
                        // fake request delay
                        _b.sent();
                        newUser_1 = {
                            id: makeId(),
                            name: inviteName.trim() || "Invited user",
                            email: inviteEmail.trim(),
                            role: inviteRole,
                            status: "Invited",
                        };
                        setUsers(function (prev) { return __spreadArray([newUser_1], prev, true); });
                        setInviteName("");
                        setInviteEmail("");
                        setInviteRole("Viewer");
                        setInviteOpen(false);
                        track("invite_submitted", { ui: ui, success: true });
                        push({ type: "success", message: "Invite sent." });
                        track("survey_shown", { context: "invite", ui: ui });
                        setSurveyOpen(true);
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        track("invite_submitted", { ui: ui, success: false, reason: "exception" });
                        push({ type: "error", message: "Invite failed. Try again." });
                        return [3 /*break*/, 5];
                    case 4:
                        setSubmitting(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    var closeInvite = useCallback(function () { return setInviteOpen(false); }, []);
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    alignItems: "flex-start",
                }, children: [_jsxs("div", { children: [_jsx("h1", { style: { margin: 0 }, children: "Users" }), _jsx("p", { style: { marginTop: 8, color: "#555" }, children: "Manage access to your workspace." })] }), _jsx(Button, { onClick: openInvite, children: "Invite user" })] }), _jsxs("div", { style: {
                    display: "flex",
                    gap: 12,
                    alignItems: "end",
                    marginTop: 16,
                    flexWrap: "wrap",
                }, children: [_jsx("div", { style: { width: 320 }, children: _jsx(Input, { label: "Search", value: query, onChange: function (e) {
                                var v = e.target.value;
                                setQuery(v);
                                track("search_used", {
                                    ui: ui,
                                    page: "users",
                                    query_length: v.length,
                                });
                            }, placeholder: "Search name or email\u2026" }) }), _jsxs("div", { style: { display: "grid", gap: 6 }, children: [_jsx("label", { style: { fontWeight: 600 }, children: "Role" }), _jsxs("select", { value: roleFilter, onChange: function (e) {
                                    var v = e.target.value;
                                    setRoleFilter(v);
                                    track("role_filter_changed", { ui: ui, page: "users", role: v });
                                }, style: {
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    border: "1px solid #ccc",
                                    background: "white",
                                    height: 42,
                                }, children: [_jsx("option", { value: "All", children: "All roles" }), _jsx("option", { value: "Viewer", children: "Viewer" }), _jsx("option", { value: "Editor", children: "Editor" }), _jsx("option", { value: "Admin", children: "Admin" })] })] }), _jsxs("div", { style: { color: "#666", paddingBottom: 6 }, children: ["Showing ", _jsx("strong", { children: filtered.length }), " of", " ", _jsx("strong", { children: users.length })] })] }), _jsx("div", { style: {
                    marginTop: 16,
                    border: "1px solid #eee",
                    borderRadius: 12,
                    overflow: "hidden",
                }, children: _jsxs("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [_jsx("thead", { children: _jsx("tr", { style: { background: "#fafafa" }, children: ["Name", "Email", "Role", "Status"].map(function (h) { return (_jsx("th", { style: {
                                        textAlign: "left",
                                        padding: "12px 14px",
                                        fontSize: 13,
                                        color: "#555",
                                        borderBottom: "1px solid #eee",
                                    }, children: h }, h)); }) }) }), _jsx("tbody", { children: filtered.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 4, children: _jsx(EmptyState, { title: "No users found", description: "Try changing your search or role filter." }) }) })) : (filtered.map(function (u) { return (_jsxs("tr", { children: [_jsx("td", { style: {
                                            padding: "12px 14px",
                                            borderBottom: "1px solid #f2f2f2",
                                        }, children: u.name }), _jsx("td", { style: {
                                            padding: "12px 14px",
                                            borderBottom: "1px solid #f2f2f2",
                                        }, children: u.email }), _jsx("td", { style: {
                                            padding: "12px 14px",
                                            borderBottom: "1px solid #f2f2f2",
                                        }, children: u.role }), _jsx("td", { style: {
                                            padding: "12px 14px",
                                            borderBottom: "1px solid #f2f2f2",
                                        }, children: u.status })] }, u.id)); })) })] }) }), _jsx(Modal, { open: inviteOpen, title: "Invite user", description: "They\u2019ll receive an email invitation.", onClose: closeInvite, footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "secondary", type: "button", onClick: closeInvite, children: "Cancel" }), _jsx(Button, { loading: submitting, type: "submit", form: "invite-form", children: "Send invite" })] }), children: _jsxs("form", { id: "invite-form", onSubmit: submitInvite, style: { display: "grid", gap: 12 }, children: [_jsx(Input, { label: "Name (optional)", value: inviteName, onChange: function (e) { return setInviteName(e.target.value); }, placeholder: "Jane Doe" }), _jsx(Input, { label: "Email", value: inviteEmail, onChange: function (e) { return setInviteEmail(e.target.value); }, placeholder: "jane@acme.com", error: inviteEmailError }), _jsxs("div", { style: { display: "grid", gap: 6 }, children: [_jsx("label", { style: { fontWeight: 600 }, children: "Role" }), _jsxs("select", { value: inviteRole, onChange: function (e) { return setInviteRole(e.target.value); }, style: {
                                        padding: "10px 12px",
                                        borderRadius: 10,
                                        border: "1px solid #ccc",
                                        background: "white",
                                        height: 42,
                                    }, children: [_jsx("option", { value: "Viewer", children: "Viewer" }), _jsx("option", { value: "Editor", children: "Editor" }), _jsx("option", { value: "Admin", children: "Admin" })] })] })] }) }), _jsx(SurveyPrompt, { open: surveyOpen, onClose: function () { return setSurveyOpen(false); }, context: "invite", ui: "new" })] }));
}
