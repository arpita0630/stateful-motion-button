# Motion Button Lab

A stateful, production-grade React/Vite UI motion assignment project demonstrating an interactive **Send Message** button that communicates every step of an asynchronous action through intentional motion, visual feedback, state machines, and accessibility standards.

Live Demo: `https://stateful-motion-button.vercel.app` (Placeholder)  
GitHub Repo: `https://github.com/arpita0630/stateful-motion-button`

---

## What this demonstrates

This project demonstrates **stateful UI motion for asynchronous actions**. Rather than serving as mere decoration, motion and visual state changes are used intentionally to communicate the lifecycle of an async request to the user. 

The button component transitions cleanly through distinct states (`idle`, `loading`, `success`, `error`, `disabled`) with layered interaction indicators (`hover`, `pressed`, `focus`), while guaranteeing spam-click protection, zero layout shifts, and full accessibility compliance.

---

## States

| State | Visual Behavior & Motion | Text & Icon Feedback |
| :--- | :--- | :--- |
| **Idle** | Default resting state with primary gradient styling. | `Send →` |
| **Hover** | 150ms ease-out scale up (`scale: 1.03`) and upward lift (`y: -2px`). | Cursor changes to pointer. |
| **Focus** | Prominent dual-ring `:focus-visible` outline for keyboard navigation. | Retains label, visible keyboard focus glow. |
| **Active / Pressed** | 100ms tactile compression (`scale: 0.96`, `y: 0px`). | Immediate tactile feedback. |
| **Loading** | Prevents spam clicks. Smooth 250ms cross-fade slide into loading state. | Spinning Loader + `Sending...` |
| **Success** | Brief 2-second feedback indicator before auto-reverting to idle. | Checkmark icon + `Sent!` |
| **Error** | 400ms single-shot horizontal shake keyframe sequence (`x: [0, -6, 6, -4, 4, -2, 2, 0]`). | Alert triangle + `Failed — Retry` |
| **Disabled** | Reduced opacity, muted background, pointer events blocked. | Reduced visual emphasis. |

---

## Motion decisions

Animation timing and curves were selected with explicit UX intentionality:

1. **Hover Feedback (~150ms ease-out)**
   - *Why 150ms?* 150ms is the optimal threshold for cursor movement feedback. It feels instantaneous without feeling jerky. Uses `cubic-bezier(0.2, 0, 0.2, 1)`.

2. **Press Feedback (~100ms ease-out)**
   - *Why 100ms?* Snappy 100ms scale-down mimics physical button resistance, reassuring the user that their click was registered immediately.

3. **State Cross-Fade & Slide (250ms–300ms ease-out)**
   - *Why 250–300ms?* State content transitions (idle → loading → success/error) need sufficient time for human eyes to digest label changes without abrupt popping.

4. **Single-Shot Error Shake (400ms ease-in-out)**
   - *Why 400ms and single-shot?* A short horizontal shake immediately alerts the user to a request failure. Running the keyframe animation **only once** prevents annoying flickering or motion sickness.

---

## Performance

The button animations strictly prioritize GPU-composited CSS/Framer Motion properties:
- **`transform`** (`scale`, `translateY`, `translateX`, `rotate`)
- **`opacity`**

Properties that trigger heavy browser reflows and layout recalculations—such as `width`, `height`, `margin`, `padding`, `top`, or `left`—are **never animated**. This guarantees a silky-smooth 60 FPS performance across desktop and mobile devices.

---

## Accessibility

1. **Semantic HTML `<button>` Element**
   - Built strictly using native `<button>` tags (never `<div>` elements).
2. **Keyboard Interactivity**
   - Full support for <kbd>Tab</kbd> focus traversal, <kbd>Enter</kbd>, and <kbd>Space</kbd> key invocation.
3. **Visible Focus Ring**
   - High-contrast `:focus-visible` dual-ring outline ensures keyboard users never lose their place.
4. **Dynamic Screen Reader Status (`aria-live="polite"`)**
   - Incorporates a visually hidden live region that announces dynamic state updates ("Sending...", "Sent!", "Failed — Retry") to screen reader users.
5. **Reduced Motion Support (`prefers-reduced-motion: reduce`)**
   - Leverages `useReducedMotion()`. When a user enables reduced motion on their OS, transform movements and error shakes are suppressed, while clear text, icon, and opacity state indicators remain fully intact.

---

## Code Architecture & Reusability

- `src/components/StatefulButton.jsx`: Base motion engine component encapsulating motion variants, interaction listeners, and accessibility traits.
- `src/components/SendButton.jsx`: Reusable specialized Send Message button.
- `src/components/SaveDraftButton.jsx`: Second reusable button instance showing that the motion language applies cleanly to other workflows (e.g. Save Draft).
- `src/hooks/useAsyncState.js`: Clean state machine hook managing async request flow, timers, and spam-click protection.

---

## How to run locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/arpita0630/stateful-motion-button.git

# Navigate to project directory
cd stateful-motion-button

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open your browser at `http://localhost:3000`.

### Building for production

```bash
npm run build
```

---

## Deployment (Vercel)

1. Push code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Build Motion Button Lab demo"
   git push origin main
   ```
2. Connect your GitHub repository to [Vercel](https://vercel.com).
3. Vercel will automatically detect Vite. Keep default build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**.
