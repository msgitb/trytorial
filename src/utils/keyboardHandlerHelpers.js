/**
 * Keyboard Handler Helpers
 * Reusable utilities to reduce boilerplate in useKeyboardHandler
 */

import { CHAPTERS } from "../constants";

/**
 * Status messages used throughout keyboard handling
 */
export const KEYBOARD_STATUS_MESSAGES = {
  YANKED_SELECTION: "Yanked selection to clipboard",
  YANKED_URL: "Yanked URL: https://example-tech-news.io/",
  BACK_HISTORY: "← back in history",
  FORWARD_HISTORY: "→ forward in history",
  ZOOM_IN: "Zoomed in (120%)",
  ZOOM_OUT: "Zoomed out",
  ZOOM_RESET: "Zoom reset to 100%",
  HINT_COPY_URL: "Copied URL",
  HINT_FOLLOW: "→ Followed: link",
  HINT_COPY_INSTRUCTION: ";y — click a link to copy its URL",
};

/**
 * Labels used in visual mode for link clicking
 */
export const VISUAL_LABELS = [
  "A",
  "S",
  "D",
  "F",
  "H",
  "L",
  "G",
  "Z",
  "Q",
  "W",
  "E",
  "R",
];

/**
 * Get the current exercise from CHAPTERS
 * @param {number} chapterIdx - Chapter index
 * @param {number} exerciseIdx - Exercise index
 * @returns {object|null} Exercise object or null if not found
 */
export const getExerciseForMode = (chapterIdx, exerciseIdx) => {
  return CHAPTERS[chapterIdx]?.exercises[exerciseIdx] || null;
};

/**
 * Create a doComplete wrapper helper to reduce boilerplate
 * Returns a function that captures the exercise context and reducer functions
 * @param {object} context - Context object containing:
 *   - currentChapterIdx, currentExerciseIdx, showNotif
 *   - setExStatus, setDone, setKeycount, setExerciseIdx
 * @returns {function} Wrapper function that calls doComplete with pre-filled context
 */
export const createDoCompleteHelper = (
  doCompleteOriginal,
  {
    currentChapterIdx,
    currentExerciseIdx,
    setExStatus,
    setDone,
    setKeycount,
    setExerciseIdx,
  },
) => {
  return (cur) => {
    if (cur) {
      doCompleteOriginal(
        cur,
        currentChapterIdx,
        currentExerciseIdx,
        setExStatus,
        setDone,
        setKeycount,
        setExerciseIdx,
      );
    }
  };
};

/**
 * Handle zoom operations (zi, zo, zz sequences)
 * @param {string} zoomCommand - Command: 'in', 'out', or 'reset'
 * @param {number} currentZoom - Current zoom level
 * @param {function} setZoomLevel - Setter for zoom level
 * @param {function} showStatus - Status message display function
 * @returns {number} New zoom level
 */
export const handleZoomOperation = (
  zoomCommand,
  currentZoom,
  setZoomLevel,
  showStatus,
) => {
  switch (zoomCommand) {
    case "in":
      setZoomLevel((z) => z + 10);
      showStatus(KEYBOARD_STATUS_MESSAGES.ZOOM_IN);
      break;
    case "out":
      setZoomLevel((z) => Math.max(50, z - 10));
      showStatus(KEYBOARD_STATUS_MESSAGES.ZOOM_OUT);
      break;
    case "reset":
      setZoomLevel(100);
      showStatus(KEYBOARD_STATUS_MESSAGES.ZOOM_RESET);
      break;
    default:
      break;
  }
};

/**
 * Check if target is a UI element where keyboard input should be ignored
 * @param {element} target - DOM element to check
 * @returns {boolean} True if element is a button or select
 */
export const isUIElement = (target) => {
  return target.tagName === "BUTTON" || target.tagName === "SELECT";
};

/**
 * Scroll page by amount
 * @param {object} pageRef - Reference to scrollable container
 * @param {number} amount - Amount to scroll (positive = down, negative = up)
 */
export const scrollPage = (pageRef, amount) => {
  if (pageRef.current) {
    pageRef.current.scrollTop += amount;
  }
};

/**
 * Scroll page to top
 * @param {object} pageRef - Reference to scrollable container
 */
export const scrollToTop = (pageRef) => {
  if (pageRef.current) {
    pageRef.current.scrollTop = 0;
  }
};

/**
 * Scroll page to bottom
 * @param {object} pageRef - Reference to scrollable container
 */
export const scrollToBottom = (pageRef) => {
  if (pageRef.current) {
    pageRef.current.scrollTop = pageRef.current.scrollHeight;
  }
};
