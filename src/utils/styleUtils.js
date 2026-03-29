/**
 * Global styles and theme utilities
 */

export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;700&display=swap');
  * { box-sizing:border-box; margin:0; padding:0; }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:#1e2240; border-radius:2px; }
  @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  .ch-btn:hover { background:#10101f !important; }
  .nav-dot { transition:all 0.3s; }
`;

export const THEME = {
  dark: {
    bg: {
      primary: "#070712",
      secondary: "#05050f",
      tertiary: "#06060e",
      hover: "#10101f",
    },
    text: {
      primary: "#e2e8f0",
      secondary: "#9ca3af",
      tertiary: "#374151",
    },
    border: "#12122a",
    accent: "#22d3ee",
  },
};
