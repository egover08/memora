"use client";

import { useState } from "react";

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
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-12">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <p className="mb-3 text-sm font-medium tracking-[0.3em] text-purple-300">
              MEMORA
            </p>

            <h1 className="mb-6 text-4xl font-bold">Result</h1>

            <div className="mb-6 rounded-2xl border border-white/10 bg-zinc-900 p-5">
              <p className="mb-2 text-sm text-zinc-400">Original Theme</p>
              <p className="text-lg font-semibold">{startedTheme}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
              <p className="mb-6 text-sm text-zinc-400">Result Timeline</p>

              <div className="space-y-6">
                <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4">
                  <p className="mb-1 text-sm text-purple-300">Seed Theme</p>
                  <p className="font-semibold">{startedTheme}</p>
                </div>

                {guesses.map((item, index) => (
                  <div key={`${item}-${index}`} className="space-y-4">
                    <div className="flex justify-center text-zinc-500">↓</div>

                    <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-white/20 bg-zinc-950">
                      <p className="text-sm text-zinc-500">
                        Generated image {index + 1} will appear here
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                      <p className="mb-1 text-sm text-purple-300">
                        {index === guesses.length - 1 ? "Final Guess" : `Guess ${index + 1}`}
                      </p>
                      <p className="font-semibold">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  if (gameStarted) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-12">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <p className="mb-3 text-sm font-medium tracking-[0.3em] text-purple-300">
              MEMORA
            </p>

            <h1 className="mb-6 text-4xl font-bold">Round {round} / 3</h1>

            <div className="mb-6 rounded-2xl border border-white/10 bg-zinc-900 p-5">
              <p className="mb-2 text-sm text-zinc-400">Original Theme</p>
              <p className="text-lg font-semibold">{startedTheme}</p>
            </div>

            <div className="mb-6 rounded-2xl border border-white/10 bg-zinc-900 p-5">
              <p className="mb-2 text-sm text-zinc-400">Style</p>
              <p className="text-lg font-semibold">{startedStyle}</p>
            </div>

            <div className="mb-6 flex h-80 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-zinc-900">
              <p className="text-zinc-500">AI image will appear here</p>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-zinc-200">
                このイラストは何に見えますか？
              </label>

              <input
                value={guess}
                onChange={(event) => setGuess(event.target.value)}
                placeholder="例：宇宙飛行士"
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-purple-400"
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!guess.trim()}
              className="w-full rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              {round < 3 ? "Next" : "Show Result"}
            </button>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-12">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] text-purple-300">
            AI IMAGE RELAY GAME
          </p>

          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Memora
          </h1>

          <p className="mb-8 text-zinc-300">
            AIと人間でイメージを伝えて、テーマがどう変化するかを楽しむゲーム。
          </p>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-200">
                お題を入力してください
              </label>

              <input
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
                placeholder="例：宇宙でラーメンを食べる侍"
                className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-purple-400"
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-zinc-200">
                絵のスタイルを選択
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style.id)}
                    className={`rounded-xl border px-4 py-3 text-sm transition ${
                      selectedStyle === style.id
                        ? "border-purple-400 bg-purple-500/20 text-purple-100"
                        : "border-white/10 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleStart}
              disabled={!theme.trim()}
              className="w-full rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              Start
            </button>
          </div>

          {startedTheme && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-900 p-5">
              <p className="mb-2 text-sm text-zinc-400">入力されたお題</p>
              <p className="mb-4 text-lg font-semibold">{startedTheme}</p>

              <p className="mb-2 text-sm text-zinc-400">選択されたスタイル</p>
              <p className="text-lg font-semibold">{startedStyle}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}