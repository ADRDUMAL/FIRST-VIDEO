// Renders preview stills of a composition at the given frames.
// Usage: node scripts/stills.mjs <compositionId> <outDir> <frame> [frame...]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";

const [, , id, outDir, ...frames] = process.argv;

const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id });

for (const f of frames) {
  const frame = Number(f);
  const output = path.join(outDir, `${id}_${String(frame).padStart(4, "0")}.jpg`);
  await renderStill({
    composition,
    serveUrl,
    frame,
    output,
    imageFormat: "jpeg",
    jpegQuality: 85,
    scale: 0.5,
  });
  console.log(output);
}
