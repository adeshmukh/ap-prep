---
description: Generate an AP-style quiz for AP Physics C or AP US History
argument-hint: <physics|history> [unit/topic]
---

Generate an AP-style quiz based on the user's request: **$ARGUMENTS**

The quiz is a self-contained HTML page that uses the shared design system and the scrambling script at `exams/assets/quiz.js`. Every page load reshuffles the four MCQ options so the same quiz can be retaken without memorizing letter positions.

## Steps

1. **Resolve the exam** from the first token of the arguments:
   - `physics` → AP Physics C (`exams/ap-physics-c/`, theme class `theme-physics`)
   - `history` → AP US History (`exams/ap-us-history/`, theme class `theme-history`)
   - Anything else → ask the user which exam they meant. Do not guess.

2. **Resolve the unit/topic:**
   - Read `exams/<exam>/syllabus.md` to see the official AP units.
   - If the user named a unit or topic in `$ARGUMENTS`, match it to a syllabus unit. If it's ambiguous (e.g. "physics circuits" could be Mechanics or E&M), ask which one.
   - If no unit was given, ask the user which unit they want to be quizzed on, listing options from the syllabus.

3. **Check existing quizzes** in `exams/<exam>/quizzes/` for the same unit so you can vary the questions from prior quizzes on that topic.

4. **Generate the quiz** at true AP exam level.
   - **Coverage first.** The quiz should comprehensively cover the unit's **Key concepts** in `syllabus.md`. Every major concept listed should be touched by at least one MCQ or FRQ sub-part. Prefer breadth over depth: do not burn three MCQs on one topic while leaving four other major topics untested.
   - **MCQs (A–D each), sized to unit scope.** Narrow units (APUSH Unit 1; a single physics topic) → ~8–10 MCQs. Dense units (APUSH Units 2–6, 8, 9) → ~15–20 MCQs across 5–7 stimulus groups + a few standalones. The largest unit (APUSH Unit 7, 1890–1945) → ~22–28 MCQs. For history: build around multiple stimuli (primary excerpts, political-cartoon descriptions, historian interpretations, charts) with 2–4 linked questions per stimulus — this mirrors the real exam — plus standalone MCQs to pick up concepts the stimuli don't reach. For physics: include brief scenarios, relevant given values, and where helpful a described diagram; distractors should target common reasoning errors (wrong sign, wrong axis, confused formula).
   - **FRQs (2–3).** History: one SAQ with parts a/b/c plus one DBQ or LEQ-style prompt (provide 3–7 short excerpts for a DBQ). For dense units, consider a second SAQ on a different sub-period so the FRQ portion also broadens coverage. Physics: 1–2 multi-part problems requiring derivation and calculus where the unit demands it.
   - **Difficulty:** match the real exam. Plausible distractors, not trick questions. Do not soften the language or give away the answer.

5. **Author the HTML** using the template below. Save to `exams/<exam>/quizzes/unit-<N>-<slug>-<YYYY-MM-DD>.html`. Use today's date. If the filename already exists, append `-v2`, `-v3`, etc.

   **Critical conventions:**
   - Options are authored in any order — `quiz.js` shuffles them on load and re-labels A–D. Mark the correct option with `data-correct="true"`.
   - Explanations must refer to option *content* (e.g. "the Columbian Exchange answer"), not letters, because the letter changes every reload.
   - Use the shared stylesheets/scripts with relative paths `../../assets/…`.

6. **Report** the path of the created file and a one-line summary of what's in it. Don't print the full quiz contents.

## HTML template

```html
<!doctype html>
<html lang="en" class="theme-history"><!-- or theme-physics -->
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Unit N · [Unit title] · [Exam]</title>
    <link rel="stylesheet" href="../../assets/styles.css" />
    <link rel="stylesheet" href="../../assets/quiz.css" />
  </head>
  <body>
    <div class="site">
      <nav class="topnav">
        <a class="brand" href="../../">AP Exam Prep</a>
        <a class="back" href="../">[Exam short name]</a>
      </nav>

      <header class="hero">
        <span class="eyebrow">Unit N · [period or subtitle]</span>
        <h1>[Quiz title]</h1>
        <p class="lede">[1–2 sentence scope statement.]</p>
        <div class="hero-meta">
          <span>[N] multiple choice</span>
          <span>[M] free response</span>
          <span>AP-level</span>
        </div>
      </header>

      <section class="quiz" aria-label="Multiple choice">
        <h2>Multiple choice</h2>

        <!-- Optional stimulus grouping -->
        <article class="stimulus-group">
          <blockquote class="stimulus">
            <p>[Primary source excerpt, cartoon description, chart summary, historian quote, etc.]</p>
            <cite>— [Attribution, date]</cite>
          </blockquote>

          <article class="question mcq" data-qnum="1">
            <p class="prompt">[Question text referencing the stimulus.]</p>
            <ol class="options">
              <li data-correct="false">[Distractor 1]</li>
              <li data-correct="true">[Correct answer]</li>
              <li data-correct="false">[Distractor 2]</li>
              <li data-correct="false">[Distractor 3]</li>
            </ol>
            <button type="button" class="check">Check answer</button>
            <div class="explanation" hidden>
              <p><strong>Correct:</strong> [Restate correct option text].</p>
              <p>[Why it's right; why each distractor is wrong. Refer to option text, never letters.]</p>
            </div>
          </article>
          <!-- Additional linked questions inside the same stimulus-group if desired -->
        </article>

        <!-- Stand-alone question (no shared stimulus) -->
        <article class="question mcq" data-qnum="5">
          <p class="prompt">[Question text.]</p>
          <ol class="options">
            <li data-correct="true">[Correct]</li>
            <li data-correct="false">[Distractor]</li>
            <li data-correct="false">[Distractor]</li>
            <li data-correct="false">[Distractor]</li>
          </ol>
          <button type="button" class="check">Check answer</button>
          <div class="explanation" hidden>…</div>
        </article>
      </section>

      <section class="quiz" aria-label="Free response">
        <h2>Free response</h2>

        <article class="question frq" data-qnum="6">
          <p class="prompt"><strong>SAQ 1.</strong> [Prompt with parts (a), (b), (c).]</p>
          <textarea rows="8" placeholder="Write your response here…"></textarea>
          <button type="button" class="reveal">Show model answer</button>
          <div class="model-answer" hidden>
            <h3>Rubric</h3>
            <ul>
              <li>(a) [what earns the point]</li>
              <li>(b) [what earns the point]</li>
              <li>(c) [what earns the point]</li>
            </ul>
            <h3>Model answer</h3>
            <p>(a) …</p>
            <p>(b) …</p>
            <p>(c) …</p>
          </div>
        </article>
      </section>

      <footer>
        <span>Source: <code>exams/[exam]/syllabus.md</code></span>
        <a href="../">← [Exam]</a>
      </footer>
    </div>

    <script src="../../assets/quiz.js"></script>
  </body>
</html>
```
