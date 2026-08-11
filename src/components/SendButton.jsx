import React from 'react';
import { StatefulButton } from './StatefulButton';
import { ArrowRight, Send, Loader2, Check, AlertTriangle } from 'lucide-react';

/**
 * SendButton - Specialized Send Message button component.
 * Communicates full lifecycle (idle, loading, success, error, disabled)
 * via intentional motion and state changes.
 */
export function SendButton({
  state,
  onSend,
  disabled = false,
  onInteractionChange,
  className = '',
}) {
  const handleDefaultSend = async () => {
    if (onSend) {
      return await onSend();
    }
    // Default simulated async request: 1s-3s delay, 80% success, 20% failure
    const delay = Math.floor(Math.random() * 2000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
    
    const isSuccess = Math.random() < 0.8;
    if (!isSuccess) {
      throw new Error('Network error (20% simulated failure)');
    }
    return { status: 'sent' };
  };

  return (
    <StatefulButton
      state={state}
      onClick={handleDefaultSend}
      disabled={disabled}
      idleLabel="Send"
      loadingLabel="Sending..."
      successLabel="Sent!"
      errorLabel="Failed — Retry"
      idleIcon={ArrowRight}
      loadingIcon={Loader2}
      successIcon={Check}
      errorIcon={AlertTriangle}
      variant="primary"
      ariaLabel="Send message"
      onInteractionChange={onInteractionChange}
      className={className}
    />
  );
}
