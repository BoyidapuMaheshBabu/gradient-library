interface PreviewProps {
  gradient: {
    id: string
    name: string
    cssVariable: string
  } | null
  onBack: () => void
}

export default function Preview({ gradient, onBack }: PreviewProps) {
  return (
    <section
      aria-label="Gradient preview"
      className="relative isolate flex min-h-[310px] overflow-hidden rounded-[26px] border border-white/15 bg-[var(--surface)] text-white shadow-[0_28px_80px_oklch(0.04_0.01_145/0.34)] sm:min-h-[390px] lg:min-h-[440px]"
      style={{
        background: gradient ? gradient.cssVariable : 'var(--surface)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/10"
      />
      <div className="relative z-10 flex w-full flex-col justify-between p-5 sm:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-white/85 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-[var(--accent)]" />
            LIVE PREVIEW
          </span>
          {gradient && (
            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-white/25 bg-black/20 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Return to gallery"
            >
              ← <span className="ml-1">Gallery</span>
            </button>
          )}
        </div>

        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/75">
            {gradient ? 'Selected gradient' : 'Choose a color direction'}
          </p>
          <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            {gradient ? gradient.name : 'Find your next gradient.'}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
            {gradient
              ? 'A closer look at the colors, ready for your next interface.'
              : 'Select any gradient from the collection to see it in full.'}
          </p>
        </div>
      </div>
    </section>
  )
}
