'use client'

import { useEffect } from 'react'
import { useHoverBlend, type HoverBlendConfig } from './HoverBlendProvider'

/**
 * Drop this into any page to override the hover-blend config for that route.
 * Resets to DEFAULT_CONFIG automatically on unmount (page exit).
 *
 * Example — resume page with dark-palette colors:
 *   <HoverBlendVariant colors={['#D44040', '#F0A848', '#5AAA78', '#7888D0', '#F5C898']} blendMode="screen" />
 */
export default function HoverBlendVariant(overrides: Partial<HoverBlendConfig>) {
  const { setConfig, resetConfig } = useHoverBlend()

  useEffect(() => {
    setConfig(overrides)
    return () => resetConfig()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
