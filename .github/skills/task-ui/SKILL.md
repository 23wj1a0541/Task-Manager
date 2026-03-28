---
description: "UI patterns, accessibility rules, and interaction design for the task manager frontend"
applyTo: "**/*.{html,css,js}"
---

# Task Manager UI Skill

## Component Patterns

### Task Input Area
- Text input with placeholder "What needs to be done?"
- Priority dropdown (Low / Medium / High) — default: Medium
- Add button with a "+" icon
- Press Enter to add task (keyboard shortcut)

### Task Item
```
┌──────────────────────────────────────────────┐
│ ○  Task title here                    🔴 ✕   │
│    Priority: Medium                           │
└──────────────────────────────────────────────┘
```
- Circular checkbox on the left (empty = active, green check = done)
- Task title (strikethrough when completed)
- Priority indicator (colored dot: 🟢 Low, 🟡 Medium, 🔴 High)
- Delete button (appears on hover)

### Filter Bar
- Three pill-shaped buttons: All | Active | Completed
- Active filter gets highlighted border
- Task count: "3 of 7 tasks completed"

### Empty State
- Show a friendly message when no tasks exist: "No tasks yet! Add one above to get started 🚀"

## Accessibility

- All interactive elements are focusable
- Use `aria-label` for icon buttons
- Checkbox uses proper `role="checkbox"` with `aria-checked`
- Color is never the only indicator — always pair with text or icons

## localStorage Schema

```javascript
// Key: "taskmanager-tasks"
// Value: JSON array
[
    {
        "id": "unique-id",
        "title": "Task text",
        "priority": "medium",
        "completed": false,
        "createdAt": "2026-03-26T10:00:00Z"
    }
]
```
