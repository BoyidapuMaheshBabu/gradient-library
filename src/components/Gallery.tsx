import GradientCard from './GradientCard'
import { gradients } from '../data/gradients'

interface GalleryProps {
  selectedGradientId: string | null
  onSelect: (gradientId: string) => void
}

export default function Gallery({ selectedGradientId, onSelect }: GalleryProps) {
  return (
    <section aria-labelledby="gallery-heading" className="min-w-0">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h3 id="gallery-heading" className="section-title">Explore the collection</h3>
          <p className="section-description mt-1">Choose a gradient to preview and copy.</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] font-medium tabular-nums text-[var(--ink-muted)]">
          {String(gradients.length).padStart(2, '0')} gradients
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {gradients.map((gradient) => (
          <GradientCard
            key={gradient.id}
            gradient={gradient}
            isSelected={selectedGradientId === gradient.id}
            onSelect={() => onSelect(gradient.id)}
          />
        ))}
      </div>
    </section>
  )
}
