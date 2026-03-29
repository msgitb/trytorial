/**
 * useKeyboardHandler Hook - Simplified
 * Manages keyboard input and mode transitions
 */

import { useEffect, useRef, useCallback } from "react";
import { MODES, LABELS, CHAPTERS } from "../constants";

export function useKeyboardHandler({
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
  currentChapterIdx,
  currentExerciseIdx,
  setExerciseIdx,
  setExStatus,
  setDone,
}) {
  const modeRef = useRef(mode);
  const seqRef = useRef(sequence);
  const seqTimer = useRef(null);
  const hintInRef = useRef(hintInput);

  // Keep refs in sync
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    seqRef.current = sequence;
  }, [sequence]);

  useEffect(() => {
    hintInRef.current = hintInput;
  }, [hintInput]);

  // Reset sequence when exercise changes
  useEffect(() => {
    seqRef.current = [];
  }, [currentExerciseIdx, currentChapterIdx]);

  const goMode = useCallback(
    (m) => {
      setMode(m);
      modeRef.current = m;
      if (m !== MODES.COMMAND) setCmdInput("");
      if (m !== MODES.HINT) {
        setHintInput("");
        hintInRef.current = "";
        setHintSubmode("follow");
      }
      if (m !== MODES.VISUAL) {
        setVisualInput("");
      }
      if (m === MODES.VISUAL) {
        setVisualLines(0);
        setVisualSubmode("select");
      }
    },
    [setMode, setCmdInput, setHintInput, setHintSubmode, setVisualInput, setVisualLines, setVisualSubmode],
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip UI buttons
      if (e.target.tagName === "BUTTON" || e.target.tagName === "SELECT")
        return;

      const m = modeRef.current;
      const cur = CHAPTERS[currentChapterIdx]?.exercises[currentExerciseIdx];

      // COMMAND MODE
      if (m === MODES.COMMAND) {
        if (e.key === "Escape") {
          goMode(MODES.NORMAL);
          if (cur.type === "exitMode" && cur.from === MODES.COMMAND) {
            doComplete(
              cur,
              currentChapterIdx,
              currentExerciseIdx,
              setExStatus,
              setDone,
              setKeycount,
              setExerciseIdx,
            );
          }
          return;
        }
        if (e.key === "Enter") {
          if (cmdInput.trim()) {
            handleCmd(
              cmdInput.trim(),
              cur,
              doComplete,
              currentChapterIdx,
              currentExerciseIdx,
              setExStatus,
              setDone,
              setKeycount,
              setExerciseIdx,
              showNotif,
            );
          }
          goMode(MODES.NORMAL);
          return;
        }
        if (e.key === "Backspace") {
          setCmdInput((s) => s.slice(0, -1));
          return;
        }
        if (e.key.length === 1) {
          setCmdInput((s) => s + e.key);
          return;
        }
        return;
      }

      // HINT MODE
      if (m === MODES.HINT) {
        e.preventDefault();
        if (e.key === "Escape") {
          goMode(MODES.NORMAL);
          if (cur.type === "hintCancel") {
            doComplete(
              cur,
              currentChapterIdx,
              currentExerciseIdx,
              setExStatus,
              setDone,
              setKeycount,
              setExerciseIdx,
            );
          }
          return;
        }
        if (e.key.length === 1) {
          const ni = hintInRef.current + e.key.toUpperCase();
          setHintInput(ni);
          hintInRef.current = ni;
          const idx = LABELS.findIndex((l) => l === ni);
          if (idx !== -1) {
            showStatus(
              hintSubmode === "copyURL" ? `Copied URL` : `→ Followed: link`,
            );
            goMode(MODES.NORMAL);
            if (
              cur.type === "hintSelect" ||
              (cur.type === "seq" && hintSubmode === "copyURL")
            ) {
              doComplete(
                cur,
                currentChapterIdx,
                currentExerciseIdx,
                setExStatus,
                setDone,
                setKeycount,
                setExerciseIdx,
              );
            }
          }
        }
        return;
      }

      // VISUAL MODE
      if (m === MODES.VISUAL) {
        e.preventDefault();
        if (e.key === "Escape") {
          goMode(MODES.NORMAL);
          if (cur.type === "exitMode" && cur.from === MODES.VISUAL) {
            doComplete(
              cur,
              currentChapterIdx,
              currentExerciseIdx,
              setExStatus,
              setDone,
              setKeycount,
              setExerciseIdx,
            );
          }
          return;
        }
        if (e.key === "y") {
          showStatus("Yanked selection to clipboard");
          setVisualLines((l) => l - 1);
          if (
            cur.type === "inMode" &&
            cur.key === "y" &&
            cur.mode === MODES.VISUAL
          ) {
            doComplete(
              cur,
              currentChapterIdx,
              currentExerciseIdx,
              setExStatus,
              setDone,
              setKeycount,
              setExerciseIdx,
            );
          }
          return;
        }

        // Visual mode: type label to select
        if (e.key.length === 1) {
          const visualLabels = ["A", "S", "D", "F", "J", "K", "L", "G", "Q", "W", "E", "R"];
          const charUpper = e.key.toUpperCase();
          const labelIdx = visualLabels.indexOf(charUpper);

          if (labelIdx !== -1) {
            // User typed a valid label
            const ni = visualInput + charUpper;
            setVisualInput(ni);
            setVisualLines(labelIdx + 1);

            if (
              cur.type === "inMode" &&
              cur.key === "j" &&
              cur.mode === MODES.VISUAL
            ) {
              doComplete(
                cur,
                currentChapterIdx,
                currentExerciseIdx,
                setExStatus,
                setDone,
                setKeycount,
                setExerciseIdx,
              );
            }
          }
          return;
        }
        return;
      }

      // IGNORE MODE
      if (m === MODES.IGNORE) {
        if (e.shiftKey && e.key === "Insert") goMode(MODES.NORMAL);
        return;
      }

      // NORMAL MODE
      e.preventDefault();

      // Single key commands
      if (e.key === ":") {
        goMode(MODES.COMMAND);
        if (cur.type === "enterMode" && cur.target === MODES.COMMAND) {
          doComplete(
            cur,
            currentChapterIdx,
            currentExerciseIdx,
            setExStatus,
            setDone,
            setKeycount,
            setExerciseIdx,
          );
        }
        return;
      }

      if (e.key === "f") {
        goMode(MODES.HINT);
        setHintSubmode("follow");
        if (cur.type === "enterMode" && cur.target === MODES.HINT) {
          doComplete(
            cur,
            currentChapterIdx,
            currentExerciseIdx,
            setExStatus,
            setDone,
            setKeycount,
            setExerciseIdx,
          );
        }
        return;
      }

      if (e.key === "v") {
        goMode(MODES.VISUAL);
        if (cur.type === "enterMode" && cur.target === MODES.VISUAL) {
          doComplete(
            cur,
            currentChapterIdx,
            currentExerciseIdx,
            setExStatus,
            setDone,
            setKeycount,
            setExerciseIdx,
          );
        }
        return;
      }

      if (e.key === "Escape") {
        if (cur.type === "key" && cur.key === "Escape") {
          doComplete(
            cur,
            currentChapterIdx,
            currentExerciseIdx,
            setExStatus,
            setDone,
            setKeycount,
            setExerciseIdx,
          );
        }
        return;
      }

      if (e.key === "H") {
        showStatus("← back in history");
        return;
      }

      if (e.key === "L") {
        showStatus("→ forward in history");
        return;
      }

      if (e.key === "j") {
        if (pageRef.current) pageRef.current.scrollTop += 88;
        if (cur.type === "keycount" && cur.key === "j") {
          const nc = keycount + 1;
          setKeycount(nc);
          if (nc >= cur.count) {
            doComplete(
              cur,
              currentChapterIdx,
              currentExerciseIdx,
              setExStatus,
              setDone,
              setKeycount,
              setExerciseIdx,
            );
          }
        } else if (cur.type === "keypress" && cur.key === "j") {
          doComplete(
            cur,
            currentChapterIdx,
            currentExerciseIdx,
            setExStatus,
            setDone,
            setKeycount,
            setExerciseIdx,
          );
        }
        return;
      }

      if (e.key === "k") {
        if (pageRef.current) pageRef.current.scrollTop -= 88;
        if (cur.type === "keycount" && cur.key === "k") {
          const nc = keycount + 1;
          setKeycount(nc);
          if (nc >= cur.count) {
            doComplete(
              cur,
              currentChapterIdx,
              currentExerciseIdx,
              setExStatus,
              setDone,
              setKeycount,
              setExerciseIdx,
            );
          }
        }
        return;
      }

      if (e.key === "G") {
        if (pageRef.current)
          pageRef.current.scrollTop = pageRef.current.scrollHeight;
        if (cur.type === "keypress" && cur.key === "G") {
          doComplete(
            cur,
            currentChapterIdx,
            currentExerciseIdx,
            setExStatus,
            setDone,
            setKeycount,
            setExerciseIdx,
          );
        }
        return;
      }

      // Multi-key sequences
      const prevSeq = seqRef.current;
      const ns = [...prevSeq, e.key];
      seqRef.current = ns;
      setSequence(ns);

      if (seqTimer.current) clearTimeout(seqTimer.current);

      const join2 = ns.slice(-2).join("");

      if (join2 === "gg") {
        if (pageRef.current) pageRef.current.scrollTop = 0;
        seqRef.current = [];
        setSequence([]);
        if (cur.type === "seq" && cur.keys?.join("") === "gg") {
          doComplete(
            cur,
            currentChapterIdx,
            currentExerciseIdx,
            setExStatus,
            setDone,
            setKeycount,
            setExerciseIdx,
          );
        }
        return;
      }

      if (join2 === "yy") {
        showStatus("Yanked URL: https://example-tech-news.io/");
        seqRef.current = [];
        setSequence([]);
        if (cur.type === "seq" && cur.keys?.join("") === "yy") {
          doComplete(
            cur,
            currentChapterIdx,
            currentExerciseIdx,
            setExStatus,
            setDone,
            setKeycount,
            setExerciseIdx,
          );
        }
        return;
      }

      if (join2 === "zz") {
        if (zoomLevel > 100) {
          setZoomLevel(100);
          showStatus("Zoom reset to 100%");
          seqRef.current = [];
          setSequence([]);
          if (cur.type === "seq" && cur.keys?.join("") === "zz") {
            doComplete(
              cur,
              currentChapterIdx,
              currentExerciseIdx,
              setExStatus,
              setDone,
              setKeycount,
              setExerciseIdx,
            );
          }
        }
        return;
      }

      if (join2 === "zi") {
        setZoomLevel((z) => z + 10);
        showStatus("Zoomed in (120%)");
        seqRef.current = [];
        setSequence([]);
        if (cur.type === "seq" && cur.keys?.join("") === "zi") {
          doComplete(
            cur,
            currentChapterIdx,
            currentExerciseIdx,
            setExStatus,
            setDone,
            setKeycount,
            setExerciseIdx,
          );
        }
        return;
      }

      if (join2 === "zo") {
        setZoomLevel((z) => Math.max(50, z - 10));
        showStatus("Zoomed out");
        seqRef.current = [];
        setSequence([]);
        if (cur.type === "seq" && cur.keys?.join("") === "zo") {
          doComplete(
            cur,
            currentChapterIdx,
            currentExerciseIdx,
            setExStatus,
            setDone,
            setKeycount,
            setExerciseIdx,
          );
        }
        return;
      }

      if (join2 === ";y") {
        goMode(MODES.HINT);
        setHintSubmode("copyURL");
        showStatus(";y — click a link to copy its URL");
        seqRef.current = [];
        setSequence([]);
        return;
      }

      // Timeout sequence
      seqTimer.current = setTimeout(() => {
        seqRef.current = [];
        setSequence([]);
      }, 1000);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    goMode,
    doComplete,
    handleCmd,
    showStatus,
    showNotif,
    cmdInput,
    setCmdInput,
    setHintInput,
    setVisualInput,
    setHintSubmode,
    setSequence,
    setVisualLines,
    setVisualSubmode,
    setZoomLevel,
    setKeycount,
    keycount,
    zoomLevel,
    currentChapterIdx,
    currentExerciseIdx,
    setExerciseIdx,
    setExStatus,
    setDone,
    pageRef,
    hintSubmode,
  ]);
}
