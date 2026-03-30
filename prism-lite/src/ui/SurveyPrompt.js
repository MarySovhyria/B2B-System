import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Modal } from "@/ui/Modal";
import { Button } from "@/ui/Button";
import { track } from "@/lib/analytics";
export function SurveyPrompt(_a) {
    var open = _a.open, onClose = _a.onClose, context = _a.context, ui = _a.ui;
    var _b = useState(5), score = _b[0], setScore = _b[1];
    var _c = useState(""), comment = _c[0], setComment = _c[1];
    function submit() {
        track("survey_submitted", {
            context: context,
            ui: ui,
            score: score,
            comment_length: comment.trim().length,
        });
        onClose();
    }
    function skip() {
        track("survey_skipped", { context: context, ui: ui });
        onClose();
    }
    return (_jsx(Modal, { open: open, onClose: skip, title: "Quick feedback", description: "How easy was that task?", footer: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "secondary", type: "button", onClick: skip, children: "Skip" }), _jsx(Button, { type: "button", onClick: submit, children: "Send" })] }), children: _jsxs("div", { style: { display: "grid", gap: 12 }, children: [_jsx("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: [1, 2, 3, 4, 5].map(function (n) {
                        var active = n === score;
                        return (_jsx("button", { type: "button", onClick: function () { return setScore(n); }, style: {
                                width: 38,
                                height: 38,
                                borderRadius: 10,
                                border: active ? "2px solid #111" : "1px solid #ccc",
                                background: "white",
                                cursor: "pointer",
                                fontWeight: active ? 700 : 400,
                            }, children: n }, n));
                    }) }), _jsx("textarea", { value: comment, onChange: function (e) { return setComment(e.target.value); }, placeholder: "What (if anything) was confusing?", style: {
                        width: "100%",
                        minHeight: 90,
                        padding: 10,
                        borderRadius: 10,
                        border: "1px solid #ccc",
                        resize: "vertical",
                    } })] }) }));
}
