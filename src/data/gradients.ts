export interface Gradient {
  id: string
  name: string
  cssVariable: string
  css: string
}

export const gradients: Gradient[] = [
  {
    id: 'aurora-dusk',
    name: 'Aurora Dusk',
    cssVariable: 'var(--gradient-1)',
    css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'graphite-neon',
    name: 'Graphite Neon',
    cssVariable: 'var(--gradient-2)',
    css: 'linear-gradient(135deg, #2d2d2d 0%, #39ff14 100%)',
  },
  {
    id: 'sienna-glow',
    name: 'Sienna Glow',
    cssVariable: 'var(--gradient-3)',
    css: 'linear-gradient(135deg, #8b4513 0%, #d2691e 100%)',
  },
  {
    id: 'deep-forest',
    name: 'Deep Forest',
    cssVariable: 'var(--gradient-4)',
    css: 'linear-gradient(135deg, #0f4c32 0%, #1a8a58 100%)',
  },
  {
    id: 'midnight-amber',
    name: 'Midnight Amber',
    cssVariable: 'var(--gradient-5)',
    css: 'linear-gradient(135deg, #0a0a23 0%, #f5a623 100%)',
  },
]
