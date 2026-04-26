/**
 * Visual Mode Handler
 * Handles keyboard input in VISUAL mode (j/k navigation, label selection, yanking)
 */

import { MODES } from "../../constants";
import {
  VISUAL_LABELS,
  KEYBOARD_STATUS_MESSAGES,
} from "../keyboardHandlerHelpers";

/**
 * Handle j/k line navigation in visual mode
 * @param {string} key - 'j' for down, 'k' for up
 * @param {object} params - Handler parameters
 */
const handleVisualLineNavigation = (
  key,
  { visualLines, visualAnchor, setVisualAnchor, setVisualLines },
) => {
  const currentLine = visualLines;

  if (key === "j") {
    if (currentLine >= 0 && currentLine < 11) {
      if (visualAnchor < 0) {
        setVisualAnchor(currentLine);
      }
      const newLine = currentLine + 1;
      setVisualLines(newLine);
    }
  } else if (key === "k") {
    if (currentLine > 0) {
      if (visualAnchor < 0) {
        setVisualAnchor(currentLine);
      }
      const newLine = currentLine - 1;
      setVisualLines(newLine);
    }
  }
};

/**
 * Handle label selection in visual mode
 * @param {string} charUpper - Uppercase character typed
 * @param {object} params - Handler parameters
 * @returns {boolean} True if valid label was selected
 */
const handleVisualLabelSelection = (
  charUpper,
  {
    visualInput,
    setVisualInput,
    setVisualAnchor,
    setVisualLines,
    doComplete,
    cur,
  },
) => {
  const labelIdx = VISUAL_LABELS.indexOf(charUpper);

  if (labelIdx !== -1) {
    const ni = visualInput + charUpper;
    setVisualInput(ni);
    setVisualAnchor(labelIdx);
    setVisualLines(labelIdx);

    if (
      cur?.type === "inMode" &&
      cur.key === "j" &&
      cur.mode === MODES.VISUAL
    ) {
      doComplete(cur);
    }
    return true;
  }

  return false;
};

/**
 * Handle key event in VISUAL mode
 * @param {KeyboardEvent} e - Keyboard event
 * @param {object} params - Handler parameters
 * @returns {boolean} True if event was handled
 */
export const handleVisualMode = (
  e,
  {
    goMode,
    visualLines,
    visualAnchor,
    setVisualAnchor,
    setVisualLines,
    visualInput,
    setVisualInput,
    doComplete,
    cur,
    showStatus,
  },
) => {
  if (e.key === "Escape") {
    goMode(MODES.NORMAL);
    if (cur?.type === "exitMode" && cur.from === MODES.VISUAL) {
      doComplete(cur);
    }
    return true;
  }

  if (e.key === "y") {
    showStatus(KEYBOARD_STATUS_MESSAGES.YANKED_SELECTION);
    setVisualLines((l) => l - 1);
    if (
      cur?.type === "inMode" &&
      cur.key === "y" &&
      cur.mode === MODES.VISUAL
    ) {
      doComplete(cur);
    }
    return true;
  }

  if (e.key === "j" || e.key === "k") {
    handleVisualLineNavigation(e.key, {
      visualLines,
      visualAnchor,
      setVisualAnchor,
      setVisualLines,
    });
    return true;
  }

  if (e.key.length === 1) {
    const charUpper = e.key.toUpperCase();
    const handled = handleVisualLabelSelection(charUpper, {
      visualInput,
      setVisualInput,
      setVisualAnchor,
      setVisualLines,
      doComplete,
      cur,
    });
    return handled;
  }

  return false;
};
