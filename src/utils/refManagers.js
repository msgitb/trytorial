/**
 * Ref Managers
 * Custom hooks for managing ref synchronization to avoid boilerplate useEffect calls
 */

import { useEffect, useRef } from "react";

/**
 * Custom hook to keep modeRef in sync with mode state
 * Replaces manual useEffect for mode ref synchronization
 * @param {string} mode - Current mode
 * @returns {object} Reference object with current mode
 */
export const useSyncModeRef = (mode) => {
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  return modeRef;
};

/**
 * Custom hook to keep seqRef in sync with sequence state
 * Replaces manual useEffect for sequence ref synchronization
 * @param {array} sequence - Current sequence array
 * @returns {object} Reference object with current sequence
 */
export const useSyncSequenceRef = (sequence) => {
  const seqRef = useRef(sequence);

  useEffect(() => {
    seqRef.current = sequence;
  }, [sequence]);

  return seqRef;
};

/**
 * Custom hook to keep hintInRef in sync with hintInput state
 * Replaces manual useEffect for hint input ref synchronization
 * @param {string} hintInput - Current hint input value
 * @returns {object} Reference object with current hint input
 */
export const useSyncHintInputRef = (hintInput) => {
  const hintInRef = useRef(hintInput);

  useEffect(() => {
    hintInRef.current = hintInput;
  }, [hintInput]);

  return hintInRef;
};

/**
 * Custom hook to reset sequence when exercise changes
 * Replaces manual useEffect for exercise change detection
 * @param {object} seqRef - Reference to sequence array
 * @param {function} setSequence - Setter for sequence state
 * @param {number} currentExerciseIdx - Current exercise index
 * @param {number} currentChapterIdx - Current chapter index
 */
export const useResetSequenceOnExerciseChange = (
  seqRef,
  setSequence,
  currentExerciseIdx,
  currentChapterIdx,
) => {
  useEffect(() => {
    seqRef.current = [];
    setSequence([]);
  }, [currentExerciseIdx, currentChapterIdx, seqRef, setSequence]);
};
