import { useState, useEffect, useCallback, useRef } from "react";
import {
  Sidebar,
  LessonPanel,
  BrowserSimulator,
  Notification,
} from "./components";
import { useKeyboardHandler, useExerciseLogic } from "./hooks";
import { MODES, CHAPTERS } from "./constants";
import { GLOBAL_STYLES } from "./utils";

/**
 * Main App Component
 * Tridactyl Interactive Tutorial Application
 *
 * Structure:
 * - Sidebar: Chapter navigation and progress tracking
 * - LessonPanel: Theory, mode cards, and exercise instructions
 * - BrowserSimulator: Fake browser with keyboard interaction
 * - Notification: Display feedback to user
 */
export default function App() {
  // ─── STATE ────────────────────────────────────────────────────────────────
  const [chapterIdx, setChapterIdx] = useState(0);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [mode, setMode] = useState(MODES.NORMAL);
  const [sequence, setSequence] = useState([]);
  const [cmdInput, setCmdInput] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [notification, setNotification] = useState(null);
  const [done, setDone] = useState(new Set());
  const [exStatus, setExStatus] = useState("idle");
  const [hintInput, setHintInput] = useState("");
  const [hintSubmode, setHintSubmode] = useState("follow");
  const [visualInput, setVisualInput] = useState("");
  const [visualSubmode, setVisualSubmode] = useState("select");
  const [keycount, setKeycount] = useState(0);
  const [visualLines, setVisualLines] = useState(-1);
  const [visualAnchor, setVisualAnchor] = useState(-1);
  const [zoomLevel, setZoomLevel] = useState(100);

  const pageRef = useRef(null);

  const currentChapter = CHAPTERS[chapterIdx];
  const currentExercise = currentChapter.exercises[exerciseIdx];

  // ─── NOTIFICATIONS & STATUS ──────────────────────────────────────────────
  const showNotif = useCallback((msg, type = "info") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2200);
  }, []);

  const showStatus = useCallback((msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 2500);
  }, []);

  // ─── EXERCISE LOGIC ───────────────────────────────────────────────────────
  const { doComplete, handleCmd } = useExerciseLogic(showNotif, pageRef);

  // ─── KEYBOARD HANDLER ────────────────────────────────────────────────────
  useKeyboardHandler({
    mode,
    setMode,
    hintInput,
    setHintInput,
    visualInput,
    setVisualInput,
    cmdInput,
    setCmdInput,
    sequence,
    setSequence,
    keycount,
    setKeycount,
    visualLines,
    setVisualLines,
    visualAnchor,
    setVisualAnchor,
    visualSubmode,
    setVisualSubmode,
    zoomLevel,
    setZoomLevel,
    pageRef,
    hintSubmode,
    setHintSubmode,
    showStatus,
    showNotif,
    doComplete,
    handleCmd,
    currentExercise,
    currentChapterIdx: chapterIdx,
    currentExerciseIdx: exerciseIdx,
    setExerciseIdx,
    setExStatus,
    setDone,
  });

  // ─── RESET STATE ON EXERCISE CHANGE ──────────────────────────────────────
  useEffect(() => {
    setExStatus("idle");
    setKeycount(0);
    setSequence([]);
    // Don't reset mode - let user stay in current mode or enter as needed
  }, [exerciseIdx, chapterIdx]);

  // ─── CHAPTER & EXERCISE NAVIGATION ───────────────────────────────────────
  const handleChapterSelect = useCallback((idx) => {
    setChapterIdx(idx);
    setExerciseIdx(0);
  }, []);

  const handlePreviousExercise = useCallback(() => {
    setExerciseIdx((i) => i - 1);
  }, []);

  const handleSkipExercise = useCallback(() => {
    setExerciseIdx((i) => i + 1);
  }, []);

  const handleNextChapter = useCallback(() => {
    setChapterIdx((i) => i + 1);
    setExerciseIdx(0);
  }, []);

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#070712",
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
        color: "#e2e8f0",
        overflow: "hidden",
      }}
    >
      {/* Global styles */}
      <style>{GLOBAL_STYLES}</style>

      {/* Notification overlay */}
      <Notification notification={notification} />

      {/* Sidebar with chapter navigation */}
      <Sidebar
        currentChapterIdx={chapterIdx}
        done={done}
        onChapterSelect={handleChapterSelect}
      />

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Top panel: Lesson theory and exercise instructions */}
        <LessonPanel
          currentChapterIdx={chapterIdx}
          currentExerciseIdx={exerciseIdx}
          done={done}
          keycount={keycount}
          exStatus={exStatus}
          onPreviousExercise={handlePreviousExercise}
          onSkipExercise={handleSkipExercise}
          onNextChapter={handleNextChapter}
        />

        {/* Command input bar */}
        {mode === MODES.COMMAND && (
          <div
            style={{
              padding: "8px 16px",
              background: "#09091a",
              borderTop: "1px solid #1a1a32",
              borderBottom: "1px solid #1a1a32",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                color: "#a855f7",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              :
            </span>
            <span
              style={{
                color: "#e2e8f0",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 14,
              }}
            >
              {cmdInput}
            </span>
            <span
              style={{
                color: "#a855f7",
                animation: "blink 1s step-start infinite",
                fontFamily: "monospace",
                fontSize: 14,
              }}
            >
              █
            </span>
            <span
              style={{ fontSize: 11, color: "#2d3060", marginLeft: "auto" }}
            >
              Enter to execute · Esc to cancel
            </span>
          </div>
        )}

        {/* Bottom panel: Browser simulator with fake page */}
        <BrowserSimulator
          ref={pageRef}
          mode={mode}
          cmdInput={cmdInput}
          statusMsg={statusMsg}
          sequence={sequence}
          hintInput={hintInput}
          hintSubmode={hintSubmode}
          visualInput={visualInput}
          visualSubmode={visualSubmode}
          visualLines={visualLines}
          visualAnchor={visualAnchor}
          zoomLevel={zoomLevel}
        />
      </div>
    </div>
  );
}
