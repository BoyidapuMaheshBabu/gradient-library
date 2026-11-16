interface GradientCardProps {
  gradient: {
    id: string
    name: string
    cssVariable: string
  }
  isSelected: boolean
  onSelect: () => void
}

export default function GradientCard({ gradient, isSelected, onSelect }: GradientCardProps) {
  return (
    <button
      className={`rounded-2xl overflow-hidden border border-white/10 bg-slate-900 transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
        isSelected ? 'ring-2 ring-amber-400 border-amber-400' : 'hover:border-white/20'
      }`}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <div
        className="aspect-video bg-gradient-to-br from-transparent to-transparent"
        style={{
          background: gradient.cssVariable,
        }}
      />
      <div className="px-6 py-4">
        <h3 className="text-lg font-medium text-slate-100">{gradient.name}</h3>
      </div>
    </button>
  )
}
