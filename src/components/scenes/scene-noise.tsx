import { WordSequence } from "@/components/cinematic/word-sequence";

/**
 * SCENE 1 — NOISE.
 * Five full-screen typographic beats. No cards, no buttons, no chrome.
 */
export function SceneNoise() {
  return (
    <WordSequence
      id="scene-noise"
      step={75}
      words={[
        { text: "Noise.", tone: "dim" },
        { text: "Signals.", tone: "white" },
        { text: "Liquidity.", tone: "white" },
        { text: "Risk.", tone: "purple" },
        { text: "Insight.", tone: "green" },
      ]}
    />
  );
}
