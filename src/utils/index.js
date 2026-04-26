/**
 * Central export of all utilities
 */

export { GLOBAL_STYLES, THEME } from "./styleUtils";

// Keyboard Handler Utilities
export {
  KEYBOARD_STATUS_MESSAGES,
  VISUAL_LABELS,
  getExerciseForMode,
  createDoCompleteHelper,
  handleZoomOperation,
  isUIElement,
  scrollPage,
  scrollToTop,
  scrollToBottom,
} from "./keyboardHandlerHelpers";

export {
  handleGgSequence,
  handleYySequence,
  handleZzSequence,
  handleZiSequence,
  handleZoSequence,
  handleSemiYSequence,
  dispatchSequenceHandler,
} from "./sequenceHandlers";

export {
  createInputState,
  createVisualState,
  createZoomState,
  createExerciseContext,
  createModeState,
} from "./keyboardState";

export {
  useSyncModeRef,
  useSyncSequenceRef,
  useSyncHintInputRef,
  useResetSequenceOnExerciseChange,
} from "./refManagers";

// Mode Handlers
export { handleCommandMode } from "./modeHandlers/commandModeHandler";
export { handleHintMode } from "./modeHandlers/hintModeHandler";
export { handleVisualMode } from "./modeHandlers/visualModeHandler";
export { handleNormalMode } from "./modeHandlers/normalModeHandler";
export { handleIgnoreMode } from "./modeHandlers/ignoreModeHandler";
export { dispatchKeyEvent } from "./modeHandlers/dispatcher";
