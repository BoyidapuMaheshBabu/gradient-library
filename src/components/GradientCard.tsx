import GradientCompositionRenderer from './GradientCompositionRenderer'
import type { GradientComposition } from '../data/gradient'

interface GradientCardProps {
  gradient: GradientComposition
  isSelected: boolean
  onSelect: () => void
}

export default function GradientCard({ gradient, isSelected, onSelect }: GradientCardProps) {
  return (
    <button
      type="button"
      className={`group w-full overflow-hidden rounded-[18px] border bg-[var(--surface)] text-left transition duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_14px_34px_oklch(0.04_0.01_145/0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] ${
        isSelected
          ? 'border-[var(--accent)]/75 ring-1 ring-[var(--accent)]/35'
          : 'border-white/10'
      }`}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <span className="block aspect-[16/10] overflow-hidden relative">
        <GradientCompositionRenderer
          composition={gradient}
          className="w-full h-full"
        />
      </span>
      <span className="flex min-h-[62px] items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
        <span className="text-sm font-medium tracking-[-0.015em] text-[var(--ink)]">
          {gradient.name}
        </span>
        {isSelected ? (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
            <span className="size-1.5 rounded-full bg-[var(--accent)]" />
            Selected
          </span>
        ) : (
          <span className="text-xs text-[var(--ink-subtle)] transition-colors group-hover:text-[var(--ink-muted)]">
            Preview →
          </span>
        )}
      </span>
    </button>
  )
}