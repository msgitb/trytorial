/**
 * BrowserSimulator Component
 * Displays the fake browser page with links and command line interface
 */

import { forwardRef } from "react";
import { FakeLink } from "./FakeLink";
import { LINKS, LABELS, MODES, MODE_STYLES } from "../constants";

export const BrowserSimulator = forwardRef(
  (
    {
      mode,
      cmdInput,
      statusMsg,
      sequence,
      hintInput,
      hintSubmode,
      visualLines,
      visualInput,
      visualSubmode,
      zoomLevel,
    },
    pageRef,
  ) => {
    // Visual mode labels (for 12 content blocks)
    const visualLabels = ["A", "S", "D", "F", "J", "K", "L", "G", "Q", "W", "E", "R"];

    // Helper to determine if a line index should be highlighted
    const getLineHighlight = (lineIdx) => {
      if (mode !== MODES.VISUAL || visualLines < 0) return {};
      if (lineIdx === visualLines) {
        return {
          background: "#fb923c22",
          transition: "background 0.1s ease-out",
        };
      }
      return {};
    };

    // Helper to show visual label on content block
    const getVisualLabel = (lineIdx) => {
      if (mode !== MODES.VISUAL) return null;
      return (
        <span
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            background: MODE_STYLES.VISUAL.background,
            color: MODE_STYLES.VISUAL.color,
            padding: "2px 6px",
            borderRadius: 3,
            fontSize: 10,
            fontWeight: 700,
            fontFamily: "'JetBrains Mono',monospace",
            border: `1px solid ${MODE_STYLES.VISUAL.color}55`,
          }}
        >
          {visualLabels[lineIdx]}
        </span>
      );
    };
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#06060e",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            padding: "7px 14px",
            background: "#080818",
            borderBottom: "1px solid #12122a",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", gap: 5 }}>
            {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
              <div
                key={c}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: `${c}33`,
                  border: `1px solid ${c}55`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              background: "#0c0c1e",
              border: "1px solid #1a1a32",
              borderRadius: 6,
              padding: "4px 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              maxWidth: 520,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "#374151",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              https://example-tech-news.io/keyboard-navigation
            </span>
          </div>
          <span style={{ fontSize: 11, color: "#1e2050", marginLeft: "auto" }}>
            Firefox
          </span>
        </div>

        {/* Scrollable page */}
        <div
          ref={pageRef}
          style={{
            flex: 1,
            overflowY: "auto",
            position: "relative",
            padding: "24px 32px",
          }}
        >
          <article
            style={{
              maxWidth: 640,
              margin: "0 auto",
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
              transition: "transform 0.15s ease-out",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "#374151",
                marginBottom: 8,
                fontFamily: "'JetBrains Mono',monospace",
                ...getLineHighlight(0),
                padding: "4px 8px",
                borderRadius: 4,
                position: "relative",
              }}
            >
              {getVisualLabel(0)}
              example-tech-news.io · 4 min read
            </div>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#e2e8f0",
                marginBottom: 12,
                lineHeight: 1.35,
                ...getLineHighlight(1),
                padding: "4px 8px",
                borderRadius: 4,
                position: "relative",
              }}
            >
              {getVisualLabel(1)}
              The Power of Keyboard Navigation
            </h1>
            <p
              style={{
                fontSize: 13,
                color: "#9ca3af",
                marginBottom: 16,
                lineHeight: 1.85,
                ...getLineHighlight(2),
                padding: "4px 8px",
                borderRadius: 4,
                position: "relative",
              }}
            >
              {getVisualLabel(2)}
              Modern browsers are built for the mouse, but power users know the
              keyboard is far faster for many tasks. Extensions like Tridactyl
              bring Vim-style navigation to the web, turning every link and
              action into a keyboard shortcut.
            </p>

            <div
              style={{
                marginBottom: 20,
                padding: "12px 14px",
                background: "#0a0a18",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                gap: 5,
                ...getLineHighlight(3),
                position: "relative",
              }}
            >
              {getVisualLabel(3)}
              {LINKS.slice(0, 3).map((link, i) => (
                <FakeLink
                  key={i}
                  text={link}
                  labelIdx={i}
                  showHint={mode === MODES.HINT}
                  typed={hintInput}
                  hintSubmode={hintSubmode}
                  label={LABELS[i]}
                />
              ))}
            </div>

            <h2
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#e2e8f0",
                margin: "20px 0 10px",
                ...getLineHighlight(4),
                padding: "4px 8px",
                borderRadius: 4,
                position: "relative",
              }}
            >
              {getVisualLabel(4)}
              Why Modal Navigation?
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "#9ca3af",
                marginBottom: 12,
                lineHeight: 1.85,
                ...getLineHighlight(5),
                padding: "4px 8px",
                borderRadius: 4,
                position: "relative",
              }}
            >
              {getVisualLabel(5)}
              The insight behind modal editors like Vim is simple: most editing
              time is spent navigating and manipulating — not typing new
              characters. Separating modes means each key can serve multiple
              purposes depending on context.
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#9ca3af",
                marginBottom: 16,
                lineHeight: 1.85,
                ...getLineHighlight(6),
                padding: "4px 8px",
                borderRadius: 4,
                position: "relative",
              }}
            >
              {getVisualLabel(6)}
              The same principle applies to web browsing. Most sessions are
              reading and navigation, not form-filling. Tridactyl optimizes for
              that majority use case.
            </p>

            {/* Visual mode indicator */}
            {mode === MODES.VISUAL && (
              <div
                style={{
                  background: "#fb923c18",
                  border: "1px solid #fb923c44",
                  borderRadius: 6,
                  padding: "8px 12px",
                  marginBottom: 14,
                  fontSize: 12,
                  color: "#fb923c",
                  fontFamily: "'JetBrains Mono',monospace",
                  animation: "pulse 2s ease infinite",
                }}
              >
                ▌ Visual — {visualLines} line{visualLines !== 1 ? "s" : ""}{" "}
                selected
              </div>
            )}

            <div
              style={{
                marginBottom: 20,
                padding: "12px 14px",
                background: "#0a0a18",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                gap: 5,
                ...getLineHighlight(7),
                position: "relative",
              }}
            >
              {getVisualLabel(7)}
              {LINKS.slice(3, 5).map((link, i) => (
                <FakeLink
                  key={i}
                  text={link}
                  labelIdx={i + 3}
                  showHint={mode === MODES.HINT}
                  typed={hintInput}
                  hintSubmode={hintSubmode}
                  label={LABELS[i + 3]}
                />
              ))}
            </div>

            <h2
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#e2e8f0",
                margin: "20px 0 10px",
                ...getLineHighlight(8),
                padding: "4px 8px",
                borderRadius: 4,
                position: "relative",
              }}
            >
              {getVisualLabel(8)}
              Getting Started
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "#9ca3af",
                marginBottom: 12,
                lineHeight: 1.85,
                ...getLineHighlight(9),
                padding: "4px 8px",
                borderRadius: 4,
                position: "relative",
              }}
            >
              {getVisualLabel(9)}
              Install Tridactyl from the Firefox Add-ons store. After
              installation, visit{" "}
              <span
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  color: "#a855f7",
                }}
              >
                :tutor
              </span>{" "}
              to start the official tutorial. The learning curve is steep but
              the productivity gain is enormous.
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#9ca3af",
                marginBottom: 16,
                lineHeight: 1.85,
                ...getLineHighlight(10),
                padding: "4px 8px",
                borderRadius: 4,
                position: "relative",
              }}
            >
              {getVisualLabel(10)}
              The first struggle for most users is switching modes. Remember:
              Escape always returns to Normal mode. If something unexpected
              happens, <span style={{ color: "#22d3ee" }}>Escape</span> is your
              safety net.
            </p>

            <div
              style={{
                marginBottom: 40,
                padding: "12px 14px",
                background: "#0a0a18",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                gap: 5,
                ...getLineHighlight(11),
                position: "relative",
              }}
            >
              {getVisualLabel(11)}
              {LINKS.slice(5).map((link, i) => (
                <FakeLink
                  key={i}
                  text={link}
                  labelIdx={i + 5}
                  showHint={mode === MODES.HINT}
                  typed={hintInput}
                  hintSubmode={hintSubmode}
                  label={LABELS[i + 5]}
                />
              ))}
            </div>

            <div
              style={{
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTop: "1px dashed #12122a",
                color: "#1e2050",
                fontSize: 12,
              }}
            >
              — end of page —
            </div>
          </article>
        </div>

        {/* Status / mode bar */}
        <div
          style={{
            height: 26,
            background: "#05050c",
            borderTop: "1px solid #10101e",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 12,
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 11,
            userSelect: "none",
          }}
        >
          {/* Mode pill */}
          <span
            style={{
              color: MODE_STYLES[mode].color,
              background: MODE_STYLES[mode].background,
              padding: "1px 9px",
              borderRadius: 3,
              fontWeight: 700,
              letterSpacing: "0.08em",
              fontSize: 10,
              border: `1px solid ${MODE_STYLES[mode].color}33`,
            }}
          >
            {mode}
          </span>

          {/* URL */}
          <span style={{ color: "#1e2050", flex: 1, fontSize: 10 }}>
            https://example-tech-news.io/keyboard-navigation
          </span>

          {/* Zoom level */}
          <span style={{ color: "#64748b", fontSize: 10 }}>{zoomLevel}%</span>

          {/* Visual submode indicator */}
          {mode === MODES.VISUAL && (
            <span style={{ color: MODE_STYLES.VISUAL.color, fontSize: 10 }}>
              type label to select · y to yank · Esc to exit
              {visualInput && ` (${visualInput})`}
            </span>
          )}

          {/* Hint submode indicator */}
          {mode === MODES.HINT && (
            <span style={{ color: MODE_STYLES.HINT.color, fontSize: 10 }}>
              {hintSubmode === "copyURL" ? ";y — copy URL" : "f — follow link"}{" "}
              · type label
            </span>
          )}

          {/* Status message */}
          {statusMsg && (
            <span
              style={{
                color: "#22d3ee",
                maxWidth: 320,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {statusMsg}
            </span>
          )}

          {/* Sequence buffer */}
          {sequence.length > 0 && !statusMsg && (
            <span style={{ color: "#f59e0b" }}>{sequence.join("")}</span>
          )}
        </div>
      </div>
    );
  },
);

BrowserSimulator.displayName = "BrowserSimulator";
