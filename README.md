# Motion Button Lab

> A production-quality, highly accessible React + Vite UI motion assignment demonstrating a state-driven **Send Message** button that communicates every step of an asynchronous lifecycle through intentional motion, visual state changes, and GPU-composited animations.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11.17-0055FF.svg?logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

* **Live Demo:** [https://stateful-motion-button.vercel.app](https://stateful-motion-button.vercel.app) *(Placeholder)*
* **GitHub Repository:** [https://github.com/arpita0630/stateful-motion-button](https://github.com/arpita0630/stateful-motion-button)

---

## Table of Contents

- [What this demonstrates](#what-this-demonstrates)
- [State Machine Architecture](#state-machine-architecture)
- [Interactive Button States](#interactive-button-states)
- [Motion Decisions & Timing Rationale](#motion-decisions--timing-rationale)
- [Performance & GPU Compositing](#performance--gpu-compositing)
- [Accessibility & Reduced Motion](#accessibility--reduced-motion)
- [Spam-Click & Robustness Protection](#spam-click--robustness-protection)
- [Component API & Reusability](#component-api--reusability)
- [Project Directory Structure](#project-directory-structure)
- [How to Run Locally](#how-to-run-locally)
- [Deployment (Vercel)](#deployment-vercel)
- [Viva & Interview Q&A Guide](#viva--interview-qa-guide)

---

## What this demonstrates

This project demonstrates **stateful UI motion for asynchronous actions**. Rather than using motion as mere decorative eye-candy, every transition, color shift, icon morph, and scale movement serves a deliberate UX purpose: to communicate exactly what is happening under the hood.

### Key Highlights
- **Full Async Lifecycle:** Communicates `idle`, `loading`, `success`, `error`, and `disabled` states smoothly.
- **Layered Interaction States:** `hover`, `pressed`, and `focus-visible` visual feedback operate seamlessly on top of the underlying state machine.
- **Zero Layout Shifts (60 FPS):** All animations exclusively manipulate `transform` and `opacity` GPU properties.
- **Spam Protection:** Multi-click debounce and state-lock prevent concurrent async requests or corrupted animation loops.
- **Strict Accessibility:** Semantic `<button>`, high-contrast focus rings, `aria-live` dynamic screen reader updates, and full `prefers-reduced-motion` OS support.

---

## State Machine Architecture

The component is governed by an explicit state machine rather than uncontrolled boolean flags or arbitrary DOM manipulation:

```
           ┌──────────┐
           │   IDLE   │◄─────────────────────────────┐
           └────┬─────┘                              │ (Auto-revert timer after 2s)
                │ (User Click / Submit)              │
                ▼                                    │
           ┌──────────┐                              │
           │ LOADING  │                              │
           └─┬──────┬─┘                              │
  (Success)  │      │ (Failure)                      │
             ▼      ▼                                │
   ┌──────────┐   ┌──────────┐                       │
   │ SUCCESS  │   │  ERROR   │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
   └────┬─────┘   └────┬─────┘ (Click to Retry)
        │              │
        └──────────────┘
```

The custom `useAsyncState` hook manages state transitions, ensures non-conflicting timers, and auto-cleans memory when components unmount.

---

## Interactive Button States

| State | Visual Feedback & Motion | Text & Icon Indicator | Interaction Behavior |
| :--- | :--- | :--- | :--- |
| **Idle** | Resting state with primary indigo/cyan gradient styling and soft shadow. | `Send →` | Accepts mouse hover, focus, and clicks. |
| **Hover** | ~150ms scale-up (`scale: 1.03`) and upward lift (`y: -2px`). | Cursor becomes `pointer`. | Visual hover indicator layered on idle/error. |
| **Focus** | High-contrast dual-ring outline (`:focus-visible`). | Retains state text + visible focus glow. | Keyboard focus active via <kbd>Tab</kbd>. |
| **Active / Pressed** | ~100ms tactile compression (`scale: 0.96`, `y: 0px`). | Immediate mechanical press feedback. | Triggered on mouse click or <kbd>Space</kbd>/<kbd>Enter</kbd>. |
| **Loading** | Smooth 250ms cross-fade slide. Background switches to deep indigo. | `Sending...` + Spinning Loader icon. | **Spam protected.** Clicks are ignored. Cursor is `wait`. |
| **Success** | Emerald green glow transition (`scale: 1.0` pop). Auto-reverts after 2s. | `Sent!` + Checkmark icon. | Success confirmation state. |
| **Error** | Rose red styling + **400ms single-shot horizontal shake keyframe**. | `Failed — Retry` + Alert Triangle icon. | Click to retry re-enters `loading` state. |
| **Disabled** | 65% opacity, muted grey background, flat shadow. | Reduced emphasis. | Pointer events disabled (`cursor: not-allowed`). |

---

## Motion Decisions & Timing Rationale

Motion parameters are tuned for optimal perceived responsiveness and user comfort:

```
Interaction Timeline:
[Press: 100ms] ──► [Loading Fade: 250ms] ──► [Async Request: 1-3s] ──► [Success/Error Fade: 250ms]
```

1. **Hover Feedback (~150ms ease-out)**
   - **Duration:** 150ms (`cubic-bezier(0.2, 0, 0.2, 1)`)
   - **Rationale:** 150ms is the cognitive sweet spot for cursor intent. It feels instantaneous without abrupt popping.
2. **Press / Tactile Feedback (~100ms ease-out)**
   - **Duration:** 100ms
   - **Rationale:** A snappy 100ms compression (`scale: 0.96`) mimics physical button resistance and provides immediate tactile confirmation.
3. **State Content Cross-Fade (250ms–300ms ease-out)**
   - **Duration:** 250ms–300ms
   - **Rationale:** When transitioning between labels ("Send" → "Sending..." → "Sent!"), 250ms gives human eyes adequate time to process text changes smoothly.
4. **Single-Shot Error Shake (400ms ease-in-out)**
   - **Duration:** 400ms (Keyframes: `x: [0, -6, 6, -4, 4, -2, 2, 0]`)
   - **Rationale:** A short horizontal shake immediately alerts the user to an unexpected request failure. Executing the keyframe sequence **only once** avoids motion sickness and visual clutter.

---

## Performance & GPU Compositing

To guarantee a stable 60 FPS frame rate on all devices, the button **never animates layout-heavy CSS properties** such as:
- ❌ `width` / `height`
- ❌ `margin` / `padding`
- ❌ `top` / `left` / `bottom` / `right`

Instead, all motion transitions strictly utilize GPU-composited properties:
- ✅ **`transform`** (`scale`, `translateY`, `translateX`, `rotate`)
- ✅ **`opacity`**

This eliminates browser reflows and paint bottlenecks.

---

## Accessibility & Reduced Motion

Accessibility is built directly into the component's foundation:

- **Semantic HTML `<button>` Element:** Uses real `<button type="button">` tags—never `<div>` elements.
- **Keyboard Navigation:** Full support for <kbd>Tab</kbd> focus traversal and triggering via <kbd>Enter</kbd> or <kbd>Space</kbd>.
- **Visible Focus Ring:** Clear `:focus-visible` dual-ring glow ensures keyboard users maintain focus context without pointer artifact rings.
- **Dynamic Screen Reader Status (`aria-live="polite"`):** Visually hidden live region announces dynamic state changes ("Sending...", "Sent!", "Failed — Retry") to assistive screen readers.
- **Reduced Motion Support (`prefers-reduced-motion: reduce`):** Integrates Framer Motion's `useReducedMotion()`. When reduced motion is enabled on the OS, transforms and shakes are completely suppressed while text, icon, color, and opacity state changes remain 100% visible.

---

## Spam-Click & Robustness Protection

The button is resilient against chaotic real-world user interactions:

1. **Duplicate Request Prevention:** Clicks emitted during the `loading` state are safely ignored.
2. **Timer Cleanup:** Non-conflicting timers prevent race conditions when rapid clicks or manual state resets occur.
3. **Rapid Hover/Focus Isolation:** Rapid mouse enter/leave or focus/blur events operate independently without breaking active state transitions.

---

## Component API & Reusability

### `<StatefulButton />` Core Component Props

```jsx
import { StatefulButton } from './components/StatefulButton';

<StatefulButton
  state="idle"                   // 'idle' | 'loading' | 'success' | 'error' | 'disabled'
  onClick={handleClick}          // Function triggered on user click
  disabled={false}              // Boolean to force disabled state
  idleLabel="Send"              // Resting state label
  loadingLabel="Sending..."      // Loading state label
  successLabel="Sent!"           // Success state label
  errorLabel="Failed — Retry"    // Error state label
  idleIcon={ArrowRight}          // Lucide icon component for idle
  loadingIcon={Loader2}          // Lucide icon component for spinner
  successIcon={Check}            // Lucide icon component for success
  errorIcon={AlertTriangle}      // Lucide icon component for error
  variant="primary"              // 'primary' | 'secondary'
/>
```

### Specialized Components
- **`<SendButton />`**: Pre-configured for AI Chat input with 80/20 fake async request simulation.
- **`<SaveDraftButton />`**: Demonstrates reusability of the same motion system for a secondary workflow ("Save Draft" → "Saving..." → "✓ Saved").

---

## Project Directory Structure

```
stateful-motion-button/
├── public/
├── src/
│   ├── components/
│   │   ├── StatefulButton.jsx       # Base reusable motion button engine
│   │   ├── SendButton.jsx           # Specialized Send Message button
│   │   ├── SaveDraftButton.jsx      # Second reusable motion button ("Save Draft")
│   │   ├── ChatInterface.jsx        # AI-chat workspace card container
│   │   ├── StateTester.jsx          # Test controls (Force Success, Force Error, Disabled)
│   │   ├── StateInspector.jsx       # Live visual state machine debugger
│   │   ├── MotionDocSection.jsx     # "Motion decisions" timing & easing documentation
│   │   └── AccessibilitySection.jsx # "Accessibility" & reduced motion documentation
│   ├── hooks/
│   │   └── useAsyncState.js         # Custom state machine management hook
│   ├── styles/
│   │   └── index.css                # Dark theme design system and state styles
│   ├── App.jsx                      # Main lab layout container
│   └── main.jsx                     # React DOM root entrypoint
├── index.html                       # HTML template with Google Fonts
├── vite.config.js                   # Vite configuration file
├── package.json                     # Dependencies & build scripts
└── README.md                        # Portfolio documentation
```

---

## How to Run Locally

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/arpita0630/stateful-motion-button.git

# 2. Change directory
cd stateful-motion-button

# 3. Install project dependencies
npm install

# 4. Launch Vite development server
npm run dev
```

Visit `http://localhost:3000` in your web browser.

### Production Build & Preview

```bash
# Bundle project for production
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment (Vercel)

Deploying to Vercel takes less than a minute:

1. Push code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Deploy Motion Button Lab demo"
   git push origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Select the repository: `arpita0630/stateful-motion-button`.
4. Keep default settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**.

---

## Viva & Interview Q&A Guide

**Q: Why use `transform` and `opacity` instead of animating `width` or `margin`?**  
*A: Animating layout properties causes browser reflows and repaints on every frame, consuming main-thread CPU. `transform` and `opacity` are composited directly on the GPU, guaranteeing 60 FPS performance.*

**Q: How does the button prevent duplicate requests if a user spam-clicks?**  
*A: The custom `useAsyncState` hook enforces an explicit state check. If the button is in the `loading` or `disabled` state, incoming click events are immediately returned without triggering duplicate promises.*

**Q: How is reduced motion handled?**  
*A: We utilize Framer Motion's `useReducedMotion()` hook to query the OS `prefers-reduced-motion: reduce` preference. When active, spatial motion (scale, translation, shake) is disabled while text, icon, color, and opacity state changes remain fully visible.*

---

*Built with precision for the UI Motion Assignment.*
