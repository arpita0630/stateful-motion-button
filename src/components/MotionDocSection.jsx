import React from 'react';
import { Clock, Cpu, Move, Zap, AlertTriangle } from 'lucide-react';

export function MotionDocSection() {
  return (
    <section className="doc-section" id="motion-decisions">
      <div className="section-title-wrap">
        <Clock className="section-icon" size={22} />
        <h2>Motion Decisions</h2>
      </div>
      <p className="section-intro">
        Every animation duration and easing curve was selected with explicit UX intentionality to make the button feel responsive, tactile, and clear without causing cognitive load.
      </p>

      <div className="doc-grid">
        <div className="doc-card">
          <div className="doc-card-header">
            <Move size={18} className="doc-icon" />
            <h4>Hover Feedback (150ms)</h4>
          </div>
          <p>
            <strong>Duration:</strong> 150ms (Ease-out: <code>cubic-bezier(0.2, 0, 0.2, 1)</code>)<br />
            <strong>Behavior:</strong> Slightly scales up (<code>scale: 1.03</code>) and lifts upward (<code>translateY: -2px</code>).<br />
            <strong>Rationale:</strong> 150ms is fast enough to give immediate cursor intent feedback while remaining silky smooth.
          </p>
        </div>

        <div className="doc-card">
          <div className="doc-card-header">
            <Zap size={18} className="doc-icon" />
            <h4>Press Feedback (100ms)</h4>
          </div>
          <p>
            <strong>Duration:</strong> 100ms (Tactile ease-out)<br />
            <strong>Behavior:</strong> Scales down slightly (<code>scale: 0.96</code>).<br />
            <strong>Rationale:</strong> Snappy 100ms compression mimics physical button resistance and gives instant press confirmation.
          </p>
        </div>

        <div className="doc-card">
          <div className="doc-card-header">
            <Clock size={18} className="doc-icon" />
            <h4>State Cross-Fade (250–300ms)</h4>
          </div>
          <p>
            <strong>Duration:</strong> 250ms–300ms<br />
            <strong>Behavior:</strong> Slide & opacity transition for label/spinner changes.<br />
            <strong>Rationale:</strong> Prevents sudden content pop-in. Gives the eyes enough time to digest label updates ("Sending...", "Sent!", "Failed").
          </p>
        </div>

        <div className="doc-card">
          <div className="doc-card-header">
            <AlertTriangle size={18} className="doc-icon" />
            <h4>1-Shot Error Shake (400ms)</h4>
          </div>
          <p>
            <strong>Duration:</strong> 400ms (Keyframes: <code>[0, -6, 6, -4, 4, -2, 2, 0]</code>)<br />
            <strong>Behavior:</strong> Single horizontal shake sequence.<br />
            <strong>Rationale:</strong> Immediately draws attention to request failure. Runs <em>only once</em> to avoid annoying motion sickness.
          </p>
        </div>

        <div className="doc-card doc-card-wide">
          <div className="doc-card-header">
            <Cpu size={18} className="doc-icon" />
            <h4>Hardware Performance Optimization (GPU Compositing)</h4>
          </div>
          <p>
            All motion properties are restricted strictly to GPU-composited properties: <code>transform</code> (scale, translation, rotate) and <code>opacity</code>. Layout-heavy properties like <code>width</code>, <code>height</code>, <code>margin</code>, and <code>padding</code> are never animated to eliminate browser reflows and frame drops (60fps guaranteed).
          </p>
        </div>
      </div>
    </section>
  );
}
