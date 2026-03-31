import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { track } from "../lib/analytics";

type Score = 1 | 2 | 3 | 4 | 5;

export function SurveyPrompt({
  open,
  onClose,
  context,
  ui,
}: {
  open: boolean;
  onClose: () => void;
  context: "invite" | "settings";
  ui: "old" | "new";
}) {
  const [score, setScore] = useState<Score>(5);
  const [comment, setComment] = useState("");

  function submit() {
    track("survey_submitted", {
      context,
      ui,
      score,
      comment_length: comment.trim().length,
    });
    onClose();
  }

  function skip() {
    track("survey_skipped", { context, ui });
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={skip}
      title="Quick feedback"
      description="How easy was that task?"
      footer={
        <>
          <Button variant="secondary" type="button" onClick={skip}>
            Skip
          </Button>
          <Button type="button" onClick={submit}>
            Send
          </Button>
        </>
      }
    >
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5].map((n) => {
            const active = n === score;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setScore(n as Score)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: active ? "2px solid #111" : "1px solid #ccc",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {n}
              </button>
            );
          })}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What (if anything) was confusing?"
          style={{
            minHeight: 90,
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ccc",
            resize: "vertical",
          }}
        />
      </div>
    </Modal>
  );
}
