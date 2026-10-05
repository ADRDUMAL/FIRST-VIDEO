import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, outline, RED, WHITE } from "./style";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type Word = { readonly text: string; readonly at: number };

const PopWord: React.FC<{ readonly word: Word; readonly color: string }> = ({ word, color }) => {
  const frame = useCurrentFrame();
  const age = frame - word.at;
  if (age < 0) return null;
  return (
    <span
      style={{
        display: "inline-block",
        color,
        opacity: interpolate(age, [0, 2], [0, 1], clamp),
        scale: String(interpolate(age, [0, 3, 6], [0.6, 1.1, 1], clamp)),
        translate: `0px ${interpolate(age, [0, 5], [18, 0], clamp)}px`,
      }}
    >
      {word.text}
    </span>
  );
};

/** Final question, centered on screen and revealed word by word with the voice. */
const Title: React.FC<{ readonly top: Word[]; readonly bottom: Word[] }> = ({ top, bottom }) => {
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 60 }}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.02,
          letterSpacing: -1,
        }}
      >
        <div style={{ fontSize: 104, display: "flex", gap: 26, justifyContent: "center", textShadow: outline(9) }}>
          {top.map((w) => (
            <PopWord key={w.text} word={w} color={WHITE} />
          ))}
        </div>
        <div style={{ fontSize: 132, display: "flex", gap: 30, justifyContent: "center", marginTop: 10, textShadow: outline(11) }}>
          {bottom.map((w) => (
            <PopWord key={w.text} word={w} color={RED} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const CtaTitle: React.FC<{
  readonly name: string;
  readonly from: number;
  readonly durationInFrames: number;
  readonly top: Word[];
  readonly bottom: Word[];
}> = ({ name, from, durationInFrames, top, bottom }) => {
  const { fps } = useVideoConfig();
  return (
    <Sequence name={name} from={from} durationInFrames={durationInFrames} premountFor={fps}>
      <Title top={top} bottom={bottom} />
    </Sequence>
  );
};
