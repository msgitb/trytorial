/**
 * FakeLink Component
 * Displays a link with hint labeling in Hint mode
 */

export function FakeLink({
  text,
  labelIdx,
  showHint,
  typed,
  hintSubmode,
  label,
}) {
  const active = showHint;
  const matched =
    active &&
    label.toUpperCase().startsWith(typed.toUpperCase()) &&
    typed.length > 0;
  const full = active && label.toUpperCase() === typed.toUpperCase();
  const dimmed = active && !matched && typed.length > 0;
  const hintColor = hintSubmode === "copyURL" ? "#22d3ee" : "#f59e0b";
  const hintBg = hintSubmode === "copyURL" ? "#0d1f30" : "#1a1400";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "3px 0",
      }}
    >
      {active && (
        <span
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 11,
            fontWeight: 700,
            background: full ? "#22c55e22" : hintBg,
            color: full ? "#22c55e" : hintColor,
            border: `1px solid ${full ? "#22c55e66" : hintColor + "44"}`,
            padding: "0 5px",
            borderRadius: 3,
            minWidth: 22,
            textAlign: "center",
            opacity: dimmed ? 0.25 : 1,
            transition: "all 0.12s",
            flexShrink: 0,
          }}
        >
          {label}
        </span>
      )}
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        style={{
          color: "#38bdf8",
          fontSize: 13,
          textDecoration: "none",
          borderBottom: "1px solid #38bdf822",
          paddingBottom: 1,
          opacity: active && dimmed ? 0.35 : 1,
          transition: "opacity 0.12s",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {text} →
      </a>
    </div>
  );
}
