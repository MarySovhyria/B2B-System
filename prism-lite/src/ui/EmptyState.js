import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function EmptyState(_a) {
    var _b = _a.title, title = _b === void 0 ? "No results" : _b, _c = _a.description, description = _c === void 0 ? "Try adjusting your filters." : _c, action = _a.action;
    return (_jsxs("div", { style: { padding: 18, color: "#111" }, children: [_jsx("div", { style: { fontWeight: 800 }, children: title }), _jsx("div", { className: "ui-help", style: { marginTop: 6 }, children: description }), action && _jsx("div", { style: { marginTop: 12 }, children: action })] }));
}
