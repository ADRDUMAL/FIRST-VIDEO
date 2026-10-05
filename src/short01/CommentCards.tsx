import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT, RED } from "./style";

export type CommentCard = {
  readonly user: string;
  readonly text: string;
  readonly avatar: string;
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Card: React.FC<{
  readonly card: CommentCard;
  readonly appearAt: number;
  readonly picked: number;
  readonly dimmed: number;
}> = ({ card, appearAt, picked, dimmed }) => {
  const frame = useCurrentFrame();
  const age = frame - appearAt;
  const pop = interpolate(age, [0, 9], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  return (
    <div
      style={{
        width: 930,
        display: "flex",
        alignItems: "flex-start",
        gap: 24,
        padding: "30px 34px",
        borderRadius: 30,
        backgroundColor: "rgba(16,16,16,0.94)",
        border: `${3 + 3 * picked}px solid ${picked > 0.01 ? RED : "rgba(255,255,255,0.10)"}`,
        boxShadow: `0 18px 44px rgba(0,0,0,0.55)${picked > 0.01 ? `, 0 0 ${40 * picked}px rgba(255,46,46,${0.6 * picked})` : ""}`,
        opacity: interpolate(age, [0, 3], [0, 1], clamp) * (1 - 0.6 * dimmed),
        scale: String((0.55 + 0.45 * pop) * (1 + 0.06 * picked)),
        translate: `0px ${(1 - pop) * 50}px`,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          width: 88,
          height: 88,
          flexShrink: 0,
          borderRadius: 44,
          background: card.avatar,
          color: "white",
          fontWeight: 900,
          fontSize: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {card.user.charAt(1).toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div style={{ color: "#AAAAAA", fontSize: 33, fontWeight: 700 }}>
          {card.user}
          <span style={{ color: "#717171", fontWeight: 700 }}> · just now</span>
        </div>
        <div style={{ color: "white", fontSize: 49, fontWeight: 800, lineHeight: 1.12 }}>
          {card.text}
        </div>
      </div>
      {picked > 0.01 ? (
        <div
          style={{
            alignSelf: "center",
            flexShrink: 0,
            backgroundColor: RED,
            color: "white",
            fontWeight: 900,
            fontSize: 30,
            padding: "10px 18px",
            borderRadius: 16,
            scale: String(interpolate(picked, [0, 1], [0.3, 1])),
          }}
        >
          ✓
        </div>
      ) : null}
    </div>
  );
};

const CommentStack: React.FC<{
  readonly cards: CommentCard[];
  readonly appearAt: number[];
  readonly pickAt?: number;
  readonly pickIndex?: number;
}> = ({ cards, appearAt, pickAt, pickIndex = 0 }) => {
  const frame = useCurrentFrame();
  const pick =
    pickAt === undefined
      ? 0
      : interpolate(frame, [pickAt, pickAt + 8], [0, 1], {
          ...clamp,
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        });

  return (
    <AbsoluteFill
      style={{
        // Stack is centered around y≈760 so it stays inside every crop.
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 440,
        gap: 26,
      }}
    >
      {cards.map((card, i) => (
        <Card
          key={card.user}
          card={card}
          appearAt={appearAt[i] ?? 0}
          picked={i === pickIndex ? pick : 0}
          dimmed={i === pickIndex ? 0 : pick}
        />
      ))}
    </AbsoluteFill>
  );
};

export const CommentCards: React.FC<{
  readonly name: string;
  readonly from: number;
  readonly durationInFrames: number;
  readonly cards: CommentCard[];
  readonly appearAt: number[];
  readonly pickAt?: number;
  readonly pickIndex?: number;
}> = ({ name, from, durationInFrames, ...rest }) => {
  const { fps } = useVideoConfig();
  return (
    <Sequence name={name} from={from} durationInFrames={durationInFrames} premountFor={fps}>
      <CommentStack {...rest} />
    </Sequence>
  );
};
