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
import { createContext, useCallback, useContext, useMemo, useState, } from "react";
var ToastContext = createContext(null);
function id() {
    return Math.random().toString(16).slice(2);
}
export function ToastProvider(_a) {
    var children = _a.children;
    var _b = useState([]), toasts = _b[0], setToasts = _b[1];
    var push = useCallback(function (t) {
        var _a, _b;
        var toast = {
            id: id(),
            type: (_a = t.type) !== null && _a !== void 0 ? _a : "info",
            message: t.message,
        };
        setToasts(function (prev) { return __spreadArray([toast], prev, true); });
        var timeout = (_b = t.timeoutMs) !== null && _b !== void 0 ? _b : 1800;
        window.setTimeout(function () {
            setToasts(function (prev) { return prev.filter(function (x) { return x.id !== toast.id; }); });
        }, timeout);
    }, []);
    var api = useMemo(function () { return ({ push: push }); }, [push]);
    return (_jsxs(ToastContext.Provider, { value: api, children: [children, _jsx("div", { style: {
                    position: "fixed",
                    right: 16,
                    bottom: 16,
                    display: "grid",
                    gap: 10,
                    zIndex: 60,
                }, children: toasts.map(function (t) { return (_jsx("div", { className: "ui-card", style: {
                        padding: "10px 12px",
                        minWidth: 260,
                        borderColor: t.type === "success"
                            ? "#bfe8cc"
                            : t.type === "error"
                                ? "#f2b8b8"
                                : "#e6e6e6",
                        background: t.type === "success"
                            ? "#e8f7ee"
                            : t.type === "error"
                                ? "#fdecec"
                                : "white",
                    }, children: _jsx("div", { style: { fontSize: 14, color: "#111" }, children: t.message }) }, t.id)); }) })] }));
}
export function useToast() {
    var ctx = useContext(ToastContext);
    if (!ctx)
        throw new Error("useToast must be used inside <ToastProvider>");
    return ctx;
}
