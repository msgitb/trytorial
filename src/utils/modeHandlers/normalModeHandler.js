/**
 * Normal Mode Handler
 * Handles keyboard input in NORMAL mode (single-key commands and multi-key sequences)
 */

import { MODES } from "../../constants";
import {
  KEYBOARD_STATUS_MESSAGES,
  scrollPage,
  scrollToBottom,
} from "../keyboardHandlerHelpers";
import { dispatchSequenceHandler } from "../sequenceHandlers";

/**
 * Handle single-key commands in normal mode
 * @param {string} key - The pressed key
 * @param {object} params - Handler parameters
 * @returns {boolean|null} True if handled, false if not, null if should continue to sequence handling
 */
const handleNormalModeSingleKey = (
  key,
  {
    goMode,
    setHintSubmode,
    keycount,
    setKeycount,
    pageRef,
    doComplete,
    cur,
    showStatus,
  },
) => {
  switch (key) {
    case ":":
      goMode(MODES.COMMAND);
      if (cur?.type === "enterMode" && cur.target === MODES.COMMAND) {
        doComplete(cur);
      }
      return true;

    case "f":
      goMode(MODES.HINT);
      setHintSubmode("follow");
      if (cur?.type === "enterMode" && cur.target === MODES.HINT) {
        doComplete(cur);
      }
      return true;

    case "v":
      goMode(MODES.VISUAL);
      if (cur?.type === "enterMode" && cur.target === MODES.VISUAL) {
        doComplete(cur);
      }
      return true;

    case "Escape":
      if (cur?.type === "key" && cur.key === "Escape") {
        doComplete(cur);
      }
      return true;

    case "H":
      showStatus(KEYBOARD_STATUS_MESSAGES.BACK_HISTORY);
      return true;

    case "L":
      showStatus(KEYBOARD_STATUS_MESSAGES.FORWARD_HISTORY);
      return true;

    case "j":
      scrollPage(pageRef, 88);
      if (cur?.type === "keycount" && cur.key === "j") {
        const nc = keycount + 1;
        setKeycount(nc);
        if (nc >= cur.count) {
          doComplete(cur);
        }
      } else if (cur?.type === "keypress" && cur.key === "j") {
        doComplete(cur);
      }
      return true;

    case "k":
      scrollPage(pageRef, -88);
      if (cur?.type === "keycount" && cur.key === "k") {
        const nc = keycount + 1;
        setKeycount(nc);
        if (nc >= cur.count) {
          doComplete(cur);
        }
      }
      return true;

    case "G":
      scrollToBottom(pageRef);
      if (cur?.type === "keypress" && cur.key === "G") {
        doComplete(cur);
      }
      return true;

    default:
      return null;
  }
};

/**
 * Handle multi-key sequences in normal mode
 * @param {object} params - Handler parameters
 */
const handleNormalModeSequences = (
  seqRef,
  setSequence,
  seqTimer,
  newSequence,
  join2LastKeys,
  params,
) => {
  const handled = dispatchSequenceHandler(join2LastKeys, params);

  if (handled) {
    seqRef.current = [];
    setSequence([]);
  } else {
    // Reset sequence after timeout
    if (seqTimer.current) clearTimeout(seqTimer.current);
    seqTimer.current = setTimeout(() => {
      seqRef.current = [];
      setSequence([]);
    }, 1000);
  }
};

/**
 * Handle key event in NORMAL mode
 * @param {KeyboardEvent} e - Keyboard event
 * @param {object} params - Handler parameters
 * @returns {boolean} True if event was handled
 */
export const handleNormalMode = (
  e,
  {
    goMode,
    setHintSubmode,
    keycount,
    setKeycount,
    pageRef,
    doComplete,
    cur,
    showStatus,
    seqRef,
    setSequence,
    seqTimer,
    zoomLevel,
    setZoomLevel,
  },
) => {
  // Try to handle as single-key command
  const singleKeyResult = handleNormalModeSingleKey(e.key, {
    goMode,
    setHintSubmode,
    keycount,
    setKeycount,
    pageRef,
    doComplete,
    cur,
    showStatus,
  });

  if (singleKeyResult !== null) {
    return singleKeyResult;
  }

  // Not a single-key command, treat as part of sequence
  const prevSeq = seqRef.current;
  const ns = [...prevSeq, e.key];
  seqRef.current = ns;
  setSequence(ns);

  const join2LastKeys = ns.slice(-2).join("");

  handleNormalModeSequences(seqRef, setSequence, seqTimer, ns, join2LastKeys, {
    pageRef,
    goMode,
    setHintSubmode,
    showStatus,
    doComplete,
    cur,
    seqRef,
    setSequence,
    seqTimer,
    zoomLevel,
    setZoomLevel,
  });

  return true;
};
