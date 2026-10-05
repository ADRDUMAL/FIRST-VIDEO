import { Audio } from "@remotion/media";
import React from "react";
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from "remotion";
import { Captions } from "./Captions";
import { CommentCards } from "./CommentCards";
import { CtaTitle } from "./CtaTitle";
import { Shot } from "./Shot";

// ELOWZ — Short 01 ("you build my game").
// 1080x1920 @ 60fps. All frame numbers below are on the final timeline.
// Voice: public/voice_master.wav (mastered copy of the recorded take), cut into
// five segments to remove dead air. Gameplay recordings have no game audio.

const edgeFade = (durationInFrames: number) => (f: number) =>
  interpolate(f, [0, 2, durationInFrames - 3, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const COMMENTS = [
  {
    user: "@cupfan_01",
    text: "add a cup that runs away from the ball",
    avatar: "linear-gradient(135deg,#ff3b3b,#8a0000)",
  },
  {
    user: "@lavamode",
    text: "1v1 but the floor is lava",
    avatar: "linear-gradient(135deg,#ff9a3b,#b31e00)",
  },
  {
    user: "@noobplayer22",
    text: "make the ball explode when you miss",
    avatar: "linear-gradient(135deg,#5b5b5b,#111111)",
  },
];

export const Short01: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* ───────── HOOK: "I've been playing way too many Roblox games lately" ───────── */}
      <Shot name="Hook · keyboard run" clip="keyboard_007_00.mp4" clipStart={7.0} srcStart={7.4} from={0} durationInFrames={27} zoomFrom={1.12} zoomTo={1.04} />
      <Shot name="Hook · brainrot" clip="brainrot_002_50.mp4" clipStart={2.5} srcStart={3.0} from={27} durationInFrames={24} />
      <Shot name="Hook · scrolling games" clip="scroll_008_50.mp4" clipStart={8.5} srcStart={9.0} from={51} durationInFrames={36} playbackRate={2.5} />
      <Shot name="Hook · soccer goal" clip="soccer_053_50.mp4" clipStart={53.5} srcStart={54.0} from={87} durationInFrames={24} zoomFrom={1.08} zoomTo={1.0} />
      <Shot name="Hook · scrolling games 2" clip="scroll_008_50.mp4" clipStart={8.5} srcStart={12.5} from={111} durationInFrames={41} playbackRate={2.5} zoomFrom={1.04} zoomTo={1.12} />

      {/* ───────── PROBLEM: "...tired of playing the same stuff over and over" ───────── */}
      <Shot name="Same stuff · brainrot money" clip="brainrot_020_50.mp4" clipStart={20.5} srcStart={21.0} from={152} durationInFrames={36} />
      <Shot name="Same stuff · keyboard" clip="keyboard_001_00.mp4" clipStart={1.0} srcStart={1.5} from={188} durationInFrames={36} />
      <Shot name="Same stuff · soccer" clip="soccer_010_00.mp4" clipStart={10.0} srcStart={10.5} from={224} durationInFrames={31} focusX={0.43} />
      <Shot name="Same stuff · brainrot dance" clip="brainrot_006_00.mp4" clipStart={6.0} srcStart={6.5} from={255} durationInFrames={24} />
      <Shot name="Same stuff · keys" clip="keyboard_015_50.mp4" clipStart={15.5} srcStart={16.0} from={279} durationInFrames={30} />
      <Shot name="Over" clip="keyboard_001_00.mp4" clipStart={1.0} srcStart={2.0} from={309} durationInFrames={24} zoomFrom={1.0} zoomTo={1.0} />
      <Shot name="And over (same take again)" clip="keyboard_001_00.mp4" clipStart={1.0} srcStart={2.0} from={333} durationInFrames={39} zoomFrom={1.12} zoomTo={1.12} />

      {/* ───────── TURN: "So... I decided to make my own games instead" ───────── */}
      <Shot name="My own · base arch" clip="own_062_30.mp4" clipStart={62.3} srcStart={62.55} from={372} durationInFrames={84} zoomBlurIn flash />
      <Shot name="My own · punch on 'own'" clip="own_062_30.mp4" clipStart={62.3} srcStart={63.95} from={456} durationInFrames={71} zoomFrom={1.14} zoomTo={1.08} />

      {/* ───────── REVEAL: "And this is the first one I'm working on" ───────── */}
      <Shot name="Reveal · perfect shot" clip="own_022_50.mp4" clipStart={22.5} srcStart={22.75} from={527} durationInFrames={117} zoomBlurIn shakeAt={63} focusY={0.4} />

      {/* ───────── MECHANIC: "...try to land the ball in the cup" ───────── */}
      <Shot name="Mechanic · timing bar" clip="own_010_00.mp4" clipStart={10.0} srcStart={10.45} from={644} durationInFrames={70} focusY={0.9} zoomFrom={1.35} zoomTo={1.42} />
      <Shot name="Mechanic · throw" clip="own_039_30.mp4" clipStart={39.3} srcStart={39.45} from={714} durationInFrames={60} focusY={0.45} zoomFrom={1.08} zoomTo={1.14} />
      <Shot name="Mechanic · cup hit" clip="own_039_30.mp4" clipStart={39.3} srcStart={40.45} from={774} durationInFrames={80} focusY={0.4} zoomFrom={1.14} zoomTo={1.05} shakeAt={21} />

      {/* ───────── WIP: "...the game is nowhere near finished" ───────── */}
      <Shot name="WIP · ball skins" clip="own_047_00.mp4" clipStart={47.0} srcStart={47.6} from={854} durationInFrames={36} zoomFrom={1.04} zoomTo={1.1} />
      <Shot name="WIP · coming soon" clip="own_047_00.mp4" clipStart={47.0} srcStart={50.6} from={890} durationInFrames={36} focusX={0.53} focusY={0.35} zoomFrom={1.15} zoomTo={1.25} />
      <Shot name="WIP · tables" clip="own_047_00.mp4" clipStart={47.0} srcStart={52.4} from={926} durationInFrames={30} zoomFrom={1.05} zoomTo={1.12} />
      <Shot name="WIP · practice" clip="own_075_50.mp4" clipStart={75.5} srcStart={75.6} from={956} durationInFrames={28} />

      {/* ───────── "But there's one problem. I don't wanna build them by myself." ───────── */}
      <Shot name="Problem · face push-in" clip="skin_020_30.mp4" clipStart={20.3} srcStart={20.6} from={984} durationInFrames={78} zoomBlurIn focusY={0.35} zoomFrom={1.0} zoomTo={1.12} />
      <Shot name="Problem · alone" clip="skin_000_50.mp4" clipStart={0.5} srcStart={1.0} from={1062} durationInFrames={83} zoomFrom={1.12} zoomTo={1.0} />

      {/* ───────── "I want YOU GUYS to decide what I add" ───────── */}
      <Shot name="You guys · avatar" clip="own_100_40.mp4" clipStart={100.4} srcStart={100.6} from={1145} durationInFrames={169} zoomBlurIn focusY={0.42} zoomFrom={1.0} zoomTo={1.1} punchAt={38} />

      {/* ───────── "Comment literally anything" ───────── */}
      <Shot name="Comment · background" clip="own_025_80.mp4" clipStart={25.8} srcStart={26.0} from={1314} durationInFrames={83} dim={0.45} zoomFrom={1.05} zoomTo={1.1} />

      {/* ───────── "Good idea, bad idea, completely stupid... I don't care." ───────── */}
      <Shot name="Good idea · perfect" clip="own_039_30.mp4" clipStart={39.3} srcStart={40.62} from={1397} durationInFrames={41} focusY={0.4} zoomFrom={1.1} zoomTo={1.04} shakeAt={11} />
      <Shot name="Bad idea · dino" clip="brainrot_006_00.mp4" clipStart={6.0} srcStart={7.7} from={1438} durationInFrames={66} shakeAt={30} />
      <Shot name="Stupid · piano" clip="skin_077_00.mp4" clipStart={77.0} srcStart={78.15} from={1504} durationInFrames={57} focusY={0.35} zoomFrom={1.04} zoomTo={1.12} />
      <Shot name="Don't care · head tilt" clip="skin_031_50.mp4" clipStart={31.5} srcStart={32.0} from={1561} durationInFrames={39} focusY={0.3} zoomFrom={1.12} zoomTo={1.2} />

      {/* ───────── "I'll pick one, build it and show it in the next video." ───────── */}
      <Shot name="Pick · background" clip="own_025_80.mp4" clipStart={25.8} srcStart={27.5} from={1600} durationInFrames={53} dim={0.5} />
      <Shot name="Build it · practice" clip="own_075_50.mp4" clipStart={75.5} srcStart={76.2} from={1653} durationInFrames={40} zoomFrom={1.1} zoomTo={1.18} />
      <Shot name="Show it · perfect" clip="own_075_50.mp4" clipStart={75.5} srcStart={81.45} from={1693} durationInFrames={74} focusY={0.4} zoomFrom={1.04} zoomTo={1.12} shakeAt={16} />

      {/* ───────── CTA: "So what are you adding first?" ───────── */}
      <Shot name="CTA · gameplay" clip="own_025_80.mp4" clipStart={25.8} srcStart={29.37} from={1767} durationInFrames={70} zoomBlurIn dim={0.22} focusY={0.4} zoomFrom={1.02} zoomTo={1.1} shakeAt={60} />

      {/* ───────── Overlays ───────── */}
      <CommentCards name="Comment cards" from={1314} durationInFrames={83} cards={COMMENTS} appearAt={[0, 22, 58]} />
      <CommentCards name="Pick a comment" from={1600} durationInFrames={53} cards={COMMENTS} appearAt={[0, 2, 4]} pickAt={26} pickIndex={0} />

      <Captions
        caps={[
          { text: "i've been", start: 0.12, end: 0.677 },
          { text: "playing", start: 0.677, end: 0.837 },
          { text: "way too", start: 0.837, end: 1.217 },
          { text: "many", start: 1.217, end: 1.457 },
          { text: "*roblox*", start: 1.457, end: 1.857 },
          { text: "games", start: 1.857, end: 2.197 },
          { text: "lately", start: 2.197, end: 2.5 },
          { text: "and honestly,", start: 2.537, end: 3.197 },
          { text: "i'm kinda", start: 3.197, end: 3.837 },
          { text: "*tired* of", start: 3.837, end: 4.257 },
          { text: "playing the", start: 4.257, end: 4.657 },
          { text: "same", start: 4.657, end: 4.957 },
          { text: "stuff", start: 4.957, end: 5.397 },
          { text: "over", start: 5.397, end: 5.557 },
          { text: "and *over*", start: 5.557, end: 6.05 },
          { text: "so...", start: 6.257, end: 6.697 },
          { text: "i decided", start: 6.697, end: 7.097 },
          { text: "to make", start: 7.097, end: 7.377 },
          { text: "my *own*", start: 7.377, end: 7.857 },
          { text: "games", start: 7.857, end: 8.157 },
          { text: "instead", start: 8.157, end: 8.55 },
          { text: "and this is", start: 8.777, end: 9.437 },
          { text: "the *first* one", start: 9.437, end: 10.057 },
          { text: "i'm", start: 10.057, end: 10.457 },
          { text: "working on", start: 10.457, end: 10.85 },
          { text: "it's basically", start: 10.907, end: 11.587 },
          { text: "a simple game", start: 11.587, end: 12.267 },
          { text: "where you try", start: 12.267, end: 12.687 },
          { text: "to land", start: 12.687, end: 13.087 },
          { text: "the ball", start: 13.087, end: 13.567 },
          { text: "in the *cup*", start: 13.567, end: 14.15 },
          { text: "but honestly,", start: 14.227, end: 14.887 },
          { text: "the game is", start: 14.887, end: 15.527 },
          { text: "*nowhere*", start: 15.527, end: 15.767 },
          { text: "near", start: 15.767, end: 16.227 },
          { text: "finished", start: 16.227, end: 16.66 },
          { text: "but there's", start: 16.72, end: 17.26 },
          { text: "one *problem*", start: 17.26, end: 17.74 },
          { text: "i don't wanna", start: 17.74, end: 18.26 },
          { text: "build them", start: 18.26, end: 18.58 },
          { text: "by *myself*", start: 18.58, end: 19.25 },
          { text: "i want", start: 19.283, end: 19.723 },
          { text: "*you guys*", start: 19.723, end: 20.143, big: true },
          { text: "to decide", start: 20.143, end: 20.723 },
          { text: "what i *add*", start: 20.723, end: 21.45 },
          { text: "*comment*", start: 21.903, end: 22.263 },
          { text: "literally", start: 22.263, end: 22.863 },
          { text: "anything", start: 22.863, end: 23.22 },
          { text: "good idea,", start: 23.283, end: 23.85 },
          { text: "bad idea,", start: 23.963, end: 24.62 },
          { text: "completely", start: 25.063, end: 25.563 },
          { text: "*stupid*", start: 25.563, end: 25.95 },
          { text: "i don't care", start: 26.023, end: 26.8 },
          { text: "i'll *pick* one", start: 26.873, end: 27.653 },
          { text: "build it", start: 27.653, end: 27.973 },
          { text: "and show it", start: 27.973, end: 28.513 },
          { text: "in the *next*", start: 28.513, end: 29.093 },
          { text: "video", start: 29.093, end: 29.4 },
        ]}
      />

      <CtaTitle
        name="CTA title"
        from={1767}
        durationInFrames={70}
        top={[
          { text: "so", at: 0 },
          { text: "what", at: 14 },
          { text: "are", at: 23 },
          { text: "you", at: 30 },
        ]}
        bottom={[
          { text: "adding", at: 42 },
          { text: "first?", at: 60 },
        ]}
      />

      {/* ───────── Voice (five cuts of one take) ───────── */}
      <Audio name="Voice · intro" src={staticFile("voice_master.wav")} from={0} trimBefore={23} durationInFrames={644} volume={edgeFade(644)} premountFor={fps} />
      <Audio name="Voice · the game" src={staticFile("voice_master.wav")} from={644} trimBefore={682} durationInFrames={340} volume={edgeFade(340)} premountFor={fps} />
      <Audio name="Voice · one problem" src={staticFile("voice_master.wav")} from={984} trimBefore={1038} durationInFrames={161} volume={edgeFade(161)} premountFor={fps} />
      <Audio name="Voice · you decide" src={staticFile("voice_master.wav")} from={1145} trimBefore={1218} durationInFrames={455} volume={edgeFade(455)} premountFor={fps} />
      <Audio name="Voice · pick one" src={staticFile("voice_master.wav")} from={1600} trimBefore={1682} durationInFrames={237} volume={edgeFade(237)} premountFor={fps} />

      {/* ───────── SFX (synthesized, kept subtle) ───────── */}
      <Audio name="SFX · whoosh scroll" src={staticFile("sfx/whoosh.wav")} from={47} volume={0.14} premountFor={fps} />
      <Audio name="SFX · whoosh into own game" src={staticFile("sfx/whoosh.wav")} from={360} volume={0.2} premountFor={fps} />
      <Audio name="SFX · hard cut impact" src={staticFile("sfx/thump.wav")} from={372} volume={0.55} premountFor={fps} />
      <Audio name="SFX · whoosh reveal" src={staticFile("sfx/whoosh.wav")} from={517} volume={0.18} premountFor={fps} />
      <Audio name="SFX · ding reveal" src={staticFile("sfx/ding.wav")} from={590} volume={0.26} premountFor={fps} />
      <Audio name="SFX · tick bar" src={staticFile("sfx/tick.wav")} from={644} volume={0.22} premountFor={fps} />
      <Audio name="SFX · ding mechanic" src={staticFile("sfx/ding.wav")} from={795} volume={0.3} premountFor={fps} />
      <Audio name="SFX · whoosh problem" src={staticFile("sfx/whoosh.wav")} from={974} volume={0.18} premountFor={fps} />
      <Audio name="SFX · impact problem" src={staticFile("sfx/thump.wav")} from={984} volume={0.3} premountFor={fps} />
      <Audio name="SFX · whoosh you guys" src={staticFile("sfx/whoosh.wav")} from={1135} volume={0.18} premountFor={fps} />
      <Audio name="SFX · tick you guys" src={staticFile("sfx/tick.wav")} from={1183} volume={0.3} premountFor={fps} />
      <Audio name="SFX · pop comment 1" src={staticFile("sfx/pop.wav")} from={1314} volume={0.38} premountFor={fps} />
      <Audio name="SFX · pop comment 2" src={staticFile("sfx/pop.wav")} from={1336} volume={0.38} premountFor={fps} />
      <Audio name="SFX · pop comment 3" src={staticFile("sfx/pop.wav")} from={1372} volume={0.38} premountFor={fps} />
      <Audio name="SFX · ding good idea" src={staticFile("sfx/ding.wav")} from={1408} volume={0.2} premountFor={fps} />
      <Audio name="SFX · thump bad idea" src={staticFile("sfx/thump.wav")} from={1468} volume={0.38} premountFor={fps} />
      <Audio name="SFX · tick stupid" src={staticFile("sfx/tick.wav")} from={1504} volume={0.24} premountFor={fps} />
      <Audio name="SFX · pop pick list" src={staticFile("sfx/pop.wav")} from={1600} volume={0.25} premountFor={fps} />
      <Audio name="SFX · pop picked" src={staticFile("sfx/pop.wav")} from={1626} volume={0.42} premountFor={fps} />
      <Audio name="SFX · ding show it" src={staticFile("sfx/ding.wav")} from={1709} volume={0.24} premountFor={fps} />
      <Audio name="SFX · whoosh CTA" src={staticFile("sfx/whoosh.wav")} from={1757} volume={0.18} premountFor={fps} />
      <Audio name="SFX · ding CTA" src={staticFile("sfx/ding.wav")} from={1827} volume={0.2} premountFor={fps} />
    </AbsoluteFill>
  );
};
