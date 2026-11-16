import GradientCard from './GradientCard'
import { gradients } from '../data/gradients'

interface GalleryProps {
  selectedGradientId: string | null
  onSelect: (gradientId: string) => void
}

export default function Gallery({ selectedGradientId, onSelect }: GalleryProps) {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
