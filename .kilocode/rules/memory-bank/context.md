# Active Context: Satirical Reverse UX Chat Interface

## Current State

**Project Status**: ✅ Complete

A satirical "reverse UX" AI chat interface that looks like Kilo Chat but works in the most annoying, backwards way possible.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] Satirical reverse UX chat interface built
- [x] Redesigned to professional dark theme layout

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Reverse UX chat interface | ✅ Complete |
| `src/app/layout.tsx` | Root layout with metadata | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

**Satirical Reverse UX Chat Interface** - A fully functional (but intentionally annoying) chat UI with:

1. **Professional Dark Theme**: Dark grey (#1e1e1e) background with white text
2. **Centered Layout**: Header and subheader centered horizontally
3. **Input at Bottom**: Textarea with placeholder "Message Kilo Chat" (#9ca3af) at bottom of screen
4. **Buttons Inside Input**: Deep thinking, model dropdown, and submit button inside the input container
5. **Submit Validation**: Button disabled when empty, enabled when text is entered
6. **Removed Contenteditable**: Main page area is no longer editable - user types only in input box
7. **Inverted UX**: Input stays on main page after submit, response appears in input area
8. **Typing Animation**: Slow, deliberate with sarcastic responses
9. **Error Messages**: Random rate limit, credit exhaustion, or context exceeded errors
10. **Ad Popups**: Windows 95/98 style popup ads on click
11. **404 Page**: After 4th click anywhere, shows 404 error

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add more recipes (auth, email, etc.)
- [ ] Add example components
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| Today | Built satirical reverse UX chat interface with inverted functionality |
| Today | Redesigned to professional dark theme with centered layout, input inside container, submit button validation |
