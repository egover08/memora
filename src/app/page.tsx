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
  const [gameFinished, setGameFinished] = useState(false);

  const handleStart = () => {
    setStartedTheme(theme);
    setStartedStyle(selectedStyle);
    setGameStarted(true);
  };

  const handleNext = () => {
    if (!guess.trim()) return;

    setGuesses([...guesses, guess]);

    if (round < 3) {
      setRound(round + 1);
      setGuess("");
    } else {
      setGameFinished(true);
    }
  };

  if (gameFinished) {
    return <ResultScreen startedTheme={startedTheme} guesses={guesses} />;
  }

  if (gameStarted) {
    return (
      <GameScreen
        round={round}
        startedTheme={startedTheme}
        startedStyle={startedStyle}
        guess={guess}
        onGuessChange={setGuess}
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