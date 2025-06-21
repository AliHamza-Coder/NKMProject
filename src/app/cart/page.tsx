"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Trash2, ArrowRight, ChevronLeft } from "lucide-react"
import Breadcrumb from "@/components/breadcrumb"
import Link from "next/link"
import { useShop } from "@/context/ShopContext"
import { useRouter } from "next/navigation"
import { NKMLoader } from "@/components/amazing-loader"
import { usePageLoading } from "@/hooks/use-loading"
import { useNavigationWithLoader } from "@/hooks/use-navigation"

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useShop()
  const [isLoading, setIsLoading] = useState(false)
  const { isLoading: pageLoading, stopLoading } = usePageLoading()
  const router = useRouter()
  const { navigateTo } = useNavigationWithLoader()

  // Simulate loading when component mounts
  useEffect(() => {
    const loadCart = async () => {
      // Simulate API call or data loading
      await new Promise(resolve => setTimeout(resolve, 600))
      stopLoading()
    }
    
    loadCart()
  }, [stopLoading])

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shopping Cart", current: true },
  ]

  const handleQuantityChange = (productId: string, newQuantity: number, color: string, size: string) => {
    updateCartItemQuantity(productId, newQuantity, color, size)
  }

  const handleRemoveItem = (productId: string, color: string, size: string) => {
    removeFromCart(productId, color, size)
  }

  const handleClearCart = () => {
    clearCart()
  }

  const handleProductClick = (slug: string) => {
    navigateTo(`/product/${slug}`)
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigateTo('/checkout')
  }

  const subtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const total = subtotal + shipping

  // Show loader while loading
  if (pageLoading) {
    return <NKMLoader fullScreen={true} size="lg" />
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] bg-gray-50">
        <Breadcrumb items={breadcrumbItems} />
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/category/all-categories"
            className="flex items-center text-gray-600 hover:text-black transition-all duration-300 hover:scale-105 transform group mb-8"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to shopping</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fadeInScale">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
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

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          href="/category/all-categories"
          className="flex items-center text-gray-600 hover:text-black transition-all duration-300 hover:scale-105 transform group mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to shopping</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                className="bg-white rounded-xl shadow-lg p-4 md:p-6 animate-fadeInScale"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-24 lg:w-32 h-48 sm:h-24 lg:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => handleProductClick(item.slug)}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 mr-4">
                        <h3 
                          className="font-semibold text-gray-900 text-base lg:text-lg cursor-pointer hover:text-black transition-colors duration-300"
                          onClick={() => handleProductClick(item.slug)}
                        >
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                        <p className="text-sm text-gray-500">
                          {item.color} • {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.color, item.size)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110 flex-shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg lg:text-xl font-semibold text-black">£{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">£{item.originalPrice}</span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1, item.color, item.size)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity || 1}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1, item.color, item.size)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>£{shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Proceed to Checkout"}
              </button>

              <button
                onClick={handleClearCart}
                className="w-full text-red-500 hover:text-red-700 font-medium transition-colors duration-300 hover:scale-105 transform mt-4 py-2 border border-red-200 rounded-lg hover:bg-red-50"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

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
      `}</style>
    </div>
  )
}
