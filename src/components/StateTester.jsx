import React from 'react';
import { CheckCircle2, XCircle, RotateCcw, Ban, Sparkles } from 'lucide-react';

export function StateTester({
  currentState,
  onForceSuccess,
  onForceError,
  onReset,
  isDisabled,
  onToggleDisabled,
}) {
  const isLoading = currentState === 'loading';

  return (
    <div className="tester-card">
      <div className="card-header">
        <Sparkles size={18} className="icon-glow" />
        <h3>Test the states</h3>
      </div>
      <p className="card-description">
        Directly evaluate specific button state machine transitions. Prevents concurrent conflicting triggers during active loading.
      </p>

      <div className="tester-grid">
        {/* Force Success */}
        <button
          type="button"
          className="test-btn test-btn-success"
          onClick={onForceSuccess}
          disabled={isLoading}
          title="Triggers: idle → loading → success → idle"
        >
          <CheckCircle2 size={16} />
          <span>Force Success</span>
        </button>

        {/* Force Error */}
        <button
          type="button"
          className="test-btn test-btn-error"
          onClick={onForceError}
          disabled={isLoading}
          title="Triggers: idle → loading → error"
        >
          <XCircle size={16} />
          <span>Force Error</span>
        </button>

        {/* Toggle Disabled */}
        <button
          type="button"
          className={`test-btn ${isDisabled ? 'test-btn-active' : 'test-btn-neutral'}`}
          onClick={() => onToggleDisabled(!isDisabled)}
          disabled={isLoading}
          title="Toggles disabled state visual emphasis and click prevention"
        >
          <Ban size={16} />
          <span>{isDisabled ? 'Enable Button' : 'Force Disabled'}</span>
        </button>

        {/* Reset State */}
        <button
          type="button"
          className="test-btn test-btn-neutral"
          onClick={onReset}
          disabled={isLoading}
          title="Reset to idle state"
        >
          <RotateCcw size={16} />
          <span>Reset to Idle</span>
        </button>
      </div>

      {isLoading && (
        <div className="tester-notice">
          <span>🔒 Testing controls locked while loading request is active.</span>
        </div>
      )}
    </div>
  );
}
