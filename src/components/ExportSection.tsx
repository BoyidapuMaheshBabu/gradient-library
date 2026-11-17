import { useCallback, useState } from 'react'

interface ExportSectionProps {
  gradientName: string
  color1: string
  color2: string
  angle: number
  css: string | null
}

export default function ExportSection({
  gradientName,
  color1,
  color2,
  angle,
  css,
}: ExportSectionProps) {
  const [cssCopied, setCssCopied] = useState(false)
  const [cssError, setCssError] = useState(false)
  const [promptCopied, setPromptCopied] = useState(false)
  const [promptError, setPromptError] = useState(false)

  const cssDeclaration = css ? `background: ${css};` : null

  const prompt = `Implement the following gradient in my project.

Gradient name: ${gradientName}

First colour: ${color1}
Second colour: ${color2}
Direction: ${angle} degrees

CSS:
${cssDeclaration}

Use these exact colour values and direction. Apply the gradient to the UI element I specify. Preserve the existing layout, functionality, and design system. Do not invent different colours or change the gradient.`

  const handleCopyCss = useCallback(async () => {
    if (!cssDeclaration) return

    setCssCopied(false)
    setCssError(false)

    try {
      await navigator.clipboard.writeText(cssDeclaration)
      setCssCopied(true)
    } catch {
      setCssError(true)
    }

    setTimeout(() => {
      setCssCopied(false)
      setCssError(false)
    }, 2000)
  }, [cssDeclaration])

  const handleCopyPrompt = useCallback(async () => {
    if (!cssDeclaration) return

    setPromptCopied(false)
    setPromptError(false)

    try {
      await navigator.clipboard.writeText(prompt)
      setPromptCopied(true)
    } catch {
      setPromptError(true)
    }

    setTimeout(() => {
      setPromptCopied(false)
      setPromptError(false)
    }, 2000)
  }, [prompt])

  const disabled = !cssDeclaration

  return (
    <section aria-labelledby="export-heading" className="mt-8 min-w-0">
      <div className="panel-surface rounded-[20px] p-6 sm:p-8">
        <div className="mb-6 flex items-end justify-between gap-4 sm:flex-col sm:gap-3">
          <div>
            <h3 id="export-heading" className="section-title">Export gradient</h3>
            <p className="section-description mt-1">
              Copy the CSS or an AI-ready prompt for your edited gradient.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyCss}
              disabled={disabled}
              className={`flex-1 sm:flex-none rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-40 accent-button`}
              aria-label={cssCopied
                ? 'CSS copied to clipboard'
                : cssError
                  ? 'Failed to copy CSS'
                  : 'Copy CSS to clipboard'}
            >
              {cssCopied ? 'CSS copied!' : cssError ? 'Copy failed' : 'Copy CSS'}
            </button>
            <button
              type="button"
              onClick={handleCopyPrompt}
              disabled={disabled}
              className={`flex-1 sm:flex-none rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-40 accent-button`}
              aria-label={promptCopied
                ? 'Prompt copied to clipboard'
                : promptError
                  ? 'Failed to copy prompt'
                  : 'Copy prompt to clipboard'}
            >
              {promptCopied ? 'Prompt copied!' : promptError ? 'Copy failed' : 'Copy Prompt'}
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[var(--surface-code)]">
          <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-4 py-3">
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
              CSS
            </span>
          </div>
          <pre className="min-h-[112px] overflow-x-auto p-4 text-xs leading-6 sm:text-[13px]">
            <code className="whitespace-pre text-[var(--accent)]">
              {cssDeclaration || 'Select a gradient to see its CSS.'}
            </code>
          </pre>
        </div>

        <span aria-live="polite" className="sr-only">
          {cssCopied
            ? 'CSS copied to clipboard'
            : cssError
              ? 'Failed to copy CSS'
              : promptCopied
                ? 'Prompt copied to clipboard'
                : promptError
                  ? 'Failed to copy prompt'
                  : ''}
        </span>
      </div>
    </section>
  )
}
