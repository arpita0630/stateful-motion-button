import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Loader2, Check, AlertTriangle, ArrowRight } from 'lucide-react';

/**
 * StatefulButton - Core reusable motion button component
 *
 * Demonstrates full state machine lifecycle:
 * idle -> loading -> success / error | disabled
 *
 * Features:
 * - GPU-composited animations (transform, opacity ONLY)
 * - 150ms hover, 100ms press, 250-300ms state transition, 400ms 1-shot shake
 * - Full accessibility: semantic <button>, keyboard support, focus ring, aria-live status
 * - Reduced motion support (suppresses movement, maintains visual state feedback)
 * - Spam click protection
 */
export function StatefulButton({
  state = 'idle', // 'idle' | 'loading' | 'success' | 'error' | 'disabled'
  onClick,
  disabled = false,
  idleLabel = 'Send',
  loadingLabel = 'Sending...',
  successLabel = 'Sent!',
  errorLabel = 'Failed — Retry',
  idleIcon: IdleIcon = ArrowRight,
  loadingIcon: LoadingIcon = Loader2,
  successIcon: SuccessIcon = Check,
  errorIcon: ErrorIcon = AlertTriangle,
  variant = 'primary', // 'primary' | 'secondary' | 'emerald'
  ariaLabel,
  onInteractionChange,
  className = '',
  style = {},
}) {
  const shouldReduceMotion = useReducedMotion();

  // Layered visual interaction states
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isEffectiveDisabled = disabled || state === 'disabled';
  const isLoading = state === 'loading';
  const isSuccess = state === 'success';
  const isError = state === 'error';

  // Notify parent of interaction state updates (for debugger/inspector)
  const updateInteraction = (type, val) => {
    if (type === 'hover') setIsHovered(val);
    if (type === 'press') setIsPressed(val);
    if (type === 'focus') setIsFocused(val);

    if (onInteractionChange) {
      onInteractionChange({
        isHovered: type === 'hover' ? val : isHovered,
        isPressed: type === 'press' ? val : isPressed,
        isFocused: type === 'focus' ? val : isFocused,
      });
    }
  };

  // Safe click handler preventing spam triggers during loading/disabled
  const handleClick = (e) => {
    if (isEffectiveDisabled || isLoading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  // Easing definitions
  const easeOutCustom = [0.2, 0, 0.2, 1]; // ~150ms / 250ms smooth ease-out

  // Shake keyframes for 1-shot error motion (350–450ms duration)
  const shakeKeyframes = shouldReduceMotion
    ? [0]
    : [0, -6, 6, -4, 4, -2, 2, 0];

  // Button background & status variant styling classes
  const getVariantClass = () => {
    if (isEffectiveDisabled) return 'btn-disabled';
    if (isError) return 'btn-error';
    if (isSuccess) return 'btn-success';
    if (isLoading) return 'btn-loading';
    return `btn-${variant}`;
  };

  return (
    <div className="stateful-button-wrapper">
      {/* Dynamic Screen Reader Live Region for Accessibility */}
      <span className="sr-only" aria-live="polite" role="status">
        {isLoading && loadingLabel}
        {isSuccess && successLabel}
        {isError && errorLabel}
        {!isLoading && !isSuccess && !isError && idleLabel}
      </span>

      <motion.button
        type="button"
        disabled={isEffectiveDisabled}
        onClick={handleClick}
        aria-label={ariaLabel || (typeof idleLabel === 'string' ? idleLabel : 'Interactive Button')}
        aria-disabled={isEffectiveDisabled}
        aria-busy={isLoading}
        className={`stateful-button ${getVariantClass()} ${className}`}
        style={style}
        // Hover animation (150ms ease-out, transform scale/translateY ONLY)
        whileHover={
          !isEffectiveDisabled && !isLoading && !shouldReduceMotion
            ? { scale: 1.03, y: -2 }
            : {}
        }
        // Press animation (100ms ease-out, tactile scale down)
        whileTap={
          !isEffectiveDisabled && !isLoading && !shouldReduceMotion
            ? { scale: 0.96, y: 0 }
            : {}
        }
        // Shake animation triggered ONLY ONCE on error state transition
        animate={
          isError && !shouldReduceMotion
            ? { x: shakeKeyframes }
            : { x: 0 }
        }
        transition={{
          // Hover/Tap transitions
          hover: { duration: 0.15, ease: easeOutCustom },
          tap: { duration: 0.10, ease: easeOutCustom },
          // Error shake timing (400ms)
          x: { duration: 0.40, ease: 'easeInOut' },
        }}
        onHoverStart={() => updateInteraction('hover', true)}
        onHoverEnd={() => updateInteraction('hover', false)}
        onTapStart={() => updateInteraction('press', true)}
        onTapEnd={() => updateInteraction('press', false)}
        onFocus={() => updateInteraction('focus', true)}
        onBlur={() => updateInteraction('focus', false)}
      >
        <AnimatePresence mode="wait" initial={false}>
          {/* LOADING STATE */}
          {isLoading && (
            <motion.span
              key="loading"
              className="btn-content-inner"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: shouldReduceMotion ? 0.08 : 0.25, ease: easeOutCustom }}
            >
              {LoadingIcon && (
                <motion.span
                  className="btn-icon spinner-icon"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                >
                  <LoadingIcon size={18} aria-hidden="true" />
                </motion.span>
              )}
              <span className="btn-label">{loadingLabel}</span>
            </motion.span>
          )}

          {/* SUCCESS STATE */}
          {isSuccess && (
            <motion.span
              key="success"
              className="btn-content-inner"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: shouldReduceMotion ? 0.08 : 0.25, ease: easeOutCustom }}
            >
              {SuccessIcon && (
                <motion.span
                  className="btn-icon success-icon"
                  initial={shouldReduceMotion ? {} : { scale: 0.5, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <SuccessIcon size={18} aria-hidden="true" />
                </motion.span>
              )}
              <span className="btn-label">{successLabel}</span>
            </motion.span>
          )}

          {/* ERROR STATE */}
          {isError && (
            <motion.span
              key="error"
              className="btn-content-inner"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: shouldReduceMotion ? 0.08 : 0.25, ease: easeOutCustom }}
            >
              {ErrorIcon && (
                <span className="btn-icon error-icon">
                  <ErrorIcon size={18} aria-hidden="true" />
                </span>
              )}
              <span className="btn-label">{errorLabel}</span>
            </motion.span>
          )}

          {/* IDLE / DISABLED STATE */}
          {!isLoading && !isSuccess && !isError && (
            <motion.span
              key="idle"
              className="btn-content-inner"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: shouldReduceMotion ? 0.08 : 0.25, ease: easeOutCustom }}
            >
              <span className="btn-label">{idleLabel}</span>
              {IdleIcon && (
                <span className="btn-icon idle-icon">
                  <IdleIcon size={18} aria-hidden="true" />
                </span>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
