"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Grid, List, ChevronLeft } from "lucide-react"
import { initialCartItems, type CartItem as CartItemType } from "@/data/cart-data"
import Breadcrumb from "@/components/breadcrumb"
import Link from "next/link"

interface CartPageProps {
  onGoBack?: () => void
  onCheckout?: () => void
}

export default function CartPage({ onGoBack, onCheckout }: CartPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems)

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shopping Cart", current: true },
  ]

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
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

          {/* Empty Cart */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-fadeInScale">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
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

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">{cartItems.length} items in cart</span>
          </div>
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === "grid" ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-4 h-4" />
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
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 font-medium transition-colors duration-300 hover:scale-105 transform px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInScale"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.brand}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                            <span>{item.color}</span>
                            <span>•</span>
                            <span>{item.size}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-all duration-300 hover:scale-110"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors duration-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-2 font-medium text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors duration-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-black">£{(item.price * item.quantity).toFixed(2)}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                £{(item.originalPrice * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">£{item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-lg p-4 md:p-6 animate-fadeInScale"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-48 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.brand}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                              <span>Color: {item.color}</span>
                              <span>Size: {item.size}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition-colors duration-300"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition-colors duration-300"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-semibold text-black">
                                £{(item.price * item.quantity).toFixed(2)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  £{(item.originalPrice * item.quantity).toFixed(2)}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">£{item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 animate-fadeInScale delay-300">
              <h2 className="text-xl font-bold text-black mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "FREE" : `£${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">£{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-black">Total</span>
                    <span className="text-xl font-bold text-black">£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {subtotal < 50 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">Add £{(50 - subtotal).toFixed(2)} more to get FREE shipping!</p>
                </div>
              )}

              <Link
                href="/checkout"
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform hover:shadow-lg flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>

              <Link
                href="/category/all-categories"
                className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-105 transform flex items-center justify-center"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
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
        
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  )
}
