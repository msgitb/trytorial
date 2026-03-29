/**
 * Link data for the fake browser page
 */

export const LINKS = [
  "Vim documentation",
  "Tridactyl on GitHub",
  "Keyboard shortcuts reference",
  "History of modal interfaces",
  "Firefox Add-ons Store",
  "Community forum",
  "Video tutorial series",
  "Getting started guide",
];

/**
 * Generate hint labels based on link count
 */
export const generateLabels = () => {
  const a = "asdfjklg";
  return LINKS.map((_, i) => {
    return i < 8
      ? a[i].toUpperCase()
      : (a[Math.floor(i / 8) - 1] + a[i % 8]).toUpperCase();
  });
};

export const LABELS = generateLabels();
