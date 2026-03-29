/**
 * Mode definitions for the Vim-like modal interface
 */

export const MODES = {
  NORMAL: "NORMAL",
  HINT: "HINT",
  COMMAND: "COMMAND",
  VISUAL: "VISUAL",
  IGNORE: "IGNORE",
};

export const MODE_STYLES = {
  NORMAL: { color: "#22d3ee", background: "#22d3ee18", label: "NORMAL" },
  HINT: { color: "#f59e0b", background: "#f59e0b18", label: "HINT" },
  COMMAND: { color: "#a855f7", background: "#a855f718", label: "COMMAND" },
  VISUAL: { color: "#fb923c", background: "#fb923c18", label: "VISUAL" },
  IGNORE: { color: "#6b7280", background: "#6b728018", label: "IGNORE" },
};
