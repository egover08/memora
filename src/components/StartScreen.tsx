type StyleOption = {
  id: string;
  label: string;
};

type StartScreenProps = {
  theme: string;
  selectedStyle: string;
  styles: StyleOption[];
  onThemeChange: (value: string) => void;
  onStyleChange: (value: string) => void;
  onStart: () => void;
};

export function StartScreen({
  theme,
  selectedStyle,
  styles,
  onThemeChange,
  onStyleChange,
  onStart,
}: StartScreenProps) {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-12">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-medium tracking-[0.3em] text-purple-300">
            AI IMAGE RELAY GAME
          </p>

          <h1 className="mb-4 text-5xl font-bold tracking-tight">Memora</h1>

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
                onChange={(event) => onThemeChange(event.target.value)}
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
                    onClick={() => onStyleChange(style.id)}
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
              onClick={onStart}
              disabled={!theme.trim()}
              className="w-full rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}