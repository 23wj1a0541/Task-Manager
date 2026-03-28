# 🛠️ Hands-on Lab — Build a Task Manager with GitHub Copilot

## Welcome! 👋

In this hands-on session, you'll build a **Task Manager web app** from scratch using **GitHub Copilot Agent Mode** in VS Code. No frameworks, no build tools — just HTML, CSS, JavaScript, and Copilot doing the heavy lifting.

**Time:** ~45-60 minutes
**Level:** Beginner-friendly (some coding experience helpful)
**What you'll need:** VS Code + GitHub Copilot extension + a browser

---

## ✅ Pre-requisites Checklist

Before starting, make sure you have:

- [ ] **VS Code** installed and up to date
- [ ] **GitHub account** — sign in within VS Code
- [ ] **GitHub Copilot extension** installed and active (free tier works!)
- [ ] Created a **new empty folder** on your laptop called `task-manager`

---

## Step 0: Set Up the Project (2 min)

### Open VS Code
1. Open VS Code
2. `File` → `Open Folder` → select your empty `task-manager` folder
3. Open Copilot Chat: `Ctrl+L` (Windows/Linux) or `Cmd+L` (Mac)
4. **Switch to Agent Mode**: Click the mode dropdown at the top of the chat panel and select **"Agent"**

### Create the Instructions File First

**Prompt — paste this into Copilot Chat:**

```
Create a .github/copilot-instructions.md file for a task manager web app with this spec:

- Vanilla HTML, CSS, JavaScript (no frameworks)
- Dark theme inspired by GitHub (background #0d1117, cards #161b22, borders #30363d)
- Features: add tasks with priority (Low/Medium/High), mark complete, delete, filter by status
- Store data in browser localStorage
- 3 files only: index.html, style.css, app.js
- Modern CSS with variables, ES6+ JavaScript
- Mobile responsive
```

### 🎙️ What Just Happened:
> You just created your own copilot-instructions file! From now on, every prompt you give Copilot will follow these rules. This is **context engineering** — you're teaching your AI assistant about your project before writing any code.

---

## Step 1: Build the App (5-7 min) ⭐ THE BIG ONE

This is the main event. One prompt creates the entire app.

**Prompt:**

```
Build the complete task manager app following the copilot-instructions. Create all 3 files:

1. index.html - semantic HTML structure with the input area, task list, and filter bar
2. style.css - dark theme with CSS variables, responsive design, smooth transitions, hover states
3. app.js - full functionality: add/complete/delete tasks, filtering, localStorage persistence, task counter

Make it look polished and professional. The empty state should show a friendly message.
```

### ⏱️ While Copilot Works:
Watch how Agent Mode:
- Reads your copilot-instructions.md first
- Creates files one by one
- Writes HTML, CSS, and JS that all work together
- Follows your dark theme colors exactly

### ✅ Test It:
1. Right-click `index.html` in the file explorer
2. Select **"Open with Live Server"** (or just double-click to open in browser)
3. Try adding a task, marking it complete, and refreshing the page!

> **No Live Server?** Just open the file directly: right-click `index.html` → "Reveal in File Explorer" → double-click it

---

## Step 2: Add a Feature — Due Dates (5 min)

Let's iterate! Ask Copilot to add something new.

**Prompt:**

```
Add a due date feature to the task manager:
- Add a date picker input next to the priority dropdown
- Show the due date on each task card
- Tasks that are overdue should have a red border and show "Overdue!" in red text
- Due dates are optional
- Update the localStorage schema to include the due date
```

### ✅ Test It:
- Add a task with a date in the past — it should show as overdue
- Add a task with a future date — should display normally
- Add a task with no date — should work fine without one

---

## Step 3: Make It Beautiful — Animations (3 min)

**Prompt:**

```
Add smooth animations to the task manager:
- Tasks should slide in from the left when added (with a subtle fade)
- Tasks should fade out and collapse when deleted
- The checkbox should have a satisfying scale animation when clicked
- Add a subtle gradient glow effect on the input when focused
```

---

## Step 4: Add Search (3 min)

**Prompt:**

```
Add a search bar above the task list that filters tasks in real-time as the user types. The search should:
- Filter by task title (case-insensitive)
- Show "No matching tasks" when nothing matches
- Have a clear button (X) inside the search input
- Work together with the existing All/Active/Completed filters
```

---

## Step 5: Export Feature (3 min)

**Prompt:**

```
Add a "Download Tasks" button in the header that exports all tasks as a nicely formatted text file. The format should be:

📋 My Tasks - Exported on [date]
================================

✅ [COMPLETED] Buy groceries (Priority: High, Due: 2026-03-28)
○  [ACTIVE] Finish project report (Priority: Medium)
○  [ACTIVE] Call dentist (Priority: Low, Due: 2026-04-01) ⚠️ OVERDUE

Summary: 1 of 3 tasks completed
```

---

## Step 6: Use the Code Reviewer Agent (3 min)

If your project has the `.github/agents/code-reviewer.agent.md` file, try this:

**Prompt:**

```
@code-reviewer Review my task manager app. Check the code quality, accessibility, and security of all three files.
```

> This uses a **custom agent** — a specialized persona we defined. Copilot switches to reviewer mode and gives structured feedback.

---

## 🏆 Bonus Challenges (If You Finish Early!)

Try these extra prompts on your own:

### Challenge A: Dark/Light Theme Toggle
```
Add a theme toggle button (🌙/☀️) in the header that switches between dark and light mode. Save the preference in localStorage.
```

### Challenge B: Task Categories
```
Add color-coded categories/tags to tasks (Work, Personal, Shopping, Health). Users can select a category when creating a task and filter by category.
```

### Challenge C: Drag and Drop
```
Make the task list sortable with drag and drop. Users should be able to reorder tasks by dragging them. Save the custom order in localStorage.
```

### Challenge D: Keyboard Shortcuts
```
Add keyboard shortcuts: Ctrl+N to focus the new task input, Ctrl+F to focus search, Escape to clear filters, and show a "?" help overlay listing all shortcuts.
```

---

## 💡 Tips for Great Prompts

| ✅ Do This | ❌ Avoid This |
|-----------|--------------|
| Be specific about what you want | Vague prompts like "make it better" |
| Describe the behavior clearly | Only describing the visual appearance |
| Mention edge cases | Assuming Copilot knows your intent |
| Iterate in small steps | Asking for everything at once |
| Reference existing code | Starting from scratch each time |

### Useful Follow-up Phrases:
- *"There's a bug — when I [action], [unexpected behavior]. Fix it."*
- *"The [component] doesn't look right. Make it match the dark theme."*
- *"Add error handling for when [edge case]."*
- *"Refactor this to be cleaner without changing behavior."*
- *"Fix the errors"* — Agent Mode reads terminal output and self-corrects!

---

## 📁 What You Built Today

```
task-manager/
├── .github/
│   └── copilot-instructions.md    ← Your AI configuration
├── index.html                      ← App structure
├── style.css                       ← Dark theme styling
└── app.js                          ← All the logic
```

### Key Takeaways:
1. **copilot-instructions.md** = teach Copilot your project rules
2. **Agent Mode** = multi-file creation and iteration with one prompt
3. **Context engineering** = better context → better code
4. **Iteration** = refine with follow-up prompts, just like pair programming

---

## 🙋 Need Help?

- **Raise your hand** — Satya & Vikas are walking around!
- **Copilot not responding?** Try refreshing VS Code (`Ctrl+Shift+P` → "Reload Window")
- **Code broken?** Tell Copilot: *"There are errors. Fix all issues so the app works."*
- **Want to start over?** Delete all files and begin from Step 1

**Happy building! 🚀**
