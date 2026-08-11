import React from 'react';
import { StatefulButton } from './StatefulButton';
import { useAsyncState } from '../hooks/useAsyncState';
import { Bookmark, Loader2, Check, AlertCircle } from 'lucide-react';

/**
 * SaveDraftButton - Second reusable button using the exact same motion language
 * Demonstrates reusability of the stateful motion engine across different UI workflows.
 */
export function SaveDraftButton({ disabled = false }) {
  const { state, execute } = useAsyncState('idle');

  const handleSave = () => {
    execute(async () => {
      // Simulate 1.5s draft save
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return { savedAt: new Date().toISOString() };
    });
  };

  return (
    <StatefulButton
      state={state}
      onClick={handleSave}
      disabled={disabled}
      idleLabel="Save Draft"
      loadingLabel="Saving..."
      successLabel="✓ Saved"
      errorLabel="Save Failed — Retry"
      idleIcon={Bookmark}
      loadingIcon={Loader2}
      successIcon={Check}
      errorIcon={AlertCircle}
      variant="secondary"
      ariaLabel="Save draft"
    />
  );
}
