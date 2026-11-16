interface GradientCardProps {
  gradient: {
    id: string
    name: string
    cssVariable: string
  }
}

export default function GradientCard({ gradient }: GradientCardProps) {
  return (
    <article className="group rounded-2xl overflow-hidden border border-white/10 bg-slate-900 transition-transform duration-300 hover:scale-[1.02]">
      <div
        className="aspect-video bg-gradient-to-br from-transparent to-transparent"
        style={{
          background: gradient.cssVariable,
        }}
      />
      <div className="px-6 py-4">
        <h3 className="text-lg font-medium text-slate-100">{gradient.name}</h3>
      </div>
    </article>
  )
}
