var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Input(_a) {
    var _b;
    var label = _a.label, error = _a.error, hint = _a.hint, style = _a.style, id = _a.id, rest = __rest(_a, ["label", "error", "hint", "style", "id"]);
    var inputId = (_b = id !== null && id !== void 0 ? id : rest.name) !== null && _b !== void 0 ? _b : undefined;
    return (_jsxs("div", { className: "ui-col", children: [label && (_jsx("label", { className: "ui-label", htmlFor: inputId, children: label })), _jsx("input", __assign({}, rest, { id: inputId, className: "ui-focus", style: __assign({ padding: "10px 12px", borderRadius: 10, border: error ? "1px solid #d33" : "1px solid #ccc", outline: "none" }, style) })), error ? (_jsx("div", { className: "ui-error", children: error })) : hint ? (_jsx("div", { className: "ui-help", children: hint })) : null] }));
}
