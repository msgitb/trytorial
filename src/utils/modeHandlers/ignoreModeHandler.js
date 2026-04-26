/**
 * Ignore Mode Handler
 * Handles keyboard input in IGNORE mode (only listens for Shift+Insert to exit)
 */

import { MODES } from "../../constants";

/**
 * Handle key event in IGNORE mode
 * @param {KeyboardEvent} e - Keyboard event
 * @param {object} params - Handler parameters
 * @returns {boolean} True if event was handled
 */
export const handleIgnoreMode = (e, { goMode }) => {
  if (e.shiftKey && e.key === "Insert") {
    goMode(MODES.NORMAL);
    return true;
  }

  return false;
};
