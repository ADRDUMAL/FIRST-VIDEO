import { loadFont } from "@remotion/google-fonts/Montserrat";

const { fontFamily } = loadFont("normal", {
  weights: ["700", "800", "900"],
  subsets: ["latin"],
});

export const FONT = fontFamily;

// Channel identity: red / black / white.
export const RED = "#FF2E2E";
export const WHITE = "#FFFFFF";

/** Thick black outline built from text-shadows, plus a soft drop shadow. */
export const outline = (width: number, color = "#000000"): string => {
  const shadows: string[] = [];
  for (let angle = 0; angle < 360; angle += 15) {
    const r = (angle * Math.PI) / 180;
    shadows.push(
      `${(Math.cos(r) * width).toFixed(2)}px ${(Math.sin(r) * width).toFixed(2)}px 0 ${color}`,
    );
  }
  shadows.push(`0 ${width + 5}px ${width * 2}px rgba(0,0,0,0.55)`);
  return shadows.join(", ");
};

/** Rough width of a Montserrat Black string, in em. Used to shrink long captions. */
export const estimateEm = (text: string): number => {
  let em = 0;
  for (const ch of text) {
    if (ch === " ") em += 0.28;
    else if (",.'!?".includes(ch)) em += 0.3;
    else if ("mw".includes(ch)) em += 0.92;
    else if ("ilj".includes(ch)) em += 0.32;
    else em += 0.64;
  }
  return em;
};
