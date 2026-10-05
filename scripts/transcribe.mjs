// Transcribes an audio file to Remotion Caption JSON with word-level timings.
// Usage: node scripts/transcribe.mjs public/voice.mp3 scripts/voice-captions.json
import { registerMediabunnyServer } from "@mediabunny/server";
import {
  WHISPER_WEBGPU_SAMPLE_RATE,
  canUseWhisperWebGpu,
  downloadWhisperModel,
  loadWhisperModel,
  toCaptions,
  transcribe,
} from "@remotion/whisper-webgpu";
import {
  ALL_FORMATS,
  Conversion,
  FilePathSource,
  Input,
  NullTarget,
  Output,
  WavOutputFormat,
} from "mediabunny";
import { writeFile } from "node:fs/promises";

const [, , src, out] = process.argv;

registerMediabunnyServer();

const support = await canUseWhisperWebGpu();
if (!support.supported) {
  throw new Error(support.detailedReason);
}

const chunks = [];
const input = new Input({ formats: ALL_FORMATS, source: new FilePathSource(src) });
const audioTrack = await input.getPrimaryAudioTrack();
if (audioTrack === null) {
  throw new Error("The media does not contain an audio track.");
}

const conversion = await Conversion.init({
  input,
  output: new Output({ format: new WavOutputFormat(), target: new NullTarget() }),
  video: { discard: true },
  audio: (track) => {
    if (track.id !== audioTrack.id) {
      return { discard: true };
    }
    return {
      codec: "pcm-f32",
      forceTranscode: true,
      numberOfChannels: 1,
      sampleFormat: "f32",
      sampleRate: WHISPER_WEBGPU_SAMPLE_RATE,
      process: (sample) => {
        const waveform = new Float32Array(
          sample.allocationSize({ format: "f32", planeIndex: 0 }) /
            Float32Array.BYTES_PER_ELEMENT,
        );
        sample.copyTo(waveform, { format: "f32", planeIndex: 0 });
        chunks.push({
          startFrame: Math.round(sample.timestamp * WHISPER_WEBGPU_SAMPLE_RATE),
          waveform,
        });
        return sample;
      },
    };
  },
});

if (!conversion.isValid) {
  throw new Error("The audio track cannot be decoded.");
}
await conversion.execute();

const waveformLength = chunks.reduce(
  (max, chunk) => Math.max(max, chunk.startFrame + chunk.waveform.length),
  0,
);
const channelWaveform = new Float32Array(waveformLength);
for (const chunk of chunks) {
  const destinationStart = Math.max(0, chunk.startFrame);
  const sourceStart = Math.max(0, -chunk.startFrame);
  const availableLength = Math.min(
    chunk.waveform.length - sourceStart,
    channelWaveform.length - destinationStart,
  );
  if (availableLength > 0) {
    channelWaveform.set(
      chunk.waveform.subarray(sourceStart, sourceStart + availableLength),
      destinationStart,
    );
  }
}

const model = process.argv[4] ?? "small.en";
await downloadWhisperModel({ model });
const modelHandle = await loadWhisperModel({ model });
const transcription = await transcribe({ channelWaveform, model, ...(model.endsWith(".en") ? {} : { language: "en" }) });
const { captions } = toCaptions({ whisperWebGpuOutput: transcription });
await writeFile(out, JSON.stringify(captions, null, 2));
console.log(captions.map((c) => `${(c.startMs / 1000).toFixed(2)}-${(c.endMs / 1000).toFixed(2)}${c.text}`).join("\n"));
await modelHandle[Symbol.asyncDispose]?.();
