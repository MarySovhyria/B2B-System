var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { track } from "../../lib/analytics";
export default function OldSettings() {
  var _a = useState(""),
    workspaceName = _a[0],
    setWorkspaceName = _a[1];
  var _b = useState("Viewer"),
    defaultRole = _b[0],
    setDefaultRole = _b[1];
  var _c = useState(true),
    allowInvites = _c[0],
    setAllowInvites = _c[1];
  var _d = useState("idle"),
    status = _d[0],
    setStatus = _d[1];
  var _e = useState(false),
    touched = _e[0],
    setTouched = _e[1];
  var errors = useMemo(
    function () {
      var e = {};
      if (!workspaceName.trim())
        e.workspaceName = "Workspace name is required.";
      if (workspaceName.trim().length > 40)
        e.workspaceName = "Keep the name under 40 characters.";
      return e;
    },
    [workspaceName],
  );
  var canSave = Object.keys(errors).length === 0 && status !== "saving";
  function onSave(e) {
    return __awaiter(this, void 0, void 0, function () {
      var _a;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            e.preventDefault();
            setTouched(true);
            if (!canSave) {
              // old UI: no clear inline feedback except a status line
              setStatus("error");
              track("settings_saved", {
                ui: "old",
                success: false,
                reason: "validation",
              });
              return [2 /*return*/];
            }
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, , 4]);
            setStatus("saving");
            // old UI: tracks success immediately (a bit wrong, intentionally)
            track("settings_saved", { ui: "old", success: true });
            return [
              4 /*yield*/,
              new Promise(function (res) {
                return setTimeout(res, 900);
              }),
            ];
          case 2:
            _b.sent();
            setStatus("success");
            // old UI: keeps success message visible longer
            setTimeout(function () {
              return setStatus("idle");
            }, 4000);
            return [3 /*break*/, 4];
          case 3:
            _a = _b.sent();
            setStatus("error");
            track("settings_saved", {
              ui: "old",
              success: false,
              reason: "exception",
            });
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  }
  return _jsxs("div", {
    style: {
      padding: 18,
      fontFamily: "Georgia, serif",
      background: "#f5f5f5",
      minHeight: "100vh",
    },
    children: [
      _jsx("div", {
        style: {
          marginBottom: 10,
          padding: "6px 8px",
          border: "2px dotted #999",
          background: "#fff",
          color: "#444",
          fontSize: 12,
        },
        children: "Old UI (intentionally inconsistent / legacy)",
      }),
      _jsxs("div", {
        style: { background: "#fff", border: "1px solid #cfcfcf", padding: 12 },
        children: [
          _jsx("h1", {
            style: { marginTop: 0, marginBottom: 6, fontSize: 26 },
            children: "Settings",
          }),
          _jsx("p", {
            style: { color: "#888", marginTop: 0, fontSize: 13 },
            children: "Legacy settings form with inconsistent patterns.",
          }),
          _jsxs("div", {
            style: {
              marginTop: 10,
              padding: 10,
              borderRadius: 2,
              background: "#fffbe6", // same for success/error (confusing)
              border: "1px solid #e0d48a",
              color: "#333",
              fontSize: 13,
              display: status === "idle" ? "none" : "block",
            },
            children: [
              status === "saving" &&
                _jsx("strong", { children: "Saving\u2026" }),
              status === "success" &&
                _jsx("strong", { children: "Saved (maybe)." }),
              status === "error" &&
                _jsx("strong", { children: "Could not save." }),
            ],
          }),
          _jsxs("form", {
            onSubmit: onSave,
            style: { display: "grid", gap: 12, marginTop: 12 },
            children: [
              _jsxs("div", {
                style: { display: "grid", gap: 4 },
                children: [
                  _jsx("label", {
                    htmlFor: "workspaceName",
                    style: { fontWeight: 600, fontSize: 12 },
                    children: "Workspace name",
                  }),
                  _jsx("input", {
                    id: "workspaceName",
                    value: workspaceName,
                    onChange: function (e) {
                      return setWorkspaceName(e.target.value);
                    },
                    onBlur: function () {
                      return setTouched(true);
                    },
                    placeholder: "Acme Inc.",
                    style: {
                      padding: "8px 8px",
                      borderRadius: 2,
                      border: "2px solid #ddd",
                      outline: "none",
                      fontSize: 13,
                    },
                  }),
                  touched &&
                    errors.workspaceName &&
                    _jsx("div", {
                      style: { color: "#b00020", fontSize: 12 },
                      children: errors.workspaceName,
                    }),
                ],
              }),
              _jsxs("div", {
                style: { display: "grid", gap: 4 },
                children: [
                  _jsx("label", {
                    htmlFor: "defaultRole",
                    style: { fontWeight: 600, fontSize: 12 },
                    children: "Default role",
                  }),
                  _jsxs("select", {
                    id: "defaultRole",
                    value: defaultRole,
                    onChange: function (e) {
                      return setDefaultRole(e.target.value);
                    },
                    style: {
                      padding: "6px 8px",
                      borderRadius: 16,
                      border: "1px solid #aaa",
                      background: "#f2f2f2",
                      height: 32,
                      fontSize: 13,
                      width: 220,
                    },
                    children: [
                      _jsx("option", { value: "Viewer", children: "Viewer" }),
                      _jsx("option", { value: "Editor", children: "Editor" }),
                      _jsx("option", { value: "Admin", children: "Admin" }),
                    ],
                  }),
                  _jsx("div", {
                    style: { color: "#999", fontSize: 12 },
                    children: "(Hard to understand)",
                  }),
                ],
              }),
              _jsxs("div", {
                style: { display: "flex", gap: 6, alignItems: "center" },
                children: [
                  _jsx("input", {
                    type: "checkbox",
                    checked: allowInvites,
                    onChange: function (e) {
                      return setAllowInvites(e.target.checked);
                    },
                  }),
                  _jsx("span", {
                    style: { fontSize: 13, color: "#333" },
                    children: "Allow invites",
                  }),
                ],
              }),
              _jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
                children: [
                  _jsx("button", {
                    type: "button",
                    onClick: function () {
                      setWorkspaceName("");
                      setDefaultRole("Viewer");
                      setAllowInvites(true);
                      setTouched(false);
                      setStatus("idle");
                      track("settings_reset", { ui: "old" });
                    },
                    style: {
                      padding: 0,
                      border: "none",
                      background: "transparent",
                      color: "#1b66ff",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: 13,
                    },
                    children: "Reset",
                  }),
                  _jsx("button", {
                    type: "submit",
                    disabled: !canSave,
                    style: {
                      padding: "6px 10px",
                      borderRadius: 3,
                      border: "1px solid #1b66ff",
                      background: canSave ? "#1b66ff" : "#9bbcff",
                      color: "white",
                      cursor: canSave ? "pointer" : "not-allowed",
                      height: 30,
                      fontSize: 13,
                    },
                    children: status === "saving" ? "Saving..." : "Save",
                  }),
                ],
              }),
              _jsx("div", {
                style: { marginTop: 6, fontSize: 11, color: "#999" },
                children:
                  "In the New UI, form fields + errors + actions look consistent across pages.",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
