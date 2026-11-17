import { useCallback, useEffect, useMemo, useState } from 'react'
import { generateGradientCss, type Gradient } from '../data/gradients'

interface EditorEntryProps {
  gradient: Gradient | null
  onBack: () => void
}

const HEX_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/

export default function EditorEntry({ gradient, onBack }: EditorEntryProps) {
  const [color1, setColor1] = useState<string>('')
  const [color2, setColor2] = useState<string>('')
  const [angle, setAngle] = useState<number>(0)

  const [color1Input, setColor1Input] = useState<string>('')
  const [color2Input, setColor2Input] = useState<string>('')
  const [angleInput, setAngleInput] = useState<string>('')

  const [color1Invalid, setColor1Invalid] = useState(false)
  const [color2Invalid, setColor2Invalid] = useState(false)
  const [angleInvalid, setAngleInvalid] = useState(false)

  const original = useMemo(
    () => (gradient ? { color1: gradient.colors[0], color2: gradient.colors[1], angle: gradient.angle } : null),
    [gradient]
  )

  useEffect(() => {
    if (!gradient || !original) return

    setColor1(gradient.colors[0])
    setColor2(gradient.colors[1])
    setAngle(gradient.angle)
    setColor1Input(gradient.colors[0])
    setColor2Input(gradient.colors[1])
    setAngleInput(String(gradient.angle))
    setColor1Invalid(false)
    setColor2Invalid(false)
    setAngleInvalid(false)
  }, [gradient, original])

  const handleColor1Change = useCallback(
    (value: string) => {
      setColor1Input(value)
      setColor1Invalid(false)
      if (HEX_REGEX.test(value)) {
        setColor1(value)
      }
    },
    []
  )

  const handleColor2Change = useCallback(
    (value: string) => {
      setColor2Input(value)
      setColor2Invalid(false)
      if (HEX_REGEX.test(value)) {
        setColor2(value)
      }
    },
    []
  )

  const handleAngleChange = useCallback(
    (value: string) => {
      setAngleInput(value)
      setAngleInvalid(false)
      const num = Number(value)
      if (!Number.isNaN(num) && num >= 0 && num <= 360) {
        setAngle(num)
      }
    },
    []
  )

  const handleReset = useCallback(() => {
    if (!original) return

    setColor1(original.color1)
    setColor2(original.color2)
    setAngle(original.angle)
    setColor1Input(original.color1)
    setColor2Input(original.color2)
    setAngleInput(String(original.angle))
    setColor1Invalid(false)
    setColor2Invalid(false)
    setAngleInvalid(false)
  }, [original])

  const editedCss = useMemo(
    () => generateGradientCss({ ...gradient!, colors: [color1, color2], angle }),
    [gradient, color1, color2, angle]
  )

  if (!gradient) {
    return (
      <section className="min-w-0">
        <div className="text-center py-20">
          <h3 className="text-lg font-medium text-[var(--ink)]">No gradient selected</h3>
          <p className="mt-2 text-[var(--ink-muted)]">Please select a gradient from the gallery.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-w-0">
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="section-title">{gradient.name}</h2>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          aria-label="Return to gallery"
        >
          ← <span className="ml-1">Back to gallery</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gradient preview panel */}
        <section
          className="relative isolate overflow-hidden rounded-[26px] border border-white/15 bg-[var(--surface)] text-white shadow-[0_28px_80px_oklch(0.04_0.01_145/0.34)] lg:min-h-[440px]"
          style={{ background: editedCss }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/10"
          />
          <div className="relative z-10 flex w-full flex-col justify-between p-8">
            <div className="flex items-start justify-end">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/[0.09] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                Editing
              </span>
            </div>
            <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl">
              {gradient.name}
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/85">
              Customize colors and direction. Changes update the preview immediately.
            </p>
          </div>
        </section>

        {/* Editor controls panel */}
        <section className="panel-surface rounded-[20px] p-6 lg:min-h-[440px] flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <h3 className="section-title mb-6">Editor controls</h3>

            {/* First color */}
            <div className="mb-6">
              <label className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[var(--ink)]">First color</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
                  Color 1
                </span>
              </label>
              <div className="flex items-end gap-3">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => handleColor1Change(e.target.value)}
                  className="h-10 w-12 rounded-lg border-0 bg-transparent cursor-pointer"
                  aria-label="First color picker"
                />
                <input
                  type="text"
                  value={color1Input}
                  onChange={(e) => handleColor1Change(e.target.value)}
                  className="flex-1 rounded-lg border border-white/10 bg-[var(--surface-code)] px-3 py-2 text-sm text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-40"
                  placeholder="#C7CEBE"
                  maxLength={7}
                  aria-invalid={color1Invalid}
                  aria-label="First color HEX value"
                />
                {color1Invalid && (
                  <span className="text-[10px] font-medium text-[var(--danger)]">Invalid HEX</span>
                )}
              </div>
            </div>

            {/* Second color */}
            <div className="mb-6">
              <label className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[var(--ink)]">Second color</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
                  Color 2
                </span>
              </label>
              <div className="flex items-end gap-3">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => handleColor2Change(e.target.value)}
                  className="h-10 w-12 rounded-lg border-0 bg-transparent cursor-pointer"
                  aria-label="Second color picker"
                />
                <input
                  type="text"
                  value={color2Input}
                  onChange={(e) => handleColor2Change(e.target.value)}
                  className="flex-1 rounded-lg border border-white/10 bg-[var(--surface-code)] px-3 py-2 text-sm text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-40"
                  placeholder="#8AA394"
                  maxLength={7}
                  aria-invalid={color2Invalid}
                  aria-label="Second color HEX value"
                />
                {color2Invalid && (
                  <span className="text-[10px] font-medium text-[var(--danger)]">Invalid HEX</span>
                )}
              </div>
            </div>

            {/* Gradient direction */}
            <div className="mb-6">
              <label className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[var(--ink)]">Gradient direction</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
                  Angle
                </span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={angle}
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    setAngle(val)
                    setAngleInput(String(val))
                    setAngleInvalid(false)
                  }}
                  className="flex-1 accent-[var(--accent)] h-2 w-full rounded-lg bg-white/10 appearance-none cursor-pointer"
                  aria-label="Gradient direction angle"
                />
                <div className="flex items-end gap-3">
                  <input
                    type="text"
                    value={angleInput}
                    onChange={(e) => handleAngleChange(e.target.value)}
                    className="rounded-lg border border-white/10 bg-[var(--surface-code)] px-3 py-2 text-sm text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-40 w-[80px]"
                    placeholder="135"
                    maxLength={3}
                    aria-invalid={angleInvalid}
                    aria-label="Gradient direction value"
                  />
                  <span className="text-[10px] font-medium text-[var(--ink-muted)]">deg</span>
                  {angleInvalid && (
                    <span className="text-[10px] font-medium text-[var(--danger)]">Invalid angle</span>
                  )}
                </div>
              </div>
            </div>

            {/* Reset */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-transparent px-4 py-2 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:bg-white/5 hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                aria-label="Reset to original gradient values"
              >
                <span>↻</span> Reset to original
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}