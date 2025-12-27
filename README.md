# QUIZ ENTC – MCQ Exam App

A single-page multiple-choice exam application built with **React**, **TypeScript**, and **Vite**, designed for ENTC (Electronics & Telecommunication) students. The app lets students practice unit-wise MCQ questions (e.g. 8051 microcontroller and related topics) with a clea
  **Live Demo**: [https://entc-quiz.nn UI, keyboard navigation, and detailed feedback.
etlify.app](https://entc-quiz.netlify.app)

---

## Features

- **Unit-based quiz selection**
  - Select a unit from a dedicated chapter selection screen.
  - Each unit shows a short description in a modal before starting the quiz.

- **Question card experience**
  - One question per screen with clearly styled options.
  - Immediate feedback after submitting an answer (correct/incorrect + correct option).
  - **Previous / Next** navigation between questions.
  - **Skip button** to temporarily skip a question and return later.
  - Keyboard support (number keys, arrows, Enter, etc. depending on configuration).

- **Question navigator grid**
  - Compact grid showing the status of all questions in the current unit.
  - Color-coded states (e.g. correct, wrong, skipped, unanswered, current).
  - Click any number in the grid to jump directly to that question.

- **Results summary**
  - Total questions and number of correct answers.
  - Percentage score for the selected unit.

- **Responsive UI**
  - Built with Tailwind CSS utility classes.
  - Works well on desktop and larger mobile/tablet screens.

---

## Tech Stack

- **Frontend framework:** React 18
- **Language:** TypeScript
- **Bundler / Dev server:** Vite
- **Styling:** Tailwind CSS
- **Animations / extras:** Framer Motion (available as a dependency)

---

## Project Structure (high level)

The main application lives inside the `MCQ_QUIZ-main` folder:

```text
MCQ_QUIZ-main/
  src/
    App.tsx                # Main application component and routing between stages
    types.ts               # Shared TypeScript types (Question, UserAnswer, QuestionState, etc.)
    data/
      index.ts             # Aggregates all question sets
      questions/
        unit1Questions.ts  # Unit 1 question bank
        unit2Questions.ts  # Unit 2 question bank
        ...                # Additional units
    components/
      ChapterSelector.tsx  # Unit selection UI + modal descriptions
      QuestionCard.tsx     # Single-question card with options, skip, submit, navigation
      QuestionStatusGrid.tsx # Question navigator grid (colors per status)
      ProgressBar.tsx      # Visual progress across the unit
      Result.tsx           # Result / score screen
      ConfirmQuit.tsx      # Quit confirmation modal
```

> Note: File names may vary slightly as the project evolves, but the structure above reflects the current intent of the app.

---

## Getting Started

These instructions assume you are working from the root of this repository (`QUIZ_ENTC`).

### Prerequisites

- **Node.js**: v18 or newer is recommended (to match Vite 5 requirements).
- **npm** or **yarn**: examples below use `npm`.

### 1. Install dependencies

From the project folder that contains `package.json` (`MCQ_QUIZ-main`):

```bash
cd MCQ_QUIZ-main
npm install
```

### 2. Run the development server

```bash
npm run dev
```

This starts the Vite dev server. Open the URL printed in the terminal (usually `http://localhost:5173`) in your browser.

### 3. Build for production

```bash
npm run build
```

This runs TypeScript type checking and builds an optimized production bundle into the `dist` folder.

### 4. Preview the production build (optional)

```bash
npm run preview
```

This serves the contents of `dist` locally so you can test the production build.

---

## Available NPM Scripts

Defined in `MCQ_QUIZ-main/package.json`:

- `npm run dev` – Start the Vite development server.
- `npm run build` – Type-check (`tsc`) and build the app for production.
- `npm run preview` – Preview the built app locally.
- `npm run start` – Alias to `vite` (dev server).
- `npm run convert-pdf` – Run `scripts/pdf-to-json.js` to convert PDFs of questions into JSON/JS format (helper utility for question creation).
- `npm run verify-questions` – Run `scripts/verify-questions.js` to validate the question data files.

---

## Data / Question Management

- Question banks are organized by **unit** under `src/data/questions/`.
- `src/data/index.ts` aggregates all unit question sets into a single export used by `App.tsx`.
- Each question typically includes:
  - `id` – numeric identifier
  - `chapter` – unit name (e.g. `"UNIT 1"`, `"UNIT 2"`)
  - `question` – question text
  - `options` – array of answer strings
  - `answerIndex` – index of the correct option in the `options` array

There are also supporting types in `src/types.ts` for:

- `UserAnswer` – what the student selected, whether it was correct, and whether it was skipped.
- `QuestionState` – per-question UI state (unanswered, answered, skipped, etc.).
- `ExamResults` – summary of the exam for the current unit.

---

## Core UX Details

- **Skip behavior**: 
  - The Skip button moves to the next question.
  - The question appears in the navigator grid as **Skipped** (usually yellow) so students can revisit it.

- **Navigator grid colors** (may be customized in `QuestionStatusGrid.tsx`):
  - Correct – green
  - Wrong – red
  - Skipped – yellow
  - Unanswered – gray
  - Current question – highlighted with a blue ring

- **Accessibility & keyboard support**:
  - Buttons use ARIA labels where appropriate.
  - Keyboard shortcuts (e.g. numbers for options, arrows for navigation, Enter to submit, `s` to skip) improve usability for power users.

---

## Contributing

If you want to extend this app:

1. Fork the repository on GitHub.
2. Create a feature branch: `git checkout -b feature/my-improvement`.
3. Make your changes inside `MCQ_QUIZ-main/src`.
4. Run `npm run dev` and manually test your changes.
5. Commit and push your branch, then open a pull request.

---

## Notes

- This README describes the current structure and behavior of the project. If you rename folders or add new units/components, you may want to update this document to keep it in sync.
- For deployment (e.g. Netlify, Vercel, GitHub Pages), use the `npm run build` output in `dist`. Deployment steps will depend on your chosen hosting provider.
