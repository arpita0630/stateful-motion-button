import React from 'react';
import { Accessibility, Keyboard, Eye, EyeOff, Volume2 } from 'lucide-react';

export function AccessibilitySection() {
  return (
    <section className="doc-section" id="accessibility">
      <div className="section-title-wrap">
        <Accessibility className="section-icon" size={22} />
        <h2>Accessibility & Reduced Motion</h2>
      </div>
      <p className="section-intro">
        Full inclusion is built directly into the button structure rather than added as an afterthought.
      </p>

      <div className="doc-grid">
        <div className="doc-card">
          <div className="doc-card-header">
            <Keyboard size={18} className="doc-icon" />
            <h4>Semantic HTML & Keyboard Navigation</h4>
          </div>
          <p>
            Built using a true HTML <code>&lt;button&gt;</code> element. Supports native keyboard navigation:
            focus via <kbd>Tab</kbd>, and trigger via <kbd>Enter</kbd> or <kbd>Space</kbd>.
          </p>
        </div>

        <div className="doc-card">
          <div className="doc-card-header">
            <Eye size={18} className="doc-icon" />
            <h4>Visible Focus Indication</h4>
          </div>
          <p>
            Employs a prominent dual-ring <code>:focus-visible</code> visual indicator that highlights keyboard focus without interfering with pointer device clicks.
          </p>
        </div>

        <div className="doc-card">
          <div className="doc-card-header">
            <Volume2 size={18} className="doc-icon" />
            <h4>Dynamic Status Announcements (aria-live)</h4>
          </div>
          <p>
            Includes a visually hidden <code>aria-live="polite"</code> status region that announces dynamic state updates ("Sending...", "Sent!", "Failed — Retry") to screen readers.
          </p>
        </div>

        <div className="doc-card">
          <div className="doc-card-header">
            <EyeOff size={18} className="doc-icon" />
            <h4>Reduced Motion Support (prefers-reduced-motion)</h4>
          </div>
          <p>
            Automatically respects user operating system preferences for reduced motion:
            disables scale, translation, and shake movements while maintaining full text, icon, color, and opacity state indicators.
          </p>
        </div>
      </div>
    </section>
  );
}
