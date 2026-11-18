import type { GradientComposition } from '../data/gradient'
import { generateGradientImage } from '../utils/gradient-css'

interface GradientCompositionRendererProps {
  composition: GradientComposition
  className?: string
}

/**
 * Shared gradient renderer.
 *
 * Renders a GradientComposition as one isolated stacking context containing
 * the base background colour plus one positioned element per layer. It is the
 * single rendering path used by both gallery cards and the editor preview.
 *
 * Rendering contract:
 * - The container creates an isolated stacking context (`isolation: isolate`)
 *   so blend modes blend within the composition, never with the page backdrop.
 * - Layers are ordered bottom-to-top matching `composition.layers`; z-index
 *   increases with array index.
 * - Each layer draws its generated gradient image, with its own opacity,
 *   blend mode, and blur.
 * - Layers use `pointer-events: none` so they never intercept clicks.
 * - Blurred layers are slightly oversized so blur has room to extend beyond
 *   the element edges; the container's `overflow-hidden` clips the overflow,
 *   avoiding hard transparent edges at the composition boundary.
 *
 * The consumer is responsible for positioning and sizing the root element
 * (e.g. `absolute inset-0 w-full h-full` inside a positioned ancestor).
 */
export default function GradientCompositionRenderer({
  composition,
  className,
}: GradientCompositionRendererProps) {
  return (
    <div
      className={`relative isolate overflow-hidden ${className ?? ''}`}
      style={{ backgroundColor: composition.backgroundColor }}
    >
      {composition.layers.map((layer, index) => {
        const oversize = layer.blur > 0 ? layer.blur : 0

        return (
          <div
            key={layer.id}
            className="absolute pointer-events-none"
            style={{
              top: -oversize,
              left: -oversize,
              width: `calc(100% + ${oversize * 2}px)`,
              height: `calc(100% + ${oversize * 2}px)`,
              zIndex: index + 1,
              backgroundImage: layer.texture
                ? `${generateGradientImage(layer.definition)}, ${layer.texture}`
                : generateGradientImage(layer.definition),
              opacity: layer.opacity,
              mixBlendMode: layer.blendMode,
              filter: layer.blur > 0 ? `blur(${layer.blur}px)` : 'none',
            }}
          />
        )
      })}
    </div>
  )
}
