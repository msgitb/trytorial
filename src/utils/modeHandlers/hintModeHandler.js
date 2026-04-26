/**
 * Hint Mode Handler
 * Handles keyboard input in HINT mode (label selection with ASDFJKLQWER)
 */

import { MODES, LABELS } from "../../constants";
import { KEYBOARD_STATUS_MESSAGES } from "../keyboardHandlerHelpers";

/**
 * Handle key event in HINT mode
 * @param {KeyboardEvent} e - Keyboard event
 * @param {object} params - Handler parameters
 * @returns {boolean} True if event was handled
 */
export const handleHintMode = (
  e,
  { goMode, hintInRef, setHintInput, hintSubmode, doComplete, cur, showStatus },
) => {
  if (e.key === "Escape") {
    goMode(MODES.NORMAL);
    if (cur?.type === "hintCancel") {
      doComplete(cur);
    }
    return true;
  }

  if (e.key.length === 1) {
    const ni = hintInRef.current + e.key.toUpperCase();
    setHintInput(ni);
    hintInRef.current = ni;
    const idx = LABELS.findIndex((l) => l === ni);

    if (idx !== -1) {
      const message =
        hintSubmode === "copyURL"
          ? KEYBOARD_STATUS_MESSAGES.HINT_COPY_URL
          : KEYBOARD_STATUS_MESSAGES.HINT_FOLLOW;
      showStatus(message);
      goMode(MODES.NORMAL);

      if (
        cur?.type === "hintSelect" ||
        (cur?.type === "seq" && hintSubmode === "copyURL")
      ) {
        doComplete(cur);
      }
    }
    return true;
  }

  return false;
};
