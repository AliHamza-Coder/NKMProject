"use client"

import React from 'react'

interface AmazingLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  fullScreen?: boolean
  variant?: 'fabric' | 'minimal' | 'dots' | 'wave'
}

export default function AmazingLoader({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false,
  variant = 'fabric'
}: AmazingLoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex items-center justify-center p-8'

  const FabricLoader = () => (
    <div className="relative">
      {/* Fabric weaving animation */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Vertical threads */}
        <div className="absolute inset-0 flex justify-between">
          {[...Array(5)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="w-0.5 bg-gradient-to-b from-gray-800 to-gray-400 animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
        
        {/* Horizontal threads */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(5)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="h-0.5 bg-gradient-to-r from-black to-gray-600 animate-pulse"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1.8s'
              }}
            />
          ))}
        </div>

        {/* Center spinning element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-black rounded-full animate-spin-slow shadow-lg">
            <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Floating fabric pieces */}
      <div className="absolute -inset-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={`fabric-${i}`}
            className="absolute w-2 h-2 bg-gray-300 rounded-sm animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  )

  const MinimalLoader = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 border-2 border-gray-200 rounded-full animate-pulse" />
      <div className="absolute inset-0 border-2 border-black border-t-transparent rounded-full animate-spin" />
      <div className="absolute inset-2 border border-gray-400 border-b-transparent rounded-full animate-spin-reverse" />
    </div>
  )

  const DotsLoader = () => (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 bg-black rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.4s'
          }}
        />
      ))}
    </div>
  )

  const WaveLoader = () => (
    <div className="flex items-end space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-2 bg-gradient-to-t from-black to-gray-600 rounded-t animate-wave"
          style={{
            height: `${20 + Math.sin(i) * 10}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1.2s'
          }}
        />
      ))}
    </div>
  )

  const renderLoader = () => {
    switch (variant) {
      case 'fabric':
        return <FabricLoader />
      case 'minimal':
        return <MinimalLoader />
      case 'dots':
        return <DotsLoader />
      case 'wave':
        return <WaveLoader />
      default:
        return <FabricLoader />
    }
  }

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-4">
        {renderLoader()}
        
        {text && (
          <div className="text-center">
            <p className={`${textSizeClasses[size]} font-medium text-gray-800 animate-pulse`}>
              {text}
            </p>
            <div className="flex justify-center mt-2">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: '1.5s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Universal NKM Loader - Used everywhere in the app
interface NKMLoaderProps {
  fullScreen?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const NKMLoader = ({ fullScreen = false, size = 'lg' }: NKMLoaderProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  }

  const borderClasses = {
    sm: 'border-2',
    md: 'border-3',
    lg: 'border-4', 
    xl: 'border-4'
  }

  const textClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const loaderContent = (
    <div className={`${sizeClasses[size]} ${borderClasses[size]} border-gray-200 rounded-full animate-spin-slow relative`}>
      <div className={`absolute inset-2 border-2 border-black border-t-transparent rounded-full animate-spin`}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`text-black font-bold ${textClasses[size]} tracking-wider`}>NKM</div>
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        {loaderContent}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      {loaderContent}
    </div>
  )
}

// Preset loader components - All use NKM loader now
export const FabricLoader = (props: NKMLoaderProps) => <NKMLoader {...props} />
export const MinimalLoader = (props: NKMLoaderProps) => <NKMLoader {...props} />
export const DotsLoader = (props: NKMLoaderProps) => <NKMLoader {...props} />
export const WaveLoader = (props: NKMLoaderProps) => <NKMLoader {...props} />

// Full screen loaders
export const FullScreenLoader = (props: NKMLoaderProps) => <NKMLoader {...props} fullScreen={true} />
export const PageLoader = () => <NKMLoader fullScreen={true} size="lg" />
export const ProductLoader = () => <NKMLoader fullScreen={true} size="lg" />
export const CategoryLoader = () => <NKMLoader fullScreen={true} size="lg" />