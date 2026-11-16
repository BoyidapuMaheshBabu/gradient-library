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
      className={`relative min-h-[400px] rounded-3xl overflow-hidden border border-white/10 transition-colors duration-300 flex items-center justify-center text-slate-100 ${
        gradient ? `bg-gradient-to-br` : 'bg-slate-900'
      }`}
      style={{
        background: gradient ? gradient.cssVariable : undefined,
      }}
    >
      {gradient && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Return to gallery"
        >
          <span className="text-sm">← Back to gallery</span>
        </button>
      )}

      {gradient ? (
        <div className="z-10 px-8 py-10 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-2">
            {gradient.name}
          </h2>
          <p className="text-sm text-slate-300 tracking-widest uppercase">
            Selected gradient preview
          </p>
        </div>
      ) : (
        <div className="z-10 px-8 py-10 text-center">
          <h2 className="text-2xl md:text-3xl font-medium text-slate-400">
            Select a gradient to preview
          </h2>
        </div>
      )}
    </section>
  )
}
