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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Button, Input, useToast } from "@/ui";
import { track } from "@/lib/analytics";
export default function NewSettings() {
    var ui = "new";
    var push = useToast().push;
    var _a = useState(""), workspaceName = _a[0], setWorkspaceName = _a[1];
    var _b = useState("Viewer"), defaultRole = _b[0], setDefaultRole = _b[1];
    var _c = useState(true), allowInvites = _c[0], setAllowInvites = _c[1];
    var _d = useState("idle"), status = _d[0], setStatus = _d[1];
    var _e = useState(false), touched = _e[0], setTouched = _e[1];
    var workspaceNameError = useMemo(function () {
        var v = workspaceName.trim();
        if (!touched)
            return null;
        if (!v)
            return "Workspace name is required.";
        if (v.length > 40)
            return "Keep the name under 40 characters.";
        return null;
    }, [workspaceName, touched]);
    var canSave = !workspaceNameError && status !== "saving";
    function onSave(e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.preventDefault();
                        setTouched(true);
                        if (!canSave) {
                            track("settings_saved", { ui: ui, success: false, reason: "validation" });
                            push({
                                type: "error",
                                message: "Please fix the form errors before saving.",
                            });
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        setStatus("saving");
                        // fake API
                        return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 800); })];
                    case 2:
                        // fake API
                        _b.sent();
                        track("settings_saved", { ui: ui, success: true });
                        push({ type: "success", message: "Settings saved." });
                        return [3 /*break*/, 5];
                    case 3:
                        _a = _b.sent();
                        track("settings_saved", { ui: ui, success: false, reason: "exception" });
                        push({ type: "error", message: "Failed to save settings." });
                        return [3 /*break*/, 5];
                    case 4:
                        setStatus("idle");
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    return (_jsxs("div", { style: { padding: 24, maxWidth: 720 }, children: [_jsx("h1", { style: { marginTop: 0 }, children: "Settings" }), _jsxs("form", { onSubmit: onSave, style: { display: "grid", gap: 16 }, children: [_jsx(Input, { id: "workspaceName", label: "Workspace name", value: workspaceName, onChange: function (e) { return setWorkspaceName(e.target.value); }, onBlur: function () { return setTouched(true); }, placeholder: "Acme Inc.", error: workspaceNameError, hint: !workspaceNameError
                            ? "This name appears in the header and invites."
                            : undefined }), _jsxs("div", { style: { display: "grid", gap: 6 }, children: [_jsx("label", { htmlFor: "defaultRole", style: { fontWeight: 600 }, children: "Default role" }), _jsxs("select", { id: "defaultRole", value: defaultRole, onChange: function (e) { return setDefaultRole(e.target.value); }, style: {
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    border: "1px solid #ccc",
                                    background: "white",
                                    height: 42,
                                }, children: [_jsx("option", { value: "Viewer", children: "Viewer" }), _jsx("option", { value: "Editor", children: "Editor" }), _jsx("option", { value: "Admin", children: "Admin" })] }), _jsx("div", { style: { color: "#666", fontSize: 13 }, children: "New users start with this role." })] }), _jsxs("label", { style: { display: "flex", gap: 10, alignItems: "center" }, children: [_jsx("input", { type: "checkbox", checked: allowInvites, onChange: function (e) { return setAllowInvites(e.target.checked); } }), _jsx("span", { children: "Allow team members to invite users" })] }), _jsxs("div", { style: { display: "flex", gap: 12, alignItems: "center" }, children: [_jsx(Button, { type: "submit", loading: status === "saving", disabled: !canSave, children: "Save changes" }), _jsx(Button, { type: "button", variant: "secondary", onClick: function () {
                                    setWorkspaceName("");
                                    setDefaultRole("Viewer");
                                    setAllowInvites(true);
                                    setTouched(false);
                                    track("settings_reset", { ui: ui });
                                    push({ type: "info", message: "Reset form." });
                                }, children: "Reset" })] })] })] }));
}
