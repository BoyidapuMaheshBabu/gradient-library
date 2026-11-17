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
    <section aria-labelledby="css-heading" className="min-w-0">
      <div className="panel-surface rounded-[20px] p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h3 id="css-heading" className="section-title">Your CSS</h3>
            <p className="section-description mt-1">Ready to drop into your project.</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!css}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-40 ${
              copied
                ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
                : error
                  ? 'border border-red-400/35 bg-red-400/10 text-red-300'
                  : 'accent-button'
            }`}
            aria-label={copied ? 'CSS copied to clipboard' : error ? 'Failed to copy CSS' : 'Copy CSS to clipboard'}
          >
            {copied ? 'Copied ✓' : error ? 'Try again' : 'Copy CSS'}
          </button>
        </div>

        <span aria-live="polite" className="sr-only">
          {copied ? 'CSS copied to clipboard' : error ? 'Failed to copy CSS' : ''}
        </span>

        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[var(--surface-code)]">
          <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-3">
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--ink-subtle)]">CSS</span>
          </div>
          <pre className="min-h-[112px] overflow-x-auto p-4 text-xs leading-6 sm:text-[13px]">
            {css ? (
              <code className="whitespace-pre text-[var(--accent)]">{`background: ${css};`}</code>
            ) : (
              <code className="text-[var(--ink-subtle)]">Select a gradient to see its CSS.</code>
            )}
          </pre>
        </div>
      </div>
    </section>
  )
}
