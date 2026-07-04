type GameScreenProps = {
  round: number;
  startedTheme: string;
  startedStyle: string;
  imagePrompt: string;
  guess: string;
  onGuessChange: (value: string) => void;
  onNext: () => void;
};

export function GameScreen({
  round,
  startedTheme,
  startedStyle,
  imagePrompt,
  guess,
  onGuessChange,
  onNext,
}: GameScreenProps) {
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

          <div className="mb-6 rounded-2xl border border-white/10 bg-zinc-900 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Generated Image</p>
                <p className="text-xs text-zinc-500">Round {round}</p>
              </div>

              <div className="rounded-full border border-white/10 bg-zinc-950 px-3 py-1 text-xs text-zinc-400">
                Style: {startedStyle}
              </div>
            </div>

            <div className="flex h-72 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-800 via-zinc-950 to-purple-950 p-6">
              <div className="text-center">
                <p className="mb-2 text-lg font-semibold text-zinc-200">
                  Image Preview
                </p>
                <p className="text-sm text-zinc-500">
                  AI-generated image will appear here
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950 p-4">
              <p className="mb-1 text-sm text-zinc-400">Generated from</p>
              <p className="font-semibold">{imagePrompt}</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-zinc-200">
              このイラストは何に見えますか？
            </label>

            <input
              value={guess}
              onChange={(event) => onGuessChange(event.target.value)}
              placeholder="例：宇宙飛行士"
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-purple-400"
            />
          </div>

          <button
            type="button"
            onClick={onNext}
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