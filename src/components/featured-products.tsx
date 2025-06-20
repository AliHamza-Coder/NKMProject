"use client"

import type React from "react"

import { Heart, ShoppingCart, Eye, RotateCcw } from "lucide-react"
import { products, type Product } from "../data/products"
import Link from "next/link"
import { useShop } from "@/context/ShopContext"

interface FeaturedProductsProps {
  onProductSelect?: (productSlug: string) => void
  onViewAllClick?: () => void
}

export default function FeaturedProducts({ onProductSelect, onViewAllClick }: FeaturedProductsProps) {
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useShop()
  
  // Get first 8 products as featured products
  const featuredProducts = products.slice(0, 8)
  const productCount = featuredProducts.length

  // Dynamic grid classes based on product count
  const getGridClasses = () => {
    if (productCount <= 2) {
      return "grid-cols-2 lg:grid-cols-2" // 2 columns on all screens
    } else if (productCount <= 4) {
      return "grid-cols-2 lg:grid-cols-2" // 2 columns, 2 rows
    } else if (productCount <= 6) {
      return "grid-cols-2 lg:grid-cols-3" // Mobile: 2 cols, Desktop: 3 cols (2 rows)
    } else if (productCount <= 8) {
      return "grid-cols-2 lg:grid-cols-4" // Mobile: 2 cols, Desktop: 4 cols (2 rows)
    } else {
      return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" // Default responsive
    }
  }

  const handleProductClick = (product: Product) => {
    console.log(`Navigate to: /product/${product.slug}`)
    if (onProductSelect) {
      onProductSelect(product.slug)
    }
    // Navigation is now handled by Next.js Link component
  }

  const handleViewAllClick = () => {
    console.log("Navigate to: /category/all-categories")
    if (onViewAllClick) {
      onViewAllClick()
    }
    // Navigation is now handled by Next.js Link component
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    addToCart(product)
  }

  const handleQuickView = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    console.log(`Quick view: ${product.name}`)
    // Quick view modal functionality
  }

  const handleWishlist = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation()
    addToWishlist(product)
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 animate-fadeInScale">Featured Products</h2>
          <p className="text-gray-600 animate-fadeInScale delay-200">
            Discover our handpicked selection of premium fabrics
          </p>
        </div>

        {/* Products Grid - Dynamic Layout */}
        <div className={`grid ${getGridClasses()} gap-4 md:gap-6`}>
          {featuredProducts.map((product, index) => (
            <Link
              href={`/product/${product.slug}`}
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="group cursor-pointer animate-fadeInScale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-3 md:mb-4">
                {/* Main Image */}
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />

                {/* Second Image on Hover */}
                {product.images[1] && (
                  <img
                    src={product.images[1] || "/placeholder.svg"}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  />
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => handleWishlist(e, product)}
                  className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 transform hover:bg-red-50"
                >
                  <Heart 
                    className={`w-3 h-3 md:w-4 md:h-4 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'} hover:text-red-500 transition-colors duration-300`} 
                  />
                </button>

                {/* Action Buttons - Bottom Right */}
                <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 flex flex-col space-y-1 md:space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {/* Add to Cart */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`bg-white hover:bg-black hover:text-white rounded-full p-1.5 md:p-2 shadow-lg transition-all duration-300 hover:scale-110 transform group/btn ${isInCart(product.id) ? 'bg-black text-white' : ''}`}
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 text-gray-600 group-hover/btn:text-white transition-colors duration-300" />
                  </button>

                  {/* Quick View */}
                  <button
                    onClick={(e) => handleQuickView(e, product)}
                    className="bg-white hover:bg-blue-500 hover:text-white rounded-full p-1.5 md:p-2 shadow-lg transition-all duration-300 hover:scale-110 transform group/btn"
                    title="Quick View"
                  >
                    <Eye className="w-3 h-3 md:w-4 md:h-4 text-gray-600 group-hover/btn:text-white transition-colors duration-300" />
                  </button>
                </div>

                {/* Sale Badge (if product has originalPrice) */}
                {product.originalPrice && (
                  <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    SALE
                  </div>
                )}
              </div>

              <div className="space-y-1 md:space-y-2">
                <h3 className="font-medium text-gray-900 group-hover:text-black transition-colors duration-300 group-hover:scale-105 transform text-sm md:text-base line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">{product.brand}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm md:text-lg font-semibold text-black">£{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs md:text-sm text-gray-500 line-through">£{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Color Swatches - Show on hover */}
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {product.colors.slice(0, 3).map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-600">+{product.colors.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-12">
          <Link
            href="/category/all-categories"
            onClick={handleViewAllClick}
            className="inline-block bg-black hover:bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 animate-bounceInScale delay-800"
          >
            View All Products
          </Link>
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
        
        @keyframes bounceInScale {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out;
        }
        
        .animate-bounceInScale {
          animation: bounceInScale 1s ease-out;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-800 {
          animation-delay: 0.8s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}
