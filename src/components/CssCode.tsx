import React from 'react'

interface CssCodeProps {
  css: string | null
}

export default function CssCode({ css }: CssCodeProps) {
  const [copied, setCopied] = React.useState(false)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    setCopied(false)
    setError(false)
  }, [css])

  async function handleCopy() {
    if (!css) return

    setCopied(false)
    setError(false)

    try {
      await navigator.clipboard.writeText(`background: ${css};`)
      setCopied(true)
    } catch {
      setError(true)
    }

    setTimeout(() => {
      setCopied(false)
      setError(false)
    }, 2000)
  }

  return (
    <section>
      <div className="bg-slate-900 rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
            CSS
          </h3>
          <button
            onClick={handleCopy}
            disabled={!css}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              copied
                ? 'bg-amber-500 text-white'
                : error
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                  : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
            }`}
            aria-label={copied ? 'CSS copied to clipboard' : error ? 'Failed to copy CSS' : 'Copy CSS to clipboard'}
          >
            {copied ? 'Copied!' : error ? 'Failed' : 'Copy CSS'}
          </button>
        </div>

        <span
          aria-live="polite"
          className="sr-only"
        >
          {copied ? 'CSS copied to clipboard' : error ? 'Failed to copy CSS' : ''}
        </span>

        {!css ? (
          <p className="text-slate-500 text-sm italic">
            Select a gradient to see its CSS
          </p>
        ) : (
          <pre className="bg-slate-950 rounded-lg border border-white/5 p-4 overflow-x-auto text-xs md:text-sm">
            <code className="text-amber-400">{`background: ${css};`}</code>
          </pre>
        )}
      </div>
    </section>
  )
}
