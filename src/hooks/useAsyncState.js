import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * State machine states:
 * 'idle' | 'loading' | 'success' | 'error' | 'disabled'
 */
export function useAsyncState(initialState = 'idle') {
  const [state, setState] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Timer references for non-conflicting auto-reset cleanups
  const timerRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const clearExistingTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Execute an async task with built-in spam protection and state management
  const execute = useCallback(async (asyncFn) => {
    // Spam protection: ignore clicks if currently loading or disabled
    if (state === 'loading' || state === 'disabled') {
      return;
    }

    clearExistingTimer();
    setState('loading');
    setErrorMessage(null);

    try {
      const result = await asyncFn();
      if (!mountedRef.current) return;

      setState('success');

      // Auto revert from success to idle after 2000ms
      timerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setState('idle');
        }
      }, 2000);

      return result;
    } catch (err) {
      if (!mountedRef.current) return;

      setState('error');
      setErrorMessage(err?.message || 'Action failed');
    }
  }, [state, clearExistingTimer]);

  // Force Success demo flow (idle -> loading -> success -> idle)
  const forceSuccess = useCallback(async () => {
    if (state === 'loading') return;
    
    clearExistingTimer();
    setState('loading');
    setErrorMessage(null);

    timerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      setState('success');

      timerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setState('idle');
        }
      }, 2000);
    }, 1500);
  }, [state, clearExistingTimer]);

  // Force Error demo flow (idle -> loading -> error)
  const forceError = useCallback(async () => {
    if (state === 'loading') return;

    clearExistingTimer();
    setState('loading');
    setErrorMessage(null);

    timerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      setState('error');
      setErrorMessage('Simulated error for testing');
    }, 1500);
  }, [state, clearExistingTimer]);

  const reset = useCallback(() => {
    clearExistingTimer();
    setState('idle');
    setErrorMessage(null);
  }, [clearExistingTimer]);

  const setDisabled = useCallback((disabled) => {
    clearExistingTimer();
    setState(disabled ? 'disabled' : 'idle');
  }, [clearExistingTimer]);

  return {
    state,
    errorMessage,
    execute,
    forceSuccess,
    forceError,
    reset,
    setDisabled,
    isLoading: state === 'loading',
    isSuccess: state === 'success',
    isError: state === 'error',
    isDisabled: state === 'disabled',
  };
}
