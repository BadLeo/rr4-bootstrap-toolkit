---
name: rr4-ui-repo
description: Use this skill when working in the RR4 UI Toolkit repository. It covers the project structure, visual constraints, static-site workflow, and the repository standards expected for changes to the RR4-inspired Bootstrap showcase and cookbook.
---

# RR4 UI Repository Skill

## Purpose

This repository is a static frontend project with two primary pages:

- `index.html`: showcase and landing page
- `cookbook.html`: component cookbook with live examples and sample markup

Shared assets live in `assets/`:

- `assets/toolkit.css`: RR4 visual system and component styling
- `assets/toolkit.js`: reveal motion, hover interaction, smooth scrolling, and live clock behavior
- `assets/images/`: reference imagery used by the showcase and cookbook

## Working Rules

- Preserve the RR4-inspired visual language. Changes should feel deliberate and on-theme, not generic Bootstrap defaults.
- Prefer semantic HTML and maintain accessibility basics such as `alt`, `aria-*`, and reduced-motion-safe behavior.
- Keep the project static unless a real requirement justifies adding tooling.
- Avoid introducing frameworks or package dependencies without explicit user approval.
- Use CDN-backed dependencies consistently when editing the existing pages.
- Treat `index.html` and `cookbook.html` as the source of truth for usage examples and documentation.

## Repository Standards

When making repository-level improvements, keep these files aligned with the codebase:

- `README.md`: setup, purpose, publishing, and structure
- `CHANGELOG.md`: notable changes
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`: collaboration and reporting guidance
- `.github/`: issue and pull request templates

If project behavior changes, update documentation in the same pass.

## Common Tasks

### Update visuals or components

1. Inspect the relevant section in `index.html` or `cookbook.html`.
2. Update styles in `assets/toolkit.css`.
3. Only touch `assets/toolkit.js` if interaction or animation behavior must change.
4. Check that the cookbook example still matches the live component.

### Add a new showcase pattern

1. Add the live implementation to the appropriate page.
2. If the pattern is reusable, add a cookbook section with example markup.
3. Reuse existing RR4 classes where possible before creating new ones.

### Prepare for publishing

1. Keep repository metadata current.
2. Avoid ignoring tracked documentation directories accidentally.
3. Make sure static assets are referenced with relative paths that work on GitHub Pages.

## Validation

For any meaningful UI change, verify:

- the page still loads as a static site
- mobile and desktop layouts still hold
- reduced-motion users are not forced through motion-heavy interactions
- showcase and cookbook stay visually consistent

If browser automation is needed, use the Playwright skill rather than guessing at visual behavior.
