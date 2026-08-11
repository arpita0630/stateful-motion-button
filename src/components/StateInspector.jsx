import React from 'react';
import { Activity, ShieldCheck, Eye, MousePointer, Focus, Zap } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

export function StateInspector({ state, interactionState, disabled, errorMessage }) {
  const shouldReduceMotion = useReducedMotion();

  const getStateBadgeClass = () => {
    switch (state) {
      case 'loading': return 'badge-loading';
      case 'success': return 'badge-success';
      case 'error': return 'badge-error';
      case 'disabled': return 'badge-disabled';
      default: return 'badge-idle';
    }
  };

  return (
    <div className="inspector-card">
      <div className="card-header">
        <Activity size={18} className="icon-glow-cyan" />
        <h3>State Machine Inspector</h3>
        <span className="live-pill">LIVE</span>
      </div>

      <div className="inspector-grid">
        {/* Core Machine State */}
        <div className="inspector-item">
          <span className="item-label">
            <Zap size={14} /> Machine State
          </span>
          <span className={`state-badge ${getStateBadgeClass()}`}>
            {state.toUpperCase()}
          </span>
        </div>

        {/* Hover State */}
        <div className="inspector-item">
          <span className="item-label">
            <Eye size={14} /> Visual Hover
          </span>
          <span className={`boolean-pill ${interactionState.isHovered ? 'true' : 'false'}`}>
            {interactionState.isHovered ? 'TRUE (scale 1.03, y -2px)' : 'FALSE'}
          </span>
        </div>

        {/* Press State */}
        <div className="inspector-item">
          <span className="item-label">
            <MousePointer size={14} /> Active / Pressed
          </span>
          <span className={`boolean-pill ${interactionState.isPressed ? 'true' : 'false'}`}>
            {interactionState.isPressed ? 'TRUE (scale 0.96)' : 'FALSE'}
          </span>
        </div>

        {/* Focus State */}
        <div className="inspector-item">
          <span className="item-label">
            <Focus size={14} /> Keyboard Focused
          </span>
          <span className={`boolean-pill ${interactionState.isFocused ? 'true' : 'false'}`}>
            {interactionState.isFocused ? 'TRUE (:focus-visible ring)' : 'FALSE'}
          </span>
        </div>

        {/* Reduced Motion */}
        <div className="inspector-item">
          <span className="item-label">
            <ShieldCheck size={14} /> Reduced Motion
          </span>
          <span className={`boolean-pill ${shouldReduceMotion ? 'active' : 'neutral'}`}>
            {shouldReduceMotion ? 'ENABLED (transforms suppressed)' : 'STANDARD MOTION'}
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="inspector-error-msg">
          <span>Error Detail: {errorMessage}</span>
        </div>
      )}
    </div>
  );
}
