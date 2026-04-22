// Quiz interaction — runs on every load.
// - Shuffles options in each .question.mcq so letter positions change.
// - Relabels options A–D post-shuffle.
// - Handles select / check-answer / reveal-explanation per question.
// - Handles FRQ "show model answer".

(function () {
  "use strict";

  const LETTERS = ["A", "B", "C", "D", "E", "F"];

  function shuffle(array) {
    // Fisher–Yates
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function setupMcq(question) {
    const list = question.querySelector(".options");
    if (!list) return;

    const items = Array.from(list.children).filter((el) => el.tagName === "LI");
    shuffle(items);
    items.forEach((li, idx) => {
      li.setAttribute("data-letter", LETTERS[idx] || "?");
      list.appendChild(li);
    });

    let selected = null;
    let checked = false;

    items.forEach((li) => {
      li.addEventListener("click", () => {
        if (checked) return;
        if (selected) selected.classList.remove("selected");
        selected = li;
        li.classList.add("selected");
      });
    });

    const checkBtn = question.querySelector("button.check");
    const explanation = question.querySelector(".explanation");

    if (checkBtn) {
      checkBtn.addEventListener("click", () => {
        if (checked) return;
        checked = true;

        items.forEach((li) => {
          li.classList.add("checked");
          const isCorrect = li.getAttribute("data-correct") === "true";
          if (isCorrect) li.classList.add("correct");
          if (li === selected && !isCorrect) li.classList.add("incorrect");
        });

        const wasCorrect =
          selected && selected.getAttribute("data-correct") === "true";
        const badge = document.createElement("span");
        badge.className = "result " + (wasCorrect ? "ok" : "no");
        badge.textContent = wasCorrect ? "Correct" : selected ? "Incorrect" : "See answer";
        checkBtn.after(badge);

        checkBtn.disabled = true;
        checkBtn.hidden = true;

        if (explanation) explanation.hidden = false;
      });
    }
  }

  function setupFrq(question) {
    const btn = question.querySelector("button.reveal");
    const panel = question.querySelector(".model-answer");
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      panel.hidden = false;
      btn.disabled = true;
      btn.hidden = true;
    });
  }

  function numberQuestions() {
    const questions = document.querySelectorAll(".question");
    questions.forEach((q, idx) => {
      if (q.querySelector(".qnum")) return;
      const span = document.createElement("span");
      span.className = "qnum";
      span.textContent = "Q" + (idx + 1);
      q.insertBefore(span, q.firstChild);
    });
  }

  function init() {
    numberQuestions();
    document.querySelectorAll(".question.mcq").forEach(setupMcq);
    document.querySelectorAll(".question.frq").forEach(setupFrq);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
