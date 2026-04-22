# Sahil's AP Exam Prep

Repo for generating AP exam study material.

## Supported exams

When the user refers to an exam by short name, resolve as follows:

| Short name | Exam             | Folder                  |
| ---------- | ---------------- | ----------------------- |
| `physics`  | AP Physics C     | `exams/ap-physics-c/`   |
| `history`  | AP US History    | `exams/ap-us-history/`  |

"physics" always means **AP Physics C** (calculus-based, Mechanics + E&M). It is never AP Physics 1, 2, or algebra-based physics.
"history" always means **AP US History** (APUSH). It is never AP World, AP European, or any other history exam.

AP Physics C is officially two separate exams (Mechanics and Electricity & Magnetism). Both are covered in `exams/ap-physics-c/` — disambiguate by unit when needed.

## Layout per exam

```
exams/<exam>/
  syllabus.md      # Official AP units/topics. Source of truth for quiz scope.
  quizzes/         # Generated quizzes live here.
```

## Quiz conventions

- **File name:** `quizzes/unit-<N>-<slug>-<YYYY-MM-DD>.html` (e.g. `unit-5-rotation-2026-04-21.html`). If a file with the same name already exists, append `-v2`, `-v3`, etc.
- **Scope:** Pick topics only from the exam's `syllabus.md`. Don't invent units outside the AP curriculum.
- **Format:** Visually appealing HTML page using the shared design system (`../../assets/styles.css` + `../../assets/quiz.css` + `../../assets/quiz.js`). Theme class on `<html>`: `theme-physics` or `theme-history`. Two sections:
  1. **Multiple Choice** — 5 questions, 4 options each (A–D), AP-style. For history: stimulus-based (primary/secondary source, cartoon description, chart, etc.), with 2–4 stimuli total grouped to show the linked-question feel of the real exam. For physics: may include diagrams/given-values where appropriate.
  2. **Free Response** — 1–2 questions requiring worked solutions or short essays (DBQ/SAQ-style for history, multi-part problem for physics).
- **MCQ scrambling:** On every page load, the JS shuffles the four options per MCQ and re-labels them A–D. Authors mark the correct option with `data-correct="true"`; **do not** hardcode letter labels in explanations (refer to the *option text* instead). This lets the same quiz be taken repeatedly without memorizing letter positions.
- **Answer key:** Inline with each question. Per-MCQ: a "Check answer" button reveals correct/incorrect and a short explanation. Per-FRQ: a textarea (no grading) plus a "Show model answer" button revealing a rubric + model response.
- **Difficulty:** Match the real AP exam exactly — stimulus-rich stems, plausible distractors, and genuinely AP-level reasoning. Not easier. This is the most important quality bar.
