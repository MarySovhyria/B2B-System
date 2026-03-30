# B2B-System
# Prism-lite Cohesion Demo (Users + Settings)

A small B2B admin app built to demonstrate **UX Engineering** work:
- platform cohesion via a mini design system (“Prism-lite” components)
- Old vs New UI shipped behind a flag/override
- validation via analytics + session replay + micro-survey (PostHog)

## What this demonstrates (matches UX Engineer responsibilities)
- Implement scoped UX improvements across multiple product surfaces (Users + Settings)
- Create / evolve shared UI components (Button, Input, Modal, Toast, EmptyState)
- Ship changes behind a flag (Old vs New) for safe rollout
- Establish feedback loops (analytics, session replay, micro-survey)

---

## Tech
- React + TypeScript + Vite
- React Router
- PostHog (events + session replay + feature flags)
- Small component system in `src/ui`

---

## How to run locally

### 1) Install dependencies
```bash
npm install
