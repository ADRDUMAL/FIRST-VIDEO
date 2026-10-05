import { Video } from "@remotion/media";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Source recordings are 1920x1080 (OBS). The Short is 1080x1920, so every shot
// is a vertical crop: the frame is scaled to fill the height and slid
// horizontally so `focusX` (0..1 across the source width) sits in the center.
const OUT_W = 1080;
const OUT_H = 1920;
const SRC_W = 1920;
const SRC_H = 1080;
const BASE_SCALE = OUT_H / SRC_H;
const DRAWN_W = SRC_W * BASE_SCALE;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export type ShotProps = {
  readonly name: string;
  /** File inside public/clips. */
  readonly clip: string;
  /** Second of the original recording where the clip file begins. */
  readonly clipStart: number;
  /** Second of the original recording where this shot begins. */
  readonly srcStart: number;
  readonly from: number;
  readonly durationInFrames: number;
  readonly playbackRate?: number;
  readonly focusX?: number;
  /** Vertical anchor (0..1) that zooms grow from. */
  readonly focusY?: number;
  readonly zoomFrom?: number;
  readonly zoomTo?: number;
  /** Zoom-blur entrance used on chapter changes. */
  readonly zoomBlurIn?: boolean;
  readonly flash?: boolean;
  /** Local frame of an in-game impact (cup hit) that gets a short camera shake. */
  readonly shakeAt?: number;
  /** Local frame of a quick punch-in on an important word. */
  readonly punchAt?: number;
  /** Darkens the shot so overlays stay readable (0 = untouched). */
  readonly dim?: number;
};

const ShotContent: React.FC<Omit<ShotProps, "name" | "from">> = ({
  clip,
  clipStart,
  srcStart,
  durationInFrames,
  playbackRate = 1,
  focusX = 0.5,
  focusY = 0.5,
  zoomFrom = 1,
  zoomTo = 1.05,
  zoomBlurIn = false,
  flash = false,
  shakeAt,
  punchAt,
  dim = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const left = Math.min(0, Math.max(OUT_W - DRAWN_W, OUT_W / 2 - focusX * DRAWN_W));

  const drift = interpolate(frame, [0, durationInFrames], [zoomFrom, zoomTo], clamp);
  const enter = zoomBlurIn
    ? interpolate(frame, [0, 9], [1, 0], { ...clamp, easing: Easing.out(Easing.cubic) })
    : 0;
  const punch =
    punchAt === undefined
      ? 0
      : interpolate(frame, [punchAt, punchAt + 2, punchAt + 14], [0, 1, 0], clamp);

  const shakeT = shakeAt === undefined ? -1 : frame - shakeAt;
  const shakeAmp = shakeT >= 0 && shakeT < 16 ? 16 * Math.exp(-0.25 * shakeT) : 0;
  const shakeX = shakeAmp * Math.sin(shakeT * 2.7);
  const shakeY = shakeAmp * Math.cos(shakeT * 3.4);

  const scale = drift * (1 + 0.22 * enter) * (1 + 0.07 * punch);
  const blur = 18 * enter;

  return (
    <AbsoluteFill style={{ backgroundColor: "black", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          scale: String(scale),
          translate: `${shakeX}px ${shakeY}px`,
          transformOrigin: `${OUT_W / 2}px ${focusY * OUT_H}px`,
          filter: `saturate(1.12) contrast(1.06) brightness(${1 - dim})${
            blur > 0.05 ? ` blur(${blur}px)` : ""
          }`,
        }}
      >
        <Video
          src={staticFile(`clips/${clip}`)}
          trimBefore={Math.round((srcStart - clipStart) * fps)}
          playbackRate={playbackRate}
          muted
          premountFor={fps}
          style={{
            position: "absolute",
            left,
            top: 0,
            width: DRAWN_W,
            height: OUT_H,
          }}
        />
      </AbsoluteFill>
      {flash ? (
        <AbsoluteFill
          style={{
            backgroundColor: "white",
            opacity: interpolate(frame, [0, 1, 8], [0.75, 0.55, 0], clamp),
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

export const Shot: React.FC<ShotProps> = ({ name, from, durationInFrames, ...rest }) => {
  const { fps } = useVideoConfig();
  return (
    <Sequence name={name} from={from} durationInFrames={durationInFrames} premountFor={fps}>
      <ShotContent durationInFrames={durationInFrames} {...rest} />
    </Sequence>
  );
};
