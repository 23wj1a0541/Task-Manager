# Copilot Instructions — Hands-on Lab: Task Manager App

## Project Overview

A **personal task manager web application** built during the GitHub Copilot Dev Days 2026 hands-on session. This is a beginner-friendly project designed to teach attendees how to use Copilot Agent Mode effectively.

---

## Tech Stack (MUST follow)

- **Frontend:** HTML, CSS, JavaScript (vanilla — no frameworks, keep it simple)
- **Styling:** Modern CSS with CSS variables, dark theme
- **Storage:** Browser localStorage (no backend needed — zero setup!)
- **No build tools required** — just open `index.html` in a browser

---

## Design System

- **Theme:** Dark mode inspired by GitHub
  - Background: `#0d1117`
  - Cards: `#161b22`
  - Borders: `#30363d`
  - Text: `#e6edf3`
  - Muted text: `#8b949e`
- **Accent colors:**
  - Blue: `#58a6ff` (links, active states)
  - Green: `#3fb950` (success, completed tasks)
  - Red: `#f85149` (delete, high priority)
  - Yellow: `#d29922` (medium priority)
  - Purple: `#bc8cff` (tags)
- **Border radius:** 12px for cards, 8px for buttons/inputs
- **Transitions:** 0.2s ease on all interactive elements

---

## Features to Build

1. **Add tasks** with a title and optional priority (Low / Medium / High)
2. **Mark tasks as complete** (strikethrough + green check)
3. **Delete tasks** with a confirmation
4. **Filter tasks** by: All / Active / Completed
5. **Task counter** showing "X of Y tasks completed"
6. **Persist tasks** in localStorage so they survive page refresh
7. **Clean, responsive UI** that works on both desktop and mobile

---

## Code Style

- Use semantic HTML5 elements
- CSS custom properties (variables) for theming
- JavaScript ES6+ features (arrow functions, template literals, destructuring)
- Event delegation for dynamic elements
- No inline styles — all styling in CSS
- Functions should be small and do one thing

---

## File Structure

```
task-manager/
├── index.html      # Main HTML structure
├── style.css       # All styles with CSS variables
└── app.js          # Application logic
```

Keep it to 3 files only. Simple, clean, and easy to understand.
