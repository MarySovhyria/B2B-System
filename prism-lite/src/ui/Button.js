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
import { jsx as _jsx } from "react/jsx-runtime";
export function Button(_a) {
    var _b = _a.variant, variant = _b === void 0 ? "primary" : _b, _c = _a.loading, loading = _c === void 0 ? false : _c, disabled = _a.disabled, children = _a.children, style = _a.style, rest = __rest(_a, ["variant", "loading", "disabled", "children", "style"]);
    var isDisabled = disabled || loading;
    var stylesByVariant = {
        primary: { background: "#111", color: "white", border: "1px solid #111" },
        secondary: { background: "white", color: "#111", border: "1px solid #ddd" },
        danger: { background: "#d33", color: "white", border: "1px solid #d33" },
    };
    return (_jsx("button", __assign({}, rest, { disabled: isDisabled, className: "ui-focus", style: __assign(__assign({ padding: "10px 14px", borderRadius: 10, cursor: isDisabled ? "not-allowed" : "pointer", opacity: isDisabled ? 0.75 : 1, height: 40 }, stylesByVariant[variant]), style), children: loading ? "Loading..." : children })));
}
