/**
 * useKeyboardHandler Hook - Simplified
 * Manages keyboard input and mode transitions
 */

import { useEffect, useRef, useCallback, useMemo } from "react";
import { MODES } from "../constants";
import { dispatchKeyEvent } from "../utils/modeHandlers/dispatcher";
import {
  createDoCompleteHelper,
  getExerciseForMode,
} from "../utils/keyboardHandlerHelpers";
import {
  useSyncModeRef,
  useSyncSequenceRef,
  useSyncHintInputRef,
  useResetSequenceOnExerciseChange,
} from "../utils/refManagers";

export function useKeyboardHandler({
  mode,
  setMode,
  hintInput,
  setHintInput,
  visualInput,
  setVisualInput,
  cmdInput,
  setCmdInput,
  sequence,
  setSequence,
  keycount,
  setKeycount,
  visualLines,
  setVisualLines,
  visualAnchor,
  setVisualAnchor,
  visualSubmode,
  setVisualSubmode,
  zoomLevel,
  setZoomLevel,
  pageRef,
  hintSubmode,
  setHintSubmode,
  showStatus,
  showNotif,
  doComplete,
  handleCmd,
  currentExercise,
  currentChapterIdx,
  currentExerciseIdx,
  setExerciseIdx,
  setExStatus,
  setDone,
}) {
  // Use custom hooks to manage ref synchronization
  const modeRef = useSyncModeRef(mode);
  const seqRef = useSyncSequenceRef(sequence);
  const hintInRef = useSyncHintInputRef(hintInput);
  const seqTimer = useRef(null);

  // Reset sequence when exercise changes
  useResetSequenceOnExerciseChange(
    seqRef,
    setSequence,
    currentExerciseIdx,
    currentChapterIdx,
  );

  // Create helper that wraps doComplete with exercise context
  const exerciseContext = useMemo(
    () => ({
      currentChapterIdx,
      currentExerciseIdx,
      setExStatus,
      setDone,
      setKeycount,
      setExerciseIdx,
    }),
    [
      currentChapterIdx,
      currentExerciseIdx,
      setExStatus,
      setDone,
      setKeycount,
      setExerciseIdx,
    ],
  );

  const doCompleteHelper = useMemo(
    () => createDoCompleteHelper(doComplete, exerciseContext),
    [doComplete, exerciseContext],
  );

  // goMode callback - simplified version (kept minimal)
  const goMode = useCallback(
    (m) => {
      setMode(m);
      modeRef.current = m;
      if (m !== MODES.COMMAND) setCmdInput("");
      if (m !== MODES.HINT) {
        setHintInput("");
        hintInRef.current = "";
        setHintSubmode("follow");
      }
      if (m !== MODES.VISUAL) {
        setVisualInput("");
      }
      if (m === MODES.VISUAL) {
        setVisualLines(-1);
        setVisualAnchor(-1);
        setVisualSubmode("select");
      }
    },
    [
      setMode,
      setCmdInput,
      setHintInput,
      setHintSubmode,
      setVisualInput,
      setVisualLines,
      setVisualAnchor,
      setVisualSubmode,
      modeRef,
      hintInRef,
    ],
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      const m = modeRef.current;
      const cur = getExerciseForMode(currentChapterIdx, currentExerciseIdx);

      // Dispatch to appropriate mode handler
      dispatchKeyEvent(e, m, {
        // Mode and state
        mode: m,
        goMode,

        // Input states
        cmdInput,
        setCmdInput,
        hintInput: hintInRef.current,
        setHintInput,
        visualInput,
        setVisualInput,
        sequence,
        setSequence,
        keycount,
        setKeycount,

        // Visual states
        visualLines,
        setVisualLines,
        visualAnchor,
        setVisualAnchor,
        visualSubmode,
        setVisualSubmode,
        hintSubmode,
        setHintSubmode,

        // Zoom state
        zoomLevel,
        setZoomLevel,

        // Refs and handlers
        pageRef,
        seqRef,
        seqTimer,
        hintInRef,

        // Callbacks
        doComplete: doCompleteHelper,
        handleCmd,
        showStatus,
        showNotif,

        // Exercise context
        cur,
        exerciseContext,
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    goMode,
    doCompleteHelper,
    handleCmd,
    showStatus,
    showNotif,
    cmdInput,
    setCmdInput,
    setHintInput,
    setVisualInput,
    setHintSubmode,
    setSequence,
    setVisualLines,
    setVisualAnchor,
    setVisualSubmode,
    setZoomLevel,
    setKeycount,
    keycount,
    zoomLevel,
    visualAnchor,
    visualLines,
    visualSubmode,
    currentChapterIdx,
    currentExerciseIdx,
    setExerciseIdx,
    setExStatus,
    setDone,
    pageRef,
    hintSubmode,
    visualInput,
    sequence,
    seqRef,
    exerciseContext,
    modeRef,
    hintInRef,
  ]);
}
