import type {
  ColourStop,
  GradientComposition,
  GradientDefinition,
} from '../data/gradient'

/**
 * Formats a single colour stop into a CSS colour-stop string, e.g.
 * `#C7CEBE 0%`. Positions are percentages (0 to 100).
 */
function formatStop(stop: ColourStop): string {
  return `${stop.color} ${stop.position}%`
}

/**
 * Generates the CSS gradient image value for a single gradient definition.
 * Supports linear, radial, and conic gradients with any number of colour stops.
 * No CSS strings are parsed here — this only generates from structured data.
 */
export function generateGradientImage(definition: GradientDefinition): string {
  const stops = definition.stops.map(formatStop).join(', ')

  if (definition.type === 'linear') {
    return `linear-gradient(${definition.angle}deg, ${stops})`
  }

  if (definition.type === 'radial') {
    return `radial-gradient(${definition.shape} at ${definition.position}, ${stops})`
  }

  return `conic-gradient(from ${definition.angle}deg at ${definition.position}, ${stops})`
}

/**
 * Returns the gradient image value for a simple, single-layer linear
 * composition (the only shape the current editor and export support).
 * Returns null for layered or otherwise non-simple compositions, because
 * plain CSS cannot express per-layer blend mode, opacity, or blur.
 */
export function generateSimpleCss(composition: GradientComposition): string | null {
  if (composition.layers.length !== 1) return null
  const layer = composition.layers[0]
  if (layer.definition.type !== 'linear') return null
  if (layer.blendMode !== 'normal' || layer.opacity !== 1 || layer.blur !== 0) return null
  return generateGradientImage(layer.definition)
}
