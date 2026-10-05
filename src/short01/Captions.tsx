import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { estimateEm, FONT, outline, RED, WHITE } from "./style";

export type Cap = {
  /** Words wrapped in *asterisks* are highlighted in red. */
  readonly text: string;
  /** Seconds on the final timeline. */
  readonly start: number;
  readonly end: number;
  readonly big?: boolean;
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const MAX_WIDTH = 940;
// Center line of the captions: slightly below the middle, inside the safe zone
// of 9:16, 4:5 and 1:1 crops and clear of the TikTok/Reels/Shorts UI.
const CENTER_Y = 1190;

const renderWords = (text: string) =>
  text.split(/(\*[^*]+\*)/g).filter(Boolean).map((part, i) =>
    part.startsWith("*") ? (
      <span key={i} style={{ color: RED }}>
        {part.slice(1, -1)}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

export const Captions: React.FC<{ readonly caps: Cap[] }> = ({ caps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const cap = caps.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;

  const age = frame - Math.round(cap.start * fps);
  const plain = cap.text.replace(/\*/g, "");
  const base = cap.big ? 150 : 118;
  const fontSize = Math.min(base, MAX_WIDTH / estimateEm(plain));

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: CENTER_Y - fontSize / 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize,
            lineHeight: 1,
            letterSpacing: -1,
            color: WHITE,
            textAlign: "center",
            whiteSpace: "nowrap",
            textShadow: outline(cap.big ? 11 : 9),
            opacity: interpolate(age, [0, 2], [0, 1], clamp),
            scale: String(interpolate(age, [0, 3, 6], [0.72, 1.08, 1], clamp)),
            translate: `0px ${interpolate(age, [0, 5], [16, 0], clamp)}px`,
          }}
        >
          {renderWords(cap.text)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
