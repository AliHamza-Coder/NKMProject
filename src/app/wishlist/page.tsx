"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Trash2, ArrowRight, List, LayoutGrid, ChevronLeft } from "lucide-react"
import { initialWishlistItems, type WishlistItem } from "@/data/wishlist-data"
import Breadcrumb from "@/components/breadcrumb"
import Link from "next/link"

interface WishlistPageProps {
  onGoBack?: () => void
  onProductSelect?: (productSlug: string) => void
}

export default function WishlistPage({ onGoBack, onProductSelect }: WishlistPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3)
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlistItems)

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "My Wishlist", current: true },
  ]

  const removeItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const addToCart = (item: WishlistItem) => {
    console.log(`Add to cart: ${item.name}`)
    // Add to cart functionality
  }

  const moveToCart = (item: WishlistItem) => {
    addToCart(item)
    removeItem(item.id)
  }

  const moveAllToCart = () => {
    const inStockItems = wishlistItems.filter((item) => item.inStock)
    inStockItems.forEach((item) => addToCart(item))
    setWishlistItems((items) => items.filter((item) => !item.inStock))
  }

  const handleProductClick = (item: WishlistItem) => {
    console.log(`Navigate to: /product/${item.slug}`)
    if (onProductSelect) {
      onProductSelect(item.slug)
    }
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb items={breadcrumbItems} />

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Back to shopping link */}
          <Link
            href="/category/all-categories"
            className="flex items-center text-gray-600 hover:text-black transition-all duration-300 hover:scale-105 transform group mb-8"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to shopping</span>
          </Link>

          {/* Empty Wishlist */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fadeInScale">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save your favorite items to your wishlist and shop them later.</p>
            <Link
              href="/category/all-categories"
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform hover:shadow-lg inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const inStockCount = wishlistItems.filter((item) => item.inStock).length

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back to shopping link */}
        <Link
          href="/category/all-categories"
          className="flex items-center text-gray-600 hover:text-black transition-all duration-300 hover:scale-105 transform group mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to shopping</span>
        </Link>

        {/* Unified Navigation Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {/* Main Controls Row */}
          <div className="flex items-center justify-between gap-4 mb-4">
            {/* Left: View Mode Toggle Icons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Center: Items Count */}
            <div className="flex-1 flex justify-center">
              <span className="text-gray-600 font-medium text-sm lg:text-base">
                {wishlistItems.length} items saved in wishlist
              </span>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center space-x-3">
              {inStockCount > 0 && (
                <button
                  onClick={moveAllToCart}
                  className="bg-black text-white px-4 lg:px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform flex items-center text-sm lg:text-base"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Move All to Cart</span>
                  <span className="sm:hidden">Move All</span>
                  <span className="ml-1">({inStockCount})</span>
                </button>
              )}
              <button
                onClick={clearWishlist}
                className="text-red-500 hover:text-red-700 font-medium transition-colors duration-300 hover:scale-105 transform px-3 lg:px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 text-sm lg:text-base"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Grid Column Controls Row (only show when grid mode is active) */}
          {viewMode === "grid" && (
            <div className="flex justify-end items-center gap-2 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600 hidden sm:inline">Columns:</span>
              <div className="flex items-center space-x-1">
                {[2, 3, 4].map((cols) => (
                  <button
                    key={cols}
                    onClick={() => setGridColumns(cols as 2 | 3 | 4)}
                    className={`w-8 h-8 text-sm rounded transition-all duration-300 flex items-center justify-center ${
                      gridColumns === cols ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title={`${cols} Columns`}
                  >
                    {cols}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Wishlist Items - Grid View */}
        {viewMode === "grid" && (
          <div
            className={`grid gap-4 lg:gap-6 ${
              gridColumns === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : gridColumns === 3
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {wishlistItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group animate-fadeInScale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  />

                  {/* Remove from Wishlist */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-all duration-300 hover:scale-110 transform"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </button>

                  {/* Stock Status */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3
                    className="font-semibold text-gray-900 mb-1 cursor-pointer hover:text-black transition-colors duration-300 line-clamp-2 text-sm lg:text-base"
                    onClick={() => handleProductClick(item)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600 mb-3">{item.brand}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-base lg:text-lg font-semibold text-black">£{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs lg:text-sm text-gray-500 line-through">£{item.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {item.inStock ? (
                      <>
                        <button
                          onClick={() => moveToCart(item)}
                          className="flex-1 bg-black text-white py-2 px-3 rounded-lg text-xs lg:text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform flex items-center justify-center"
                        >
                          <ShoppingCart className="w-3 lg:w-4 h-3 lg:h-4 mr-1" />
                          <span className="hidden sm:inline">Move to Cart</span>
                          <span className="sm:hidden">Move</span>
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 transform"
                        >
                          <Trash2 className="w-3 lg:w-4 h-3 lg:h-4 text-gray-600" />
                        </button>
                      </>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-gray-300 text-gray-500 py-2 px-3 rounded-lg text-xs lg:text-sm font-medium cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wishlist Items - List View */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {wishlistItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-4 md:p-6 animate-fadeInScale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-24 lg:w-32 h-48 sm:h-24 lg:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => handleProductClick(item)}
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-white text-black px-2 py-1 rounded text-xs font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 mr-4">
                        <h3
                          className="font-semibold text-gray-900 text-base lg:text-lg cursor-pointer hover:text-black transition-colors duration-300"
                          onClick={() => handleProductClick(item)}
                        >
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110 flex-shrink-0"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg lg:text-xl font-semibold text-black">£{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">£{item.originalPrice}</span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {item.inStock ? (
                          <>
                            <button
                              onClick={() => moveToCart(item)}
                              className="bg-black text-white px-4 lg:px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform flex items-center text-sm lg:text-base"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              <span className="hidden sm:inline">Move to Cart</span>
                              <span className="sm:hidden">Move</span>
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 transform"
                            >
                              <Trash2 className="w-4 h-4 text-gray-600" />
                            </button>
                          </>
                        ) : (
                          <button
                            disabled
                            className="bg-gray-300 text-gray-500 px-4 lg:px-6 py-2 rounded-lg font-medium cursor-not-allowed text-sm lg:text-base"
                          >
                            Out of Stock
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <Link
            href="/category/all-categories"
            className="bg-white text-black border border-gray-300 px-6 lg:px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-105 transform hover:shadow-lg inline-flex items-center text-sm lg:text-base"
          >
            Continue Shopping
            <ArrowRight className="w-4 lg:w-5 h-4 lg:h-5 ml-2" />
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
        
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
