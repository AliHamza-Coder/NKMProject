"use client"

import { useState, useEffect } from 'react'

interface UseLoadingOptions {
  minLoadingTime?: number // Minimum time to show loader (in ms)
  initialLoading?: boolean
}

export function useLoading(options: UseLoadingOptions = {}) {
  const { minLoadingTime = 800, initialLoading = false } = options
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null)

  const startLoading = () => {
    setIsLoading(true)
    setLoadingStartTime(Date.now())
  }

  const stopLoading = async () => {
    if (loadingStartTime) {
      const elapsedTime = Date.now() - loadingStartTime
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime)
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime))
      }
    }
    
    setIsLoading(false)
    setLoadingStartTime(null)
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
    setLoading: setIsLoading
  }
}

// Hook for page transitions
export function usePageLoading() {
  return useLoading({ minLoadingTime: 1000, initialLoading: true })
}

// Hook for quick actions
export function useActionLoading() {
  return useLoading({ minLoadingTime: 500 })
}