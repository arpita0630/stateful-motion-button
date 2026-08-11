import React, { useState } from 'react';
import { useAsyncState } from './hooks/useAsyncState';
import { ChatInterface } from './components/ChatInterface';
import { StateTester } from './components/StateTester';
import { StateInspector } from './components/StateInspector';
import { SaveDraftButton } from './components/SaveDraftButton';
import { MotionDocSection } from './components/MotionDocSection';
import { AccessibilitySection } from './components/AccessibilitySection';
import { Sparkles, Layers, Github, ExternalLink, ShieldCheck } from 'lucide-react';

export function App() {
  const {
    state: buttonState,
    execute,
    forceSuccess,
    forceError,
    reset,
    setDisabled,
    errorMessage,
    isDisabled,
  } = useAsyncState('idle');

  // Track interaction telemetry for StateInspector
  const [interactionState, setInteractionState] = useState({
    isHovered: false,
    isPressed: false,
    isFocused: false,
  });

  return (
    <div className="app-container">
      {/* Background Gradient Mesh */}
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      {/* Navigation Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-logo">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="app-title">Motion Button Lab</h1>
              <span className="brand-badge">UI Motion Demo • Portfolio Grade</span>
            </div>
          </div>
          <div className="header-links">
            <a
              href="https://github.com/arpita0630/stateful-motion-button"
              target="_blank"
              rel="noreferrer"
              className="header-link"
            >
              <Github size={16} />
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Hero Banner */}
        <section className="hero-section">
          <h1 className="hero-heading">Motion Button Lab</h1>
          <p className="hero-description">
            A stateful button that communicates every step of an async action.
          </p>
        </section>

        {/* Workspace Layout Grid */}
        <div className="workspace-grid">
          {/* Main Demo Card: Chat Interface containing Main Button */}
          <div className="workspace-main">
            <ChatInterface
              buttonState={buttonState}
              onSendClick={execute}
              disabled={isDisabled}
              onInteractionChange={setInteractionState}
            />

            {/* Optional Second Reusable Button Demo */}
            <div className="secondary-demo-card">
              <div className="card-header">
                <Layers size={18} className="icon-glow-cyan" />
                <h3>Second Reusable Button Demo</h3>
              </div>
              <p className="card-description">
                Demonstrates that the exact same stateful motion engine is fully reusable for different workflows (e.g. <em>Save Draft</em>).
              </p>
              <div className="secondary-btn-wrapper">
                <SaveDraftButton disabled={isDisabled} />
              </div>
            </div>
          </div>

          {/* Sidebar Controls & Inspector */}
          <aside className="workspace-sidebar">
            <StateTester
              currentState={buttonState}
              onForceSuccess={forceSuccess}
              onForceError={forceError}
              onReset={reset}
              isDisabled={isDisabled}
              onToggleDisabled={setDisabled}
            />

            <StateInspector
              state={buttonState}
              interactionState={interactionState}
              disabled={isDisabled}
              errorMessage={errorMessage}
            />
          </aside>
        </div>

        {/* Documentation Sections */}
        <MotionDocSection />
        <AccessibilitySection />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Designed & Built for UI Motion Assignment • Powered by React, Vite & Framer Motion
        </p>
      </footer>
    </div>
  );
}

export default App;
