/**
 * Gradient Library — Layered gradient data model (Phase 05).
 *
 * Internal units (documented so every component interprets values the same way):
 * - opacity: 0 to 1
 * - blur: 0 to 100 pixels
 * - colour stop position: 0 to 100 (percent)
 * - linear/conic angle: 0 to 360 (degrees)
 * - radial/conic position: CSS position string, e.g. 'center', '50% 50%', 'top left'
 * - texture: optional CSS image value (e.g. SVG data URI) composited on top of the layer gradient
 *
 * Stacking convention:
 * - `layers` is ordered bottom-to-top: layers[0] is the bottom-most layer and
 *   layers[layers.length - 1] is the top-most layer.
 * - Renderers assign increasing z-index with array index so the visual stack
 *   always matches the data order. No redundant ordering properties are used.
 */

export type Color = string

export interface ColourStop {
  /** Colour value (HEX, rgb, oklch, or any valid CSS colour). */
  color: Color
  /** Stop position as a percentage, 0 to 100. */
  position: number
}

export interface LinearGradientDefinition {
  type: 'linear'
  /** Gradient angle in degrees, 0 to 360. */
  angle: number
  /** Colour stops. At least two stops are required. */
  stops: ColourStop[]
}

export interface RadialGradientDefinition {
  type: 'radial'
  /** Radial gradient shape. */
  shape: 'circle' | 'ellipse'
  /** CSS position, e.g. 'center', '50% 50%', 'top left'. */
  position: string
  /** Colour stops. At least two stops are required. */
  stops: ColourStop[]
}

export interface ConicGradientDefinition {
  type: 'conic'
  /** Starting angle in degrees, 0 to 360. */
  angle: number
  /** CSS position of the conic center, e.g. 'center', '50% 50%'. */
  position: string
  /** Colour stops. At least two stops are required. */
  stops: ColourStop[]
}

export type GradientDefinition =
  | LinearGradientDefinition
  | RadialGradientDefinition
  | ConicGradientDefinition

export type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'soft-light'
  | 'hard-light'
  | 'color-dodge'
  | 'color-burn'
  | 'darken'
  | 'lighten'
  | 'difference'
  | 'exclusion'

export const BLEND_MODES: BlendMode[] = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'soft-light',
  'hard-light',
  'color-dodge',
  'color-burn',
  'darken',
  'lighten',
  'difference',
  'exclusion',
]

export interface Layer {
  id: string
  definition: GradientDefinition
  blendMode: BlendMode
  /** Layer opacity, 0 to 1. */
  opacity: number
  /** Layer blur in pixels, 0 to 100. */
  blur: number
  /**
   * Optional CSS image value composited on top of the layer's gradient.
   * Used for subtle grain/noise textures. Keep values small (inline data URIs).
   */
  texture?: string
}

export interface GradientComposition {
  id: string
  name: string
  /** Visual family/style: 'aura' | 'mesh' | 'nebula' | 'prism' | 'lattice' | 'grain' | 'glass' | 'flux'. */
  style: string
  /** Base/background colour shown beneath all layers. */
  backgroundColor: Color
  /** Layers ordered bottom-to-top. */
  layers: Layer[]
  /** Whether the composition is dark overall (used for text contrast hints). */
  dark: boolean
  /** Suggested text colour for UI overlaid on this composition. */
  textColor?: string
  description?: string
}

export function isValidColourStop(stop: ColourStop): boolean {
  return (
    typeof stop.color === 'string' &&
    stop.color.length > 0 &&
    typeof stop.position === 'number' &&
    Number.isFinite(stop.position) &&
    stop.position >= 0 &&
    stop.position <= 100
  )
}

export function isValidBlendMode(value: string): value is BlendMode {
  return BLEND_MODES.includes(value as BlendMode)
}

export function isValidGradientDefinition(def: GradientDefinition): boolean {
  if (!def || !Array.isArray(def.stops) || def.stops.length < 2) return false
  if (!def.stops.every(isValidColourStop)) return false

  switch (def.type) {
    case 'linear':
      return (
        typeof def.angle === 'number' &&
        Number.isFinite(def.angle) &&
        def.angle >= 0 &&
        def.angle <= 360
      )
    case 'radial':
      return (
        (def.shape === 'circle' || def.shape === 'ellipse') &&
        typeof def.position === 'string' &&
        def.position.length > 0
      )
    case 'conic':
      return (
        typeof def.angle === 'number' &&
        Number.isFinite(def.angle) &&
        def.angle >= 0 &&
        def.angle <= 360 &&
        typeof def.position === 'string' &&
        def.position.length > 0
      )
    default:
      return false
  }
}

export function isValidLayer(layer: Layer): boolean {
  return (
    typeof layer.id === 'string' &&
    layer.id.length > 0 &&
    isValidGradientDefinition(layer.definition) &&
    isValidBlendMode(layer.blendMode) &&
    typeof layer.opacity === 'number' &&
    Number.isFinite(layer.opacity) &&
    layer.opacity >= 0 &&
    layer.opacity <= 1 &&
    typeof layer.blur === 'number' &&
    Number.isFinite(layer.blur) &&
    layer.blur >= 0 &&
    layer.blur <= 100
  )
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validateComposition(composition: GradientComposition): ValidationResult {
  const errors: string[] = []

  if (!composition.id || composition.id.length === 0) {
    errors.push('Composition id is required.')
  }
  if (!composition.name || composition.name.length === 0) {
    errors.push('Composition name is required.')
  }
  if (!composition.style || composition.style.length === 0) {
    errors.push('Composition style is required.')
  }
  if (typeof composition.backgroundColor !== 'string' || composition.backgroundColor.length === 0) {
    errors.push('Background colour is required.')
  }
  if (!Array.isArray(composition.layers) || composition.layers.length === 0) {
    errors.push('Composition must contain at least one layer.')
  } else {
    const ids = new Set<string>()
    for (const layer of composition.layers) {
      if (!isValidLayer(layer)) {
        errors.push(`Layer "${layer.id ?? '(unknown)'}" is invalid.`)
        continue
      }
      if (ids.has(layer.id)) {
        errors.push(`Duplicate layer id: ${layer.id}`)
      }
      ids.add(layer.id)
    }
  }

  return { valid: errors.length === 0, errors }
}

/**
 * True when the composition is a single editable linear layer: exactly one
 * linear layer, normal blend, full opacity, no blur, two colour stops. Only
 * these compositions are supported by the current two-colour editor and export.
 */
export function isSimpleComposition(composition: GradientComposition): boolean {
  if (composition.layers.length !== 1) return false
  const layer = composition.layers[0]
  if (layer.definition.type !== 'linear') return false
  if (layer.blendMode !== 'normal' || layer.opacity !== 1 || layer.blur !== 0) return false
  return layer.definition.stops.length === 2
}

export function createColourStop(color: Color, position: number): ColourStop {
  return { color, position }
}
