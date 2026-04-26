/**
 * Mode Dispatcher
 * Routes keyboard events to the appropriate mode handler
 */

import { MODES } from "../../constants";
import { isUIElement } from "../keyboardHandlerHelpers";
import { handleCommandMode } from "./commandModeHandler";
import { handleHintMode } from "./hintModeHandler";
import { handleVisualMode } from "./visualModeHandler";
import { handleNormalMode } from "./normalModeHandler";
import { handleIgnoreMode } from "./ignoreModeHandler";

/**
 * Main keyboard event dispatcher
 * Routes to appropriate mode handler based on current mode
 * @param {KeyboardEvent} e - Keyboard event
 * @param {string} mode - Current mode (from MODES)
 * @param {object} params - All parameters needed by handlers
 * @returns {boolean} True if event was handled and preventDefault should be called
 */
export const dispatchKeyEvent = (e, mode, params) => {
  // Skip UI buttons and selects - allow them to respond normally
  if (isUIElement(e.target)) {
    return false;
  }

  // Route to appropriate mode handler
  switch (mode) {
    case MODES.COMMAND:
      return handleCommandMode(e, params);

    case MODES.HINT:
      e.preventDefault(); // Prevent default browser behavior in hint mode
      return handleHintMode(e, params);

    case MODES.VISUAL:
      e.preventDefault(); // Prevent default browser behavior in visual mode
      return handleVisualMode(e, params);

    case MODES.NORMAL:
      e.preventDefault(); // Prevent default browser behavior in normal mode
      return handleNormalMode(e, params);

    case MODES.IGNORE:
      return handleIgnoreMode(e, params);

    default:
      return false;
  }
};
