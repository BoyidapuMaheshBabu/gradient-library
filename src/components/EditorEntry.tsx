interface EditorEntryProps {
  gradient: {
    id: string
    name: string
    cssVariable: string
    css: string
  } | null
  onBack: () => void
}

export default function EditorEntry({ gradient, onBack }: EditorEntryProps) {
  return (
    <section className="min-w-0">
      <div className="mb-5 flex items-end justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          aria-label="Return to gallery"
        >
          ← <span className="ml-1">Back to gallery</span>
        </button>
      </div>

      {gradient ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gradient preview panel */}
          <section
            className="relative isolate overflow-hidden rounded-[26px] border border-white/15 bg-[var(--surface)] text-white shadow-[0_28px_80px_oklch(0.04_0.01_145/0.34)] lg:min-h-[440px]"
            style={{ background: gradient.cssVariable }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/10"
            />
            <div className="relative z-10 flex w-full flex-col justify-between p-8">
              <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">
                {gradient.name}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/85">
                Opened in the editing workspace. Customization controls coming in the next phase.
              </p>
            </div>
          </section>

          {/* Editor controls placeholder */}
          <section className="panel-surface rounded-[20px] p-6 lg:min-h-[440px] flex flex-col">
            <h3 className="section-title mb-4">Editor workspace</h3>
            <p className="section-description mb-6 flex-1">
              Gradient color controls, direction adjustments, and live preview will be available here in the next phase.
            </p>
            <div className="mt-auto rounded-xl border border-white/[0.08] bg-[var(--surface-code)] p-4">
              <p className="text-xs text-[var(--ink-subtle)] mb-2">Current gradient CSS:</p>
              <pre className="overflow-x-auto p-3 text-xs text-[var(--accent)]">
                <code>{`background: ${gradient.css};`}</code>
              </pre>
            </div>
          </section>
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-lg font-medium text-[var(--ink)]">No gradient selected</h3>
          <p className="mt-2 text-[var(--ink-muted)]">Please select a gradient from the gallery.</p>
        </div>
      )}
    </section>
  )
}
