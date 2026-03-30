# Case Study — Prism-lite Cohesion + Feedback Loops

## Summary
I built a small B2B admin app (Users + Settings) and implemented a platform cohesion upgrade using shared UI components (“Prism-lite”). The upgrade was shipped behind a feature flag and validated with analytics, session replay, and a micro-survey in PostHog.

## My role
UX Engineer: implement UI patterns across surfaces, contribute system components, ship safely behind a flag, and validate via feedback loops.

---

## Problem (Old UI teardown)
The “Old UI” intentionally showed common platform issues:
- Inconsistent button styles/sizes between pages and within flows
- Modal behavior and form validation patterns were inconsistent
- Feedback patterns varied (page-specific messages vs global feedback)
- Overall experience felt like separate screens rather than one cohesive product

## Goals
- Improve cross-surface cohesion (Users + Settings)
- Create reusable global components and interaction patterns
- Add measurement to validate improvements (events + replay + survey)
- Ship changes safely behind a flag

---

## Solution

### 1) Prism-lite component system
Implemented shared components used across Users + Settings:
- Button (variants + loading)
- Input (label + error + hint)
- Modal (ESC close + focus management)
- Toast (global success/error feedback)
- EmptyState
- SurveyPrompt (micro-survey)

### 2) Flagged rollout (Old vs New)
- URL override: `?ui=old` / `?ui=new`
- PostHog feature flag: `new_prism_ui`
This allows comparison without changing routes or workflows.

---

## Validation / feedback loops (PostHog)

### Analytics events
Tracked key actions with `ui: "old" | "new"`:
- `page_view`
- `invite_opened`
- `invite_submitted` (success true/false)
- `settings_saved` (success true/false)
- `survey_shown`, `survey_submitted`, `survey_skipped`

### Session replay
Enabled replay to observe friction in:
- invite modal interactions
- validation and recovery paths
- clarity of success feedback

### Micro-survey
After successful invite/save:
- score (1–5)
- optional comment

---

## Results (screenshots)
Add:
1) Old Users vs New Users screenshots
2) Old Settings vs New Settings screenshots
3) PostHog Live Events screenshot showing event properties (`ui`)
4) One Replay screenshot (Old vs New)

(If you have enough data, include a small comparison chart or funnel split by `ui`.)

---

## Learnings
- Shared components reduced inconsistency and improved perceived quality quickly.
- Behind-a-flag rollout supports incremental adoption across surfaces.
- Combining analytics + replay + micro-survey provides stronger evidence than one signal alone.

## Next steps
- Storybook documentation for Prism-lite components
- Tokenize spacing/typography/colors to remove inline styles
- Accessibility improvements (full focus trap, ARIA polish)
- Add an experiment dashboard/funnel comparing Old vs New outcomes
