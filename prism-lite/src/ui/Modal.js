import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export function Modal(_a) {
    var open = _a.open, title = _a.title, description = _a.description, onClose = _a.onClose, children = _a.children, footer = _a.footer;
    var panelRef = useRef(null);
    var previouslyFocused = useRef(null);
    useEffect(function () {
        if (!open)
            return;
        previouslyFocused.current = document.activeElement;
        var onKeyDown = function (e) {
            if (e.key === "Escape")
                onClose();
        };
        document.addEventListener("keydown", onKeyDown);
        // focus the modal panel
        setTimeout(function () { var _a; return (_a = panelRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, 0);
        return function () {
            var _a, _b;
            document.removeEventListener("keydown", onKeyDown);
            (_b = (_a = previouslyFocused.current) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
    }, [open, onClose]);
    if (!open)
        return null;
    return createPortal(_jsx("div", { onMouseDown: onClose, style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "grid",
            placeItems: "center",
            padding: 16,
            zIndex: 50,
        }, children: _jsxs("div", { ref: panelRef, tabIndex: -1, role: "dialog", "aria-modal": "true", onMouseDown: function (e) { return e.stopPropagation(); }, className: "ui-card", style: {
                width: "100%",
                maxWidth: 560,
                padding: 16,
                outline: "none",
            }, children: [(title || description) && (_jsxs("div", { style: { marginBottom: 12 }, children: [title && (_jsx("div", { style: { fontWeight: 800, fontSize: 16 }, children: title })), description && (_jsx("div", { className: "ui-help", style: { marginTop: 4 }, children: description }))] })), _jsx("div", { children: children }), footer && (_jsx("div", { style: {
                        marginTop: 14,
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 10,
                    }, children: footer }))] }) }), document.body);
}
