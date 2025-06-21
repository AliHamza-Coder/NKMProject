"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { NKMLoader } from '@/components/amazing-loader'

interface NavigationContextType {
  isNavigating: boolean
  startNavigation: () => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false)
  const [navigationStartTime, setNavigationStartTime] = useState<number | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Start navigation loading
  const startNavigation = () => {
    setNavigationStartTime(Date.now())
    setIsNavigating(true)
  }

  // Hide loader when route actually changes (navigation complete)
  useEffect(() => {
    if (navigationStartTime) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsNavigating(false)
        setNavigationStartTime(null)
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [pathname, navigationStartTime])

  // Auto-hide loader after maximum time to prevent stuck loader
  useEffect(() => {
    if (isNavigating && navigationStartTime) {
      const timeout = setTimeout(() => {
        setIsNavigating(false)
        setNavigationStartTime(null)
      }, 10000) // 10 seconds max

      return () => clearTimeout(timeout)
    }
  }, [isNavigating, navigationStartTime])

  return (
    <NavigationContext.Provider value={{ isNavigating, startNavigation }}>
      {children}
      {/* Global Navigation Loader */}
      {isNavigating && (
        <NKMLoader fullScreen={true} size="lg" />
      )}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}