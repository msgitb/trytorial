/**
 * useExerciseLogic Hook
 * Manages exercise completion and state transitions
 */

import { useCallback } from "react";
import { CHAPTERS } from "../constants";

export function useExerciseLogic(showNotif, pageRef) {
  const doComplete = useCallback(
    (curEx, curChi, curExi, setExStatus, setDone, setKeycount, setExi) => {
      setExStatus("success");
      setDone((d) => new Set([...d, curEx.id]));
      setKeycount(0);
      showNotif("✓ Exercise complete!", "success");

      setTimeout(() => {
        setExStatus("idle");
        if (curExi < CHAPTERS[curChi].exercises.length - 1) {
          setExi((i) => i + 1);
        } else {
          showNotif("🎉 Chapter complete! Move to the next one.", "success");
        }
      }, 1300);
    },
    [showNotif],
  );

  const handleCmd = useCallback(
    (
      cmd,
      curEx,
      doComplete,
      curChi,
      curExi,
      setExStatus,
      setDone,
      setKeycount,
      setExi,
      showNotif,
    ) => {
      const cmdMatch =
        cmd.trim().toLowerCase() === curEx.cmd.trim().toLowerCase();
      if (cmdMatch) {
        doComplete(
          curEx,
          curChi,
          curExi,
          setExStatus,
          setDone,
          setKeycount,
          setExi,
        );
      } else {
        showNotif("Not quite — check the command and try again", "error");
      }
    },
    [],
  );

  return { doComplete, handleCmd };
}
