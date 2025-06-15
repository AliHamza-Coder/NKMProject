"use client"

import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-black mb-4 animate-fadeInScale">
            {items[items.length - 1]?.label}
          </h1>
          <nav className="flex items-center justify-center space-x-2 text-sm animate-fadeInScale delay-200">
            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                {index === 0 ? (
                  <a
                    href={item.href || "/"}
                    className="flex items-center text-gray-600 hover:text-black transition-colors duration-300 hover:scale-105 transform"
                  >
                    {item.label === "Home" && <Home className="w-4 h-4 mr-1" />}
                    {item.label}
                  </a>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                    {item.current ? (
                      <span className="text-black font-medium">{item.label}</span>
                    ) : (
                      <a
                        href={item.href}
                        className="text-gray-600 hover:text-black transition-colors duration-300 hover:scale-105 transform"
                      >
                        {item.label}
                      </a>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.8s ease-out;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}