/**
 * Sequence Handlers
 * Handles multi-key keyboard sequences (gg, yy, zz, zi, zo, ;y)
 */

import {
  KEYBOARD_STATUS_MESSAGES,
  handleZoomOperation,
  scrollToTop,
  scrollToBottom,
} from "./keyboardHandlerHelpers";
import { MODES } from "../constants";

/**
 * Handle 'gg' sequence (scroll to top)
 * @param {object} params - Handler parameters
 * @returns {boolean} True if doComplete should be called
 */
export const handleGgSequence = ({
  pageRef,
  doComplete,
  cur,
  exerciseContext,
}) => {
  scrollToTop(pageRef);
  if (cur?.type === "seq" && cur.keys?.join("") === "gg") {
    doComplete(cur);
    return true;
  }
  return false;
};

/**
 * Handle 'yy' sequence (yank/copy URL)
 * @param {object} params - Handler parameters
 * @returns {boolean} True if doComplete should be called
 */
export const handleYySequence = ({
  showStatus,
  doComplete,
  cur,
  exerciseContext,
}) => {
  showStatus(KEYBOARD_STATUS_MESSAGES.YANKED_URL);
  if (cur?.type === "seq" && cur.keys?.join("") === "yy") {
    doComplete(cur);
    return true;
  }
  return false;
};

/**
 * Handle 'zz' sequence (reset zoom)
 * @param {object} params - Handler parameters
 * @returns {boolean} True if doComplete should be called
 */
export const handleZzSequence = ({
  zoomLevel,
  setZoomLevel,
  showStatus,
  doComplete,
  cur,
  exerciseContext,
}) => {
  if (zoomLevel > 100) {
    handleZoomOperation("reset", zoomLevel, setZoomLevel, showStatus);
    if (cur?.type === "seq" && cur.keys?.join("") === "zz") {
      doComplete(cur);
      return true;
    }
  }
  return false;
};

/**
 * Handle 'zi' sequence (zoom in)
 * @param {object} params - Handler parameters
 * @returns {boolean} True if doComplete should be called
 */
export const handleZiSequence = ({
  setZoomLevel,
  showStatus,
  doComplete,
  cur,
  exerciseContext,
}) => {
  handleZoomOperation("in", null, setZoomLevel, showStatus);
  if (cur?.type === "seq" && cur.keys?.join("") === "zi") {
    doComplete(cur);
    return true;
  }
  return false;
};

/**
 * Handle 'zo' sequence (zoom out)
 * @param {object} params - Handler parameters
 * @returns {boolean} True if doComplete should be called
 */
export const handleZoSequence = ({
  setZoomLevel,
  showStatus,
  doComplete,
  cur,
  exerciseContext,
}) => {
  handleZoomOperation("out", null, setZoomLevel, showStatus);
  if (cur?.type === "seq" && cur.keys?.join("") === "zo") {
    doComplete(cur);
    return true;
  }
  return false;
};

/**
 * Handle ';y' sequence (copy URL mode / hint mode with copyURL submode)
 * @param {object} params - Handler parameters
 */
export const handleSemiYSequence = ({ goMode, setHintSubmode, showStatus }) => {
  goMode(MODES.HINT);
  setHintSubmode("copyURL");
  showStatus(KEYBOARD_STATUS_MESSAGES.HINT_COPY_INSTRUCTION);
};

/**
 * Main sequence handler dispatcher
 * Processes completed sequences and routes to appropriate handler
 * @param {string} sequenceJoin - Joined sequence string (e.g., "gg", "yy")
 * @param {object} params - All necessary parameters
 * @returns {boolean} True if a handler processed the sequence
 */
export const dispatchSequenceHandler = (sequenceJoin, params) => {
  switch (sequenceJoin) {
    case "gg":
      return handleGgSequence(params);
    case "yy":
      return handleYySequence(params);
    case "zz":
      return handleZzSequence(params);
    case "zi":
      return handleZiSequence(params);
    case "zo":
      return handleZoSequence(params);
    case ";y":
      handleSemiYSequence(params);
      return true;
    default:
      return false;
  }
};
