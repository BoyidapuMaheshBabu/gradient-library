import React from 'react'

interface CssCodeProps {
  css: string | null
}

export default function CssCode({ css }: CssCodeProps) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    if (!css) return

    try {
      await navigator.clipboard.writeText(`background: ${css};`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="bg-slate-900 rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-300 uppercase tracking-wider">
            CSS
          </h3>
          <button
            onClick={handleCopy}
            disabled={!css}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              copied
                ? 'bg-amber-500 text-white'
                : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'
            }`}
            aria-label={copied ? 'CSS copied to clipboard' : 'Copy CSS to clipboard'}
          >
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>

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
