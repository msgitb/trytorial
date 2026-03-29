/**
 * Sidebar Component
 * Displays chapter list and overall progress
 */

import { CHAPTERS } from "../constants";

export function Sidebar({ currentChapterIdx, done, onChapterSelect }) {
  const totalEx = CHAPTERS.reduce((s, c) => s + c.exercises.length, 0);
  const totalDone = done.size;
  const totalPct = Math.round((totalDone / totalEx) * 100);

  return (
    <aside
      style={{
        width: 226,
        minWidth: 226,
        background: "#05050f",
        borderRight: "1px solid #12122a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Branding */}
      <div
        style={{
          padding: "20px 16px 16px",
          borderBottom: "1px solid #12122a",
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: "#374151",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 6,
            fontWeight: 500,
          }}
        >
          Interactive Practice
        </div>
        <div
          style={{
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            background:
              "linear-gradient(110deg,#22d3ee 0%,#818cf8 55%,#a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Tridactyl
        </div>

        {/* Global progress */}
        <div style={{ marginTop: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10,
              color: "#374151",
              marginBottom: 5,
            }}
          >
            <span>Overall progress</span>
            <span
              style={{
                color: "#22d3ee",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {totalDone}/{totalEx}
            </span>
          </div>
          <div
            style={{
              height: 3,
              background: "#12122a",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${totalPct}%`,
                background: "linear-gradient(90deg,#22d3ee,#a855f7)",
                borderRadius: 2,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* Chapter list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
        {CHAPTERS.map((chapter, i) => {
          const cdone = chapter.exercises.filter((e) => done.has(e.id)).length;
          const pct = Math.round((cdone / chapter.exercises.length) * 100);
          const active = i === currentChapterIdx;

          return (
            <button
              key={chapter.id}
              className="ch-btn"
              onClick={() => onChapterSelect(i)}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: active ? "#0d0d1e" : "transparent",
                border: "none",
                borderLeft: `3px solid ${active ? "#22d3ee" : "transparent"}`,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span
                  style={{
                    fontSize: 14,
                    color: active ? "#22d3ee" : "#374151",
                    width: 16,
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  {chapter.icon}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: active ? "#e2e8f0" : "#6b7280",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {chapter.title}
                  </div>
                  <div style={{ fontSize: 10, color: "#2d3050", marginTop: 1 }}>
                    {chapter.sub}
                  </div>
                </div>
                {pct === 100 ? (
                  <span
                    style={{ color: "#22c55e", fontSize: 12, flexShrink: 0 }}
                  >
                    ✓
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: 10,
                      color: "#2d3050",
                      fontFamily: "'JetBrains Mono',monospace",
                      flexShrink: 0,
                    }}
                  >
                    {cdone}/{chapter.exercises.length}
                  </span>
                )}
              </div>
              {active && (
                <div
                  style={{
                    marginTop: 6,
                    height: 2,
                    background: "#12122a",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: "#22d3ee55",
                      borderRadius: 1,
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
