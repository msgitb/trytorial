/**
 * Command Mode Handler
 * Handles keyboard input in COMMAND mode (:, Enter, Backspace, character input)
 */

import { MODES } from "../../constants";

/**
 * Handle key event in COMMAND mode
 * @param {KeyboardEvent} e - Keyboard event
 * @param {object} params - Handler parameters
 * @returns {boolean} True if event was handled (preventDefault should be called)
 */
export const handleCommandMode = (
  e,
  {
    goMode,
    cmdInput,
    setCmdInput,
    handleCmd,
    doComplete,
    cur,
    exerciseContext,
    showNotif,
  },
) => {
  if (e.key === "Escape") {
    goMode(MODES.NORMAL);
    if (cur?.type === "exitMode" && cur.from === MODES.COMMAND) {
      doComplete(cur);
    }
    return true;
  }

  if (e.key === "Enter") {
    if (cmdInput.trim()) {
      handleCmd(
        cmdInput.trim(),
        cur,
        doComplete,
        exerciseContext.currentChapterIdx,
        exerciseContext.currentExerciseIdx,
        exerciseContext.setExStatus,
        exerciseContext.setDone,
        exerciseContext.setKeycount,
        exerciseContext.setExerciseIdx,
        showNotif,
      );
    }
    goMode(MODES.NORMAL);
    return true;
  }

  if (e.key === "Backspace") {
    setCmdInput((s) => s.slice(0, -1));
    return true;
  }

  if (e.key.length === 1) {
    setCmdInput((s) => s + e.key);
    return true;
  }

  return false;
};
