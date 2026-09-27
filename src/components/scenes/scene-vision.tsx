import { WordSequence } from "@/components/cinematic/word-sequence";

/**
 * SCENE 9 — VISION.
 * Minimalist black scenes with huge type. "Intelligence." is the film's
 * single green word — the only place color carries meaning.
 */
export function SceneVision() {
  return (
    <WordSequence
      id="scene-vision"
      step={80}
      size="sentence"
      words={[
        { text: "Today:", tone: "white", sub: "Analytics." },
        { text: "Tomorrow:", tone: "white", sub: "Intelligence.", subTone: "green" },
        { text: "Built for people who read the chain,", tone: "white", sub: "not the hype.", subTone: "white" },
      ]}
    />
  );
}
