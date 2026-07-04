"use client";

import { useState } from "react";
import { GameScreen } from "../components/GameScreen";
import { ResultScreen } from "../components/ResultScreen";
import { StartScreen } from "../components/StartScreen";

const styles = [
  { id: "auto", label: "Auto" },
  { id: "anime", label: "Anime" },
  { id: "hand-drawn", label: "Hand-drawn" },
  { id: "watercolor", label: "Watercolor" },
];

export default function Home() {
  const [theme, setTheme] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("auto");
  const [startedTheme, setStartedTheme] = useState("");
  const [startedStyle, setStartedStyle] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [round, setRound] = useState(1);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [imagePrompts, setImagePrompts] = useState<string[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStart = () => {
    setStartedTheme(theme);
    setStartedStyle(selectedStyle);
    setImagePrompts([theme]);
    setGameStarted(true);
  };

  const handleNext = () => {
    if (!guess.trim()) return;

    const nextGuesses = [...guesses, guess];
    setGuesses(nextGuesses);

    if (round < 3) {
      setImagePrompts([...imagePrompts, guess]);
      setRound(round + 1);
      setGuess("");
    } else {
      setGameFinished(true);
    }
  };

  const handleGenerateImage = async () => {
    const currentPrompt = imagePrompts[round - 1];

    if (!currentPrompt) return;

    setIsGenerating(true);
    setGeneratedMessage("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: currentPrompt,
          style: startedStyle,
        }),
      });

      const data = await response.json();

      setGeneratedMessage(
        `${data.message}: ${data.prompt} / style: ${data.style}`
      );
    } catch (error) {
      console.error(error);
      setGeneratedMessage("画像生成APIの呼び出しに失敗しました。");
    } finally {
      setIsGenerating(false);
    }
  };

  if (gameFinished) {
    return (
      <ResultScreen
        startedTheme={startedTheme}
        guesses={guesses}
        imagePrompts={imagePrompts}
      />
    );
  }

  if (gameStarted) {
    return (
      <GameScreen
        round={round}
        startedTheme={startedTheme}
        startedStyle={startedStyle}
        imagePrompt={imagePrompts[round - 1] ?? ""}
        guess={guess}
        generatedMessage={generatedMessage}
        isGenerating={isGenerating}
        onGuessChange={setGuess}
        onGenerateImage={handleGenerateImage}
        onNext={handleNext}
      />
    );
  }

  return (
    <StartScreen
      theme={theme}
      selectedStyle={selectedStyle}
      styles={styles}
      onThemeChange={setTheme}
      onStyleChange={setSelectedStyle}
      onStart={handleStart}
    />
  );
}