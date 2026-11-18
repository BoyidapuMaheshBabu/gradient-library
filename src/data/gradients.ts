import type { GradientComposition } from './gradient'
import { createColourStop } from './gradient'

/**
 * Subtle film-like grain texture as an inline SVG data URI.
 * Kept small and low-contrast so it never competes with the gradient beneath.
 */
const GRAIN_TEXTURE =
  'data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)" opacity="0.05"/%3E%3C/svg%3E'

function linearLayer(
  id: string,
  angle: number,
  stops: Array<{ color: string; position: number }>,
  blendMode: GradientComposition['layers'][number]['blendMode'],
  opacity: number,
  blur: number,
): GradientComposition['layers'][number] {
  return {
    id,
    definition: {
      type: 'linear',
      angle,
      stops: stops.map((s) => createColourStop(s.color, s.position)),
    },
    blendMode,
    opacity,
    blur,
  }
}

function radialLayer(
  id: string,
  shape: 'circle' | 'ellipse',
  position: string,
  stops: Array<{ color: string; position: number }>,
  blendMode: GradientComposition['layers'][number]['blendMode'],
  opacity: number,
  blur: number,
): GradientComposition['layers'][number] {
  return {
    id,
    definition: {
      type: 'radial',
      shape,
      position,
      stops: stops.map((s) => createColourStop(s.color, s.position)),
    },
    blendMode,
    opacity,
    blur,
  }
}

function conicLayer(
  id: string,
  angle: number,
  position: string,
  stops: Array<{ color: string; position: number }>,
  blendMode: GradientComposition['layers'][number]['blendMode'],
  opacity: number,
  blur: number,
): GradientComposition['layers'][number] {
  return {
    id,
    definition: {
      type: 'conic',
      angle,
      position,
      stops: stops.map((s) => createColourStop(s.color, s.position)),
    },
    blendMode,
    opacity,
    blur,
  }
}

export const gradients: GradientComposition[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // AURA — Ambient light and atmospheric colour transitions
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 'lunar-aura',
    name: 'Lunar Aura',
    style: 'aura',
    dark: true,
    textColor: '#c7e9e7',
    backgroundColor: '#020617',
    description:
      'Deep midnight indigo with soft cyan moonlight bleeding across the frame.',
    layers: [
      radialLayer(
        'lunar-aura-base',
        'ellipse',
        '50% 50%',
        [
          { color: '#1e3a8a', position: 0 },
          { color: '#0f172a', position: 35 },
          { color: 'transparent', position: 90 },
        ],
        'screen',
        0.5,
        70,
      ),
      radialLayer(
        'lunar-aura-cyan',
        'circle',
        '25% 20%',
        [
          { color: '#0891b2', position: 0 },
          { color: '#0ea5e9', position: 30 },
          { color: 'transparent', position: 75 },
        ],
        'screen',
        0.45,
        55,
      ),
      radialLayer(
        'lunar-aura-blue',
        'circle',
        '80% 80%',
        [
          { color: '#1e3a8a', position: 0 },
          { color: '#1d4ed8', position: 25 },
          { color: 'transparent', position: 75 },
        ],
        'screen',
        0.4,
        60,
      ),
      linearLayer(
        'lunar-aura-veil',
        135,
        [
          { color: '#065f46', position: 0 },
          { color: 'transparent', position: 100 },
        ],
        'overlay',
        0.25,
        30,
      ),
    ],
  },
  {
    id: 'twilight-ember',
    name: 'Twilight Ember',
    style: 'aura',
    dark: true,
    textColor: '#fdba74',
    backgroundColor: '#140a0a',
    description:
      'Deep charcoal-burgundy base with warm amber-orange embers glowing upward.',
    layers: [
      radialLayer(
        'twilight-ember-base',
        'ellipse',
        '50% 50%',
        [
          { color: '#7f1d1d', position: 0 },
          { color: '#140a0a', position: 40 },
          { color: 'transparent', position: 95 },
        ],
        'screen',
        0.55,
        70,
      ),
      radialLayer(
        'twilight-ember-copper',
        'circle',
        '80% 30%',
        [
          { color: '#9c4221', position: 0 },
          { color: '#b45309', position: 30 },
          { color: 'transparent', position: 75 },
        ],
        'screen',
        0.5,
        50,
      ),
      radialLayer(
        'twilight-ember-orange',
        'circle',
        '20% 75%',
        [
          { color: '#ea580c', position: 0 },
          { color: '#f97316', position: 25 },
          { color: 'transparent', position: 70 },
        ],
        'screen',
        0.45,
        55,
      ),
      linearLayer(
        'twilight-ember-gold',
        50,
        [
          { color: '#a16207', position: 0 },
          { color: '#d97706', position: 35 },
          { color: 'transparent', position: 100 },
        ],
        'overlay',
        0.35,
        40,
      ),
      radialLayer(
        'twilight-ember-core',
        'circle',
        '60% 40%',
        [
          { color: '#fcd34d', position: 0 },
          { color: '#fbbf24', position: 20 },
          { color: 'transparent', position: 65 },
        ],
        'screen',
        0.4,
        35,
      ),
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MESH — Multiple soft, overlapping colour fields
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 'graphite-mesh',
    name: 'Graphite Mesh',
    style: 'mesh',
    dark: true,
    textColor: '#d4d8dd',
    backgroundColor: '#0d0e10',
    description:
      'Monochrome graphite mesh with cool steel nodes catching faint light.',
    layers: [
      radialLayer(
        'graphite-mesh-1',
        'circle',
        '25% 30%',
        [{ color: '#64748b', position: 0 }, { color: 'transparent', position: 45 }],
        'screen',
        0.6,
        70,
      ),
      radialLayer(
        'graphite-mesh-2',
        'circle',
        '75% 25%',
        [{ color: '#94a3b8', position: 0 }, { color: 'transparent', position: 40 }],
        'screen',
        0.4,
        80,
      ),
      radialLayer(
        'graphite-mesh-3',
        'circle',
        '50% 75%',
        [{ color: '#475569', position: 0 }, { color: 'transparent', position: 50 }],
        'screen',
        0.5,
        90,
      ),
      radialLayer(
        'graphite-mesh-4',
        'circle',
        '85% 70%',
        [{ color: '#cbd5e1', position: 0 }, { color: 'transparent', position: 30 }],
        'screen',
        0.25,
        55,
      ),
    ],
  },
  {
    id: 'saffron-mesh',
    name: 'Saffron Mesh',
    style: 'mesh',
    dark: false,
    textColor: '#000000',
    backgroundColor: '#fffbeb',
    description: 'Sunlit gold and amber fields overlapping on warm cream.',
    layers: [
      radialLayer(
        'saffron-mesh-1',
        'circle',
        '25% 25%',
        [{ color: '#f59e0b', position: 0 }, { color: 'transparent', position: 45 }],
        'normal',
        0.6,
        70,
      ),
      radialLayer(
        'saffron-mesh-2',
        'circle',
        '75% 35%',
        [{ color: '#d97706', position: 0 }, { color: 'transparent', position: 40 }],
        'normal',
        0.5,
        80,
      ),
      radialLayer(
        'saffron-mesh-3',
        'circle',
        '50% 75%',
        [{ color: '#ea580c', position: 0 }, { color: 'transparent', position: 50 }],
        'normal',
        0.4,
        90,
      ),
      radialLayer(
        'saffron-mesh-4',
        'circle',
        '85% 80%',
        [{ color: '#b45309', position: 0 }, { color: 'transparent', position: 35 }],
        'soft-light',
        0.3,
        60,
      ),
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // NEBULA — Deep cosmic backgrounds and concentrated luminous clouds
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 'void-nebula',
    name: 'Void Nebula',
    style: 'nebula',
    dark: true,
    textColor: '#d8b4fe',
    backgroundColor: '#000000',
    description:
      'Pure black void pierced by concentrated violet and magenta luminous clouds.',
    layers: [
      radialLayer(
        'void-nebula-base',
        'ellipse',
        '50% 50%',
        [
          { color: '#7e22ce', position: 0 },
          { color: '#5b21b6', position: 35 },
          { color: 'transparent', position: 90 },
        ],
        'screen',
        0.6,
        75,
      ),
      radialLayer(
        'void-nebula-magenta',
        'circle',
        '80% 25%',
        [
          { color: '#ec4899', position: 0 },
          { color: '#f472b6', position: 25 },
          { color: 'transparent', position: 75 },
        ],
        'screen',
        0.5,
        50,
      ),
      linearLayer(
        'void-nebula-atmosphere',
        200,
        [
          { color: '#312e81', position: 0 },
          { color: '#4338ca', position: 40 },
          { color: 'transparent', position: 100 },
        ],
        'overlay',
        0.3,
        35,
      ),
      radialLayer(
        'void-nebula-core',
        'circle',
        '30% 70%',
        [
          { color: '#a78bfa', position: 0 },
          { color: '#8b5cf6', position: 20 },
          { color: 'transparent', position: 60 },
        ],
        'screen',
        0.4,
        45,
      ),
    ],
  },
  {
    id: 'stellar-cloud',
    name: 'Stellar Cloud',
    style: 'nebula',
    dark: true,
    textColor: '#c8d9e8',
    backgroundColor: '#0b1021',
    description:
      'Deep blue-black foundation with ice-blue and cyan luminous regions.',
    layers: [
      radialLayer(
        'stellar-cloud-base',
        'ellipse',
        '50% 50%',
        [
          { color: '#1e3a8a', position: 0 },
          { color: '#0f172a', position: 35 },
          { color: 'transparent', position: 95 },
        ],
        'screen',
        0.55,
        65,
      ),
      radialLayer(
        'stellar-cloud-cyan',
        'circle',
        '15% 25%',
        [
          { color: '#06b6d4', position: 0 },
          { color: '#22d3ee', position: 30 },
          { color: 'transparent', position: 75 },
        ],
        'screen',
        0.5,
        50,
      ),
      radialLayer(
        'stellar-cloud-violet',
        'circle',
        '85% 75%',
        [
          { color: '#4338ca', position: 0 },
          { color: '#6366f1', position: 25 },
          { color: 'transparent', position: 70 },
        ],
        'screen',
        0.35,
        55,
      ),
      linearLayer(
        'stellar-cloud-ice',
        300,
        [
          { color: '#1e293b', position: 0 },
          { color: '#334155', position: 40 },
          { color: 'transparent', position: 100 },
        ],
        'overlay',
        0.25,
        30,
      ),
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PRISM — Expressive colour refraction and multicolour light
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 'prism-drift',
    name: 'Prism Drift',
    style: 'prism',
    dark: true,
    textColor: '#f5e6ff',
    backgroundColor: '#0f0510',
    description:
      'Violet, pink, blue, and subtle cyan overlapping into an expressive field.',
    layers: [
      radialLayer(
        'prism-drift-base',
        'ellipse',
        '50% 50%',
        [
          { color: '#7e22ce', position: 0 },
          { color: '#1e0030', position: 40 },
          { color: 'transparent', position: 95 },
        ],
        'screen',
        0.6,
        65,
      ),
      radialLayer(
        'prism-drift-pink',
        'circle',
        '85% 20%',
        [
          { color: '#ec4899', position: 0 },
          { color: '#f472b6', position: 25 },
          { color: 'transparent', position: 75 },
        ],
        'screen',
        0.5,
        50,
      ),
      radialLayer(
        'prism-drift-blue',
        'circle',
        '15% 85%',
        [
          { color: '#3b82f6', position: 0 },
          { color: '#60a5fa', position: 25 },
          { color: 'transparent', position: 70 },
        ],
        'screen',
        0.45,
        55,
      ),
      radialLayer(
        'prism-drift-cyan',
        'circle',
        '50% 50%',
        [
          { color: '#22d3ee', position: 0 },
          { color: '#67e8f9', position: 15 },
          { color: 'transparent', position: 60 },
        ],
        'screen',
        0.35,
        40,
      ),
      linearLayer(
        'prism-drift-sweep',
        120,
        [
          { color: '#be185d', position: 0 },
          { color: '#db2777', position: 30 },
          { color: 'transparent', position: 100 },
        ],
        'soft-light',
        0.3,
        35,
      ),
    ],
  },
  {
    id: 'chroma-veil',
    name: 'Chroma Veil',
    style: 'prism',
    dark: false,
    textColor: '#000000',
    backgroundColor: '#f8fafc',
    description: 'Multicolour expressive light refracted across a pale slate veil.',
    layers: [
      radialLayer(
        'chroma-veil-base',
        'ellipse',
        '50% 50%',
        [{ color: '#a78bfa', position: 0 }, { color: 'transparent', position: 70 }],
        'normal',
        0.5,
        70,
      ),
      radialLayer(
        'chroma-veil-pink',
        'circle',
        '85% 20%',
        [{ color: '#f472b6', position: 0 }, { color: 'transparent', position: 75 }],
        'normal',
        0.45,
        55,
      ),
      radialLayer(
        'chroma-veil-blue',
        'circle',
        '15% 85%',
        [{ color: '#60a5fa', position: 0 }, { color: 'transparent', position: 70 }],
        'normal',
        0.4,
        60,
      ),
      radialLayer(
        'chroma-veil-cyan',
        'circle',
        '50% 50%',
        [{ color: '#67e8f9', position: 0 }, { color: 'transparent', position: 60 }],
        'normal',
        0.3,
        45,
      ),
      linearLayer(
        'chroma-veil-magenta',
        120,
        [
          { color: '#db2777', position: 0 },
          { color: 'transparent', position: 100 },
        ],
        'overlay',
        0.25,
        40,
      ),
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LATTICE — Directional light structures, repeated beams and soft geometry
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 'beam-lattice',
    name: 'Beam Lattice',
    style: 'lattice',
    dark: true,
    textColor: '#a5f3fc',
    backgroundColor: '#020617',
    description:
      'Diagonal repeating light beams heavily blurred with a teal base glow.',
    layers: [
      radialLayer(
        'beam-lattice-base',
        'ellipse',
        '50% 50%',
        [
          { color: '#06b6d4', position: 0 },
          { color: '#0f172a', position: 35 },
          { color: 'transparent', position: 90 },
        ],
        'screen',
        0.5,
        70,
      ),
      linearLayer(
        'beam-lattice-beam-1',
        45,
        [
          { color: '#22d3ee', position: 0 },
          { color: 'transparent', position: 100 },
        ],
        'screen',
        0.4,
        60,
      ),
      linearLayer(
        'beam-lattice-beam-2',
        135,
        [
          { color: '#3b82f6', position: 0 },
          { color: 'transparent', position: 100 },
        ],
        'screen',
        0.35,
        55,
      ),
      conicLayer(
        'beam-lattice-points',
        0,
        'center',
        [
          { color: '#67e8f9', position: 0 },
          { color: 'transparent', position: 40 },
          { color: '#67e8f9', position: 60 },
          { color: 'transparent', position: 100 },
        ],
        'screen',
        0.3,
        45,
      ),
    ],
  },
  {
    id: 'grid-aurora',
    name: 'Grid Aurora',
    style: 'lattice',
    dark: false,
    textColor: '#000000',
    backgroundColor: '#fff8e7',
    description:
      'Soft directional beams and grid points on warm amber cream.',
    layers: [
      radialLayer(
        'grid-aurora-base',
        'ellipse',
        '50% 50%',
        [
          { color: '#d97706', position: 0 },
          { color: '#fff8e7', position: 40 },
          { color: 'transparent', position: 90 },
        ],
        'normal',
        0.5,
        70,
      ),
      linearLayer(
        'grid-aurora-beam-1',
        45,
        [
          { color: '#f59e0b', position: 0 },
          { color: 'transparent', position: 100 },
        ],
        'normal',
        0.4,
        60,
      ),
      linearLayer(
        'grid-aurora-beam-2',
        135,
        [
          { color: '#ea580c', position: 0 },
          { color: 'transparent', position: 100 },
        ],
        'normal',
        0.35,
        55,
      ),
      conicLayer(
        'grid-aurora-points',
        0,
        'center',
        [
          { color: '#fbbf24', position: 0 },
          { color: 'transparent', position: 40 },
          { color: '#fbbf24', position: 60 },
          { color: 'transparent', position: 100 },
        ],
        'soft-light',
        0.25,
        45,
      ),
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // GRAIN — Refined atmospheric colour with subtle film-like texture
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 'grain-veil',
    name: 'Grain Veil',
    style: 'grain',
    dark: true,
    textColor: '#a4b5b0',
    backgroundColor: '#050708',
    description:
      'Dark atmospheric sage with a subtle film-like grain texture.',
    layers: [
      radialLayer(
        'grain-veil-base',
        'ellipse',
        '85% 85%',
        [
          { color: '#869891', position: 0 },
          { color: '#506e69', position: 40 },
          { color: 'transparent', position: 70 },
        ],
        'screen',
        0.35,
        50,
      ),
      radialLayer(
        'grain-veil-soft',
        'ellipse',
        '65% 75%',
        [
          { color: '#869891', position: 0 },
          { color: 'transparent', position: 60 },
        ],
        'screen',
        0.15,
        60,
      ),
      linearLayer(
        'grain-veil-smoke',
        155,
        [
          { color: '#457063', position: 0 },
          { color: 'transparent', position: 100 },
        ],
        'screen',
        0.25,
        70,
      ),
      {
        id: 'grain-veil-texture',
        definition: {
          type: 'linear',
          angle: 0,
          stops: [
            { color: '#ffffff', position: 0 },
            { color: '#ffffff', position: 100 },
          ],
        },
        blendMode: 'normal',
        opacity: 1,
        blur: 0,
        texture: GRAIN_TEXTURE,
      },
    ],
  },
  {
    id: 'silver-grain',
    name: 'Silver Grain',
    style: 'grain',
    dark: false,
    textColor: '#000000',
    backgroundColor: '#f5f5f7',
    description:
      'Soft neutral grey with subtle film grain and pale lilac nodes.',
    layers: [
      radialLayer(
        'silver-grain-1',
        'circle',
        '20% 30%',
        [{ color: '#cbd5e1', position: 0 }, { color: 'transparent', position: 50 }],
        'normal',
        0.5,
        70,
      ),
      radialLayer(
        'silver-grain-2',
        'circle',
        '80% 25%',
        [{ color: '#ddd6fe', position: 0 }, { color: 'transparent', position: 45 }],
        'normal',
        0.4,
        80,
      ),
      {
        id: 'silver-grain-texture',
        definition: {
          type: 'linear',
          angle: 25,
          stops: [
            { color: '#94a3b8', position: 0 },
            { color: 'transparent', position: 100 },
          ],
        },
        blendMode: 'normal',
        opacity: 0.3,
        blur: 60,
        texture: GRAIN_TEXTURE,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // GLASS — Translucent colour fields, reflections and soft luminous depth
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 'frost-glass',
    name: 'Frost Glass',
    style: 'glass',
    dark: true,
    textColor: '#c8eceb',
    backgroundColor: '#040808',
    description:
      'Translucent cyan fields bending across deep black with soft reflection.',
    layers: [
      radialLayer(
        'frost-glass-base',
        'ellipse',
        '50% 56%',
        [
          { color: '#1c6765', position: 0 },
          { color: '#124140', position: 38 },
          { color: 'transparent', position: 78 },
        ],
        'screen',
        0.34,
        46,
      ),
      linearLayer(
        'frost-glass-tide',
        172,
        [
          { color: '#358e89', position: 0 },
          { color: 'transparent', position: 100 },
        ],
        'screen',
        0.2,
        42,
      ),
      linearLayer(
        'frost-glass-reflection',
        8,
        [
          { color: '#439993', position: 0 },
          { color: 'transparent', position: 100 },
        ],
        'soft-light',
        0.18,
        32,
      ),
    ],
  },
  {
    id: 'ice-glass',
    name: 'Ice Glass',
    style: 'glass',
    dark: false,
    textColor: '#000000',
    backgroundColor: '#f0f7fa',
    description:
      'Translucent ice fields with cool reflections on pale winter light.',
    layers: [
      radialLayer(
        'ice-glass-base',
        'ellipse',
        '50% 50%',
        [
          { color: '#bfdbfe', position: 0 },
          { color: '#f0f7fa', position: 40 },
          { color: 'transparent', position: 90 },
        ],
        'normal',
        0.5,
        60,
      ),
      linearLayer(
        'ice-glass-frost',
        172,
        [
          { color: '#93c5fd', position: 0 },
          { color: 'transparent', position: 100 },
        ],
        'normal',
        0.4,
        45,
      ),
      linearLayer(
        'ice-glass-reflection',
        8,
        [
          { color: '#60a5fa', position: 0 },
          { color: 'transparent', position: 100 },
        ],
        'soft-light',
        0.25,
        35,
      ),
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FLUX — Dynamic flowing colour fields and unusual spatial compositions
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: 'flux-stream',
    name: 'Flux Stream',
    style: 'flux',
    dark: true,
    textColor: '#f5e6ff',
    backgroundColor: '#0a0014',
    description:
      'Dynamic flowing colour fields in violet, pink, and cyan.',
    layers: [
      linearLayer(
        'flux-stream-violet',
        112,
        [{ color: '#7e22ce', position: 0 }, { color: 'transparent', position: 100 }],
        'screen',
        0.5,
        80,
      ),
      radialLayer(
        'flux-stream-pink',
        'circle',
        '85% 20%',
        [{ color: '#ec4899', position: 0 }, { color: 'transparent', position: 75 }],
        'screen',
        0.45,
        70,
      ),
      linearLayer(
        'flux-stream-cyan',
        25,
        [{ color: '#22d3ee', position: 0 }, { color: 'transparent', position: 100 }],
        'screen',
        0.4,
        60,
      ),
      radialLayer(
        'flux-stream-blue',
        'circle',
        '15% 85%',
        [{ color: '#3b82f6', position: 0 }, { color: 'transparent', position: 70 }],
        'soft-light',
        0.3,
        50,
      ),
    ],
  },
  {
    id: 'meridian-flux',
    name: 'Meridian Flux',
    style: 'flux',
    dark: false,
    textColor: '#000000',
    backgroundColor: '#fff0f5',
    description:
      'Asymmetrical flowing fields of pink, violet, and soft peach.',
    layers: [
      linearLayer(
        'meridian-flux-pink',
        112,
        [{ color: '#f472b6', position: 0 }, { color: 'transparent', position: 100 }],
        'normal',
        0.5,
        70,
      ),
      radialLayer(
        'meridian-flux-violet',
        'circle',
        '85% 20%',
        [{ color: '#c4b5fd', position: 0 }, { color: 'transparent', position: 75 }],
        'normal',
        0.45,
        60,
      ),
      linearLayer(
        'meridian-flux-peach',
        25,
        [{ color: '#fdba74', position: 0 }, { color: 'transparent', position: 100 }],
        'normal',
        0.4,
        55,
      ),
      radialLayer(
        'meridian-flux-soft',
        'circle',
        '15% 85%',
        [{ color: '#e9d5ff', position: 0 }, { color: 'transparent', position: 70 }],
        'soft-light',
        0.3,
        45,
      ),
    ],
  },
]
