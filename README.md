# Sahil's AP Exam Prep

Generator for AP exam study material (quizzes, syllabi) as static HTML.

**Live site:** https://adeshmukh.github.io/ap-prep/

## Exams

- AP Physics C (Mechanics + E&M) — `exams/ap-physics-c/`
- AP US History (APUSH) — `exams/ap-us-history/`

## Using with Claude Code

- `/create-quiz` — generates a new AP-style quiz for either exam.
- See `CLAUDE.md` for exam short names (`physics`, `history`), folder layout, and quiz conventions.
- Each exam's `syllabus.md` is the source of truth for quiz scope.
- Quizzes go under `exams/<exam>/quizzes/` and use the shared design system in `exams/assets/`.

## Deploy

GitHub Pages auto-deploys `exams/` on push to `master` via `.github/workflows/pages.yml`.
