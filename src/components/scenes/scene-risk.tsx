import { WordSequence } from "@/components/cinematic/word-sequence";

/**
 * SCENE 7 — THE RISK STORY.
 * Call-and-response typography: what you do vs. what the platform does.
 */
export function SceneRisk() {
  return (
    <WordSequence
      id="scene-risk"
      step={65}
      size="sentence"
      words={[
        { text: "You monitor performance.", tone: "dim" },
        { text: "We surface risk.", tone: "white" },
        { text: "You track balances.", tone: "dim" },
        { text: "We reveal exposure.", tone: "white" },
        { text: "You read numbers.", tone: "dim" },
        { text: "We provide context.", tone: "green" },
      ]}
    />
  );
}
