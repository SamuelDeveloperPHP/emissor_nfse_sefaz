import React from "react";

const GAP = 7; // px between the text and each line, and how far each line overhangs the text

const linha: React.CSSProperties = {
  position: "absolute",
  left: -GAP,
  right: -GAP,
  height: 2,
  background: "currentColor",
};

/**
 * Text logo of the system, with a rule above and below. The Velzon template shows
 * `.logo-dark` or `.logo-light` depending on the sidebar/theme colour, so the same
 * mark is rendered for both tones.
 */
const BrandMark = ({ tone, compact = false }: { tone: "dark" | "light"; compact?: boolean }) => (
  <span
    style={{
      position: "relative",
      display: "inline-block",
      verticalAlign: "middle",
      padding: `${GAP}px 0`,
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontWeight: 600,
      fontSize: compact ? "1.5rem" : "1.35rem",
      letterSpacing: compact ? 0 : "0.14em",
      lineHeight: 1,
      color: tone === "light" ? "#ffffff" : "#0f2a33",
    }}
  >
    {/* letter-spacing also trails the last letter, so the right edge is pulled back by it */}
    <span aria-hidden="true" style={{ ...linha, top: 0, right: compact ? -GAP : `calc(${-GAP}px + 0.14em)` }} />
    {compact ? "E" : "EMISSOR"}
    <span aria-hidden="true" style={{ ...linha, bottom: 0, right: compact ? -GAP : `calc(${-GAP}px + 0.14em)` }} />
  </span>
);

export default BrandMark;
