type ResultScreenProps = {
  startedTheme: string;
  guesses: string[];
};

export function ResultScreen({ startedTheme, guesses }: ResultScreenProps) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] text-purple-300">
            MEMORA
          </p>

          <h1 className="mb-3 text-4xl font-bold">Result Timeline</h1>

          <p className="mb-6 text-zinc-300">
            最初のイメージが、あなたの解釈を通じてどう変化したかを振り返ります。
          </p>

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

                  <div className="rounded-xl border border-white/10 bg-zinc-950 p-4">
                    <p className="mb-3 text-sm text-purple-300">
                      Round {index + 1}
                    </p>

                    <div className="mb-4 flex h-48 items-center justify-center rounded-xl border border-dashed border-white/20 bg-zinc-900">
                      <p className="text-sm text-zinc-500">
                        Generated image {index + 1} will appear here
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-sm text-zinc-400">
                        {index === guesses.length - 1
                          ? "Final Guess"
                          : `Guess ${index + 1}`}
                      </p>
                      <p className="font-semibold">{item}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4">
                <p className="mb-3 text-sm text-purple-300">
                  Final Transformation
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                      From
                    </p>
                    <p className="font-semibold">{startedTheme}</p>
                  </div>

                  <div className="text-zinc-500">↓</div>

                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                      To
                    </p>
                    <p className="font-semibold">
                      {guesses[guesses.length - 1]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}