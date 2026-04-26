/**
 * Keyboard State Utilities
 * Groups related state parameters to reduce prop drilling and simplify component interfaces
 */

/**
 * Create input state object grouping command, hint, visual, and sequence inputs
 * @param {object} state - Current state values
 * @returns {object} Input state object
 */
export const createInputState = ({
  cmdInput,
  hintInput,
  visualInput,
  sequence,
  keycount,
  setCmdInput,
  setHintInput,
  setVisualInput,
  setSequence,
  setKeycount,
}) => ({
  cmdInput,
  hintInput,
  visualInput,
  sequence,
  keycount,
  setCmdInput,
  setHintInput,
  setVisualInput,
  setSequence,
  setKeycount,
});

/**
 * Create visual state object grouping visual mode specific state
 * @param {object} state - Current state values
 * @returns {object} Visual state object
 */
export const createVisualState = ({
  visualLines,
  visualAnchor,
  visualSubmode,
  hintSubmode,
  setVisualLines,
  setVisualAnchor,
  setVisualSubmode,
  setHintSubmode,
}) => ({
  visualLines,
  visualAnchor,
  visualSubmode,
  hintSubmode,
  setVisualLines,
  setVisualAnchor,
  setVisualSubmode,
  setHintSubmode,
});

/**
 * Create zoom state object grouping zoom level state
 * @param {object} state - Current state values
 * @returns {object} Zoom state object
 */
export const createZoomState = ({ zoomLevel, setZoomLevel }) => ({
  zoomLevel,
  setZoomLevel,
});

/**
 * Create exercise context object grouping exercise-related state and indices
 * @param {object} state - Current state values
 * @returns {object} Exercise context object
 */
export const createExerciseContext = ({
  currentExercise,
  currentChapterIdx,
  currentExerciseIdx,
  setExerciseIdx,
  setExStatus,
  setDone,
  setKeycount,
}) => ({
  currentExercise,
  currentChapterIdx,
  currentExerciseIdx,
  setExerciseIdx,
  setExStatus,
  setDone,
  setKeycount,
});

/**
 * Create mode state object grouping mode-related state
 * @param {object} state - Current state values
 * @returns {object} Mode state object
 */
export const createModeState = ({ mode, setMode }) => ({
  mode,
  setMode,
});
