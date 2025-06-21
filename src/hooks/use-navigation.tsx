"use client"

import { useRouter } from 'next/navigation'
import { useNavigation } from '@/context/NavigationContext'

export function useNavigationWithLoader() {
  const router = useRouter()
  const { startNavigation } = useNavigation()

  const navigateTo = (path: string) => {
    startNavigation()
    router.push(path)
  }

  const navigateBack = () => {
    startNavigation()
    router.back()
  }

  const navigateReplace = (path: string) => {
    startNavigation()
    router.replace(path)
  }

  return {
    navigateTo,
    navigateBack,
    navigateReplace,
    router // Original router for other methods
  }
}