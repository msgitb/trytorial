/**
 * Notification Component
 * Displays temporary notifications at the top of the screen
 */

export function Notification({ notification }) {
  if (!notification) return null;

  const { msg, type } = notification;

  return (
    <div
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        background:
          type === "success"
            ? "#0c2218"
            : type === "error"
              ? "#250d0d"
              : "#0c0c22",
        border: `1px solid ${type === "success" ? "#22c55e" : type === "error" ? "#ef4444" : "#22d3ee"}`,
        color:
          type === "success"
            ? "#22c55e"
            : type === "error"
              ? "#f87171"
              : "#22d3ee",
        padding: "9px 20px",
        borderRadius: 8,
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: 13,
        zIndex: 9999,
        boxShadow: "0 8px 40px #00000077",
        animation: "fadeUp 0.18s ease",
      }}
    >
      {msg}
    </div>
  );
}
