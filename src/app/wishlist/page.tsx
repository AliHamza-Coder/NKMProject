"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Trash2, ArrowRight, List, LayoutGrid } from "lucide-react"
import { initialWishlistItems, type WishlistItem } from "@/data/wishlist-data"

interface WishlistPageProps {
  onGoBack?: () => void
  onProductSelect?: (productSlug: string) => void
}

export default function WishlistPage({ onGoBack, onProductSelect }: WishlistPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3)
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlistItems)

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
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Go Back Button */}
          <button
            onClick={() => {
              console.log("Go back to previous page")
              if (onGoBack) {
                onGoBack()
              }
            }}
            className="flex items-center text-gray-600 hover:text-black transition-all duration-300 hover:scale-105 transform group mb-6"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>

          {/* Empty Wishlist */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fadeInScale">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save your favorite items to your wishlist and shop them later.</p>
            <button
              onClick={() => {
                console.log("Continue shopping")
                if (onGoBack) {
                  onGoBack()
                }
              }}
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform hover:shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  const inStockCount = wishlistItems.filter((item) => item.inStock).length

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Go Back Button */}
        <button
          onClick={() => {
            console.log("Go back to previous page")
            if (onGoBack) {
              onGoBack()
            }
          }}
          className="flex items-center text-gray-600 hover:text-black transition-all duration-300 hover:scale-105 transform group mb-6"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Go Back
        </button>

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black animate-fadeInScale">My Wishlist</h1>
            <p className="text-gray-600 mt-1">{wishlistItems.length} items saved</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {inStockCount > 0 && (
              <button
                onClick={moveAllToCart}
                className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform flex items-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Move All to Cart ({inStockCount})
              </button>
            )}
            <button
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-700 font-medium transition-colors duration-300 hover:scale-105 transform px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{wishlistItems.length} items</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "list" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid Column Controls */}
          {viewMode === "grid" && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Columns:</span>
              <div className="flex items-center space-x-1">
                {[2, 3, 4].map((cols) => (
                  <button
                    key={cols}
                    onClick={() => setGridColumns(cols as 2 | 3 | 4)}
                    className={`px-3 py-1 text-sm rounded transition-all duration-300 ${
                      gridColumns === cols ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
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
            className={`grid gap-6 ${
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
                    className="font-semibold text-gray-900 mb-1 cursor-pointer hover:text-black transition-colors duration-300 line-clamp-2"
                    onClick={() => handleProductClick(item)}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{item.brand}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-black">£{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">£{item.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {item.inStock ? (
                      <>
                        <button
                          onClick={() => moveToCart(item)}
                          className="flex-1 bg-black text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform flex items-center justify-center"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Move to Cart
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
                        className="flex-1 bg-gray-300 text-gray-500 py-2 px-3 rounded-lg text-sm font-medium cursor-not-allowed"
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
                  <div className="w-full sm:w-32 h-48 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
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
                      <div>
                        <h3
                          className="font-semibold text-gray-900 text-lg cursor-pointer hover:text-black transition-colors duration-300"
                          onClick={() => handleProductClick(item)}
                        >
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-semibold text-black">£{item.price}</span>
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
                              className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform flex items-center"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Move to Cart
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
                            className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-medium cursor-not-allowed"
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
          <button
            onClick={() => {
              console.log("Continue shopping")
              if (onGoBack) {
                onGoBack()
              }
            }}
            className="bg-white text-black border border-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-105 transform hover:shadow-lg flex items-center mx-auto"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
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
