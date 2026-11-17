export interface Gradient {
  id: string
  name: string
  angle: number
  colors: [string, string]
}

export function generateGradientCss(gradient: Gradient): string {
  return `linear-gradient(${gradient.angle}deg, ${gradient.colors[0]} 0%, ${gradient.colors[1]} 100%)`
}

export const gradients: Gradient[] = [
  {
    id: 'sage-mist',
    name: 'Sage Mist',
    angle: 135,
    colors: ['#C7CEBE', '#8AA394'],
  },
  {
    id: 'forest-glow',
    name: 'Forest Glow',
    angle: 135,
    colors: ['#1B4332', '#2D6A4F'],
  },
  {
    id: 'warm-clay',
    name: 'Warm Clay',
    angle: 135,
    colors: ['#E07A5F', '#8B4513'],
  },
  {
    id: 'coastal-slate',
    name: 'Coastal Slate',
    angle: 135,
    colors: ['#7F8C8D', '#2C3E50'],
  },
]
