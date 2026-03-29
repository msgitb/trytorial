/**
 * LessonPanel Component
 * Displays theory, mode cards, and exercise information
 */

import { CHAPTERS } from "../constants";

export function LessonPanel({
  currentChapterIdx,
  currentExerciseIdx,
  done,
  keycount,
  exStatus,
  onPreviousExercise,
  onSkipExercise,
  onNextChapter,
}) {
  const chapter = CHAPTERS[currentChapterIdx];
  const exercise = chapter.exercises[currentExerciseIdx];

  return (
    <div
      style={{
        flex: "0 0 auto",
        maxHeight: "46%",
        overflowY: "auto",
        borderBottom: "1px solid #12122a",
      }}
    >
      <div style={{ padding: "20px 28px 0" }}>
        {/* Chapter header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              flexShrink: 0,
              background: "linear-gradient(135deg,#22d3ee18,#a855f718)",
              border: "1px solid #22d3ee22",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "#22d3ee",
            }}
          >
            {chapter.icon}
          </div>
          <div>
            <div
              style={{
                fontSize: 9,
                color: "#374151",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 3,
              }}
            >
              Chapter {chapter.id} of 8
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#e2e8f0",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
            >
              {chapter.title}
            </div>
            <div style={{ fontSize: 12, color: "#4b5563", marginTop: 2 }}>
              {chapter.sub}
            </div>
          </div>
        </div>

        {/* Theory */}
        <div
          style={{
            fontSize: 13,
            color: "#9ca3af",
            lineHeight: 1.8,
            marginBottom: 16,
            maxWidth: 700,
            padding: "10px 14px",
            background: "#0a0a1a",
            borderLeft: "2px solid #22d3ee44",
            borderRadius: "0 6px 6px 0",
          }}
        >
          {chapter.theory}
        </div>

        {/* Mode cards (chapter 1 only) */}
        {chapter.modeCards && (
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            {chapter.modeCards.map((modeCard) => (
              <div
                key={modeCard.name}
                style={{
                  flex: "1 1 130px",
                  minWidth: 120,
                  padding: "10px 12px",
                  background: "#0a0a1a",
                  border: `1px solid ${modeCard.color}28`,
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    marginBottom: 5,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      background: `${modeCard.color}1a`,
                      color: modeCard.color,
                      padding: "1px 6px",
                      borderRadius: 3,
                      border: `1px solid ${modeCard.color}33`,
                    }}
                  >
                    {modeCard.key}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: modeCard.color,
                    }}
                  >
                    {modeCard.name}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#4b5563",
                    lineHeight: 1.5,
                  }}
                >
                  {modeCard.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exercise panel */}
      <div style={{ padding: "0 28px 20px" }}>
        <div
          style={{
            background: exStatus === "success" ? "#0a2018" : "#090916",
            border: `1px solid ${exStatus === "success" ? "#22c55e44" : "#1a1a32"}`,
            borderRadius: 10,
            padding: "14px 18px",
            transition: "all 0.3s ease",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: "#374151",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Exercise {currentExerciseIdx + 1} / {chapter.exercises.length}
            </span>
            <div style={{ display: "flex", gap: 5 }}>
              {chapter.exercises.map((_, i) => (
                <div
                  key={i}
                  className="nav-dot"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: done.has(chapter.exercises[i].id)
                      ? "#22c55e"
                      : i === currentExerciseIdx
                        ? "#22d3ee"
                        : "#1a1a32",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Task */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#e2e8f0",
              marginBottom: 12,
              lineHeight: 1.5,
            }}
          >
            {exercise.task}
          </div>

          {/* Keys to press */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 11, color: "#374151" }}>Press:</span>
            {exercise.hint.split(" ").map((k, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: 11,
                  background: "#161630",
                  border: "1px solid #2a2a50",
                  borderBottom: "2px solid #2a2a50",
                  color: "#a5b4fc",
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                {k}
              </span>
            ))}
          </div>

          {/* Key count progress */}
          {exercise.type === "keycount" &&
            keycount > 0 &&
            keycount < exercise.count && (
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: "#1a1a32",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(keycount / exercise.count) * 100}%`,
                      background: "#22d3ee",
                      borderRadius: 1,
                      transition: "width 0.2s",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 10,
                    color: "#22d3ee",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  {keycount}/{exercise.count}
                </span>
              </div>
            )}

          {/* Nav buttons */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {currentExerciseIdx > 0 && (
              <button
                onClick={onPreviousExercise}
                style={{
                  fontSize: 11,
                  color: "#374151",
                  background: "transparent",
                  border: "1px solid #1a1a32",
                  borderRadius: 5,
                  padding: "4px 10px",
                  cursor: "pointer",
                }}
              >
                ← Prev
              </button>
            )}
            {currentExerciseIdx < chapter.exercises.length - 1 && (
              <button
                onClick={onSkipExercise}
                style={{
                  fontSize: 11,
                  color: "#374151",
                  background: "transparent",
                  border: "1px solid #1a1a32",
                  borderRadius: 5,
                  padding: "4px 10px",
                  cursor: "pointer",
                  marginLeft: "auto",
                }}
              >
                Skip →
              </button>
            )}
            {currentChapterIdx < CHAPTERS.length - 1 &&
              currentExerciseIdx === chapter.exercises.length - 1 && (
                <button
                  onClick={onNextChapter}
                  style={{
                    fontSize: 11,
                    color: "#22d3ee",
                    background: "#22d3ee14",
                    border: "1px solid #22d3ee33",
                    borderRadius: 5,
                    padding: "4px 12px",
                    cursor: "pointer",
                    marginLeft: "auto",
                  }}
                >
                  Next chapter →
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
