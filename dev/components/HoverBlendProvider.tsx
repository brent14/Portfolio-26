'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface HoverBlendConfig {
  colors: string[]
  blockSize: number
  circleSize: number
  detectionRadius: number
  clusterSize: number
  blockLifetime: number
  emptyRatio: number
  scaleRadius: number
  minScale: number
  blendMode: 'multiply' | 'screen' | 'overlay' | 'normal'
}

export const DEFAULT_CONFIG: HoverBlendConfig = {
  // Matches --color-spot-1 through spot-5 (light palette)
  colors: ['#F2E84A', '#BEDD5A', '#7C7C42', '#4A7A38', '#87C0D8'],
  blockSize: 32,
  circleSize: 21,
  detectionRadius: 50,
  clusterSize: 7,
  blockLifetime: 2000,
  emptyRatio: 0.2,
  scaleRadius: 250,
  minScale: 0.3,
  blendMode: 'multiply',
}

interface HoverBlendContextValue {
  config: HoverBlendConfig
  setConfig: (overrides: Partial<HoverBlendConfig>) => void
  resetConfig: () => void
}

const HoverBlendContext = createContext<HoverBlendContextValue>({
  config: DEFAULT_CONFIG,
  setConfig: () => {},
  resetConfig: () => {},
})

export function HoverBlendProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<HoverBlendConfig>(DEFAULT_CONFIG)

  const setConfig = useCallback((overrides: Partial<HoverBlendConfig>) => {
    setConfigState(prev => ({ ...prev, ...overrides }))
  }, [])

  const resetConfig = useCallback(() => {
    setConfigState(DEFAULT_CONFIG)
  }, [])

  return (
    <HoverBlendContext.Provider value={{ config, setConfig, resetConfig }}>
      {children}
    </HoverBlendContext.Provider>
  )
}

export function useHoverBlend() {
  return useContext(HoverBlendContext)
}
