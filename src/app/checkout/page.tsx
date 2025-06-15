"use client"

import type React from "react"

import { useState } from "react"
import { Check, CreditCard, Truck, MapPin, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CheckoutPageProps {
  onGoBack?: () => void
}

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  color: string
  size: string
}

export default function CheckoutPage({ onGoBack }: CheckoutPageProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United Kingdom",

    // Payment Information
    paymentMethod: "online", // Add this line
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Billing same as shipping
    billingSameAsShipping: true,
    billingAddress: "",
    billingCity: "",
    billingPostalCode: "",

    // Delivery Options
    deliveryOption: "standard",

    // Order Notes
    orderNotes: "",
  })

  const [orderItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "Tulips Linen Fabric",
      price: 19.95,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "Orange",
      size: "2 Meters",
    },
    {
      id: "2",
      name: "Bohem Velvet Fabric",
      price: 22.95,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      color: "Teal",
      size: "1 Meter",
    },
  ])

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = formData.deliveryOption === "express" ? 9.99 : formData.deliveryOption === "standard" ? 5.99 : 0
  const tax = subtotal * 0.1
  const total = subtotal + deliveryFee + tax

  const steps = [
    { number: 1, title: "Shipping", icon: Truck },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Review", icon: Check },
    { number: 4, title: "Complete", icon: Check },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = () => {
    console.log("Order placed:", { formData, orderItems, total })
    setCurrentStep(4)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Go Back Button */}
        <button
          onClick={() => {
            console.log("Go back to cart")
            if (onGoBack) {
              onGoBack()
            }
          }}
          className="flex items-center text-gray-600 hover:text-black transition-all duration-300 hover:scale-105 transform group mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Cart
        </button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.number ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span
                    className={`text-xs md:text-sm mt-2 font-medium ${
                      currentStep >= step.number ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-0.5 mx-2 md:mx-4 transition-all duration-300 ${
                      currentStep > step.number ? "bg-black" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fadeInScale">
                <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
                  <Truck className="w-6 h-6 mr-3" />
                  Shipping Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-black mb-4">Delivery Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="free"
                        checked={formData.deliveryOption === "free"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Free Delivery</span>
                          <span className="text-green-600 font-semibold">FREE</span>
                        </div>
                        <p className="text-sm text-gray-600">5-7 business days</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="standard"
                        checked={formData.deliveryOption === "standard"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Standard Delivery</span>
                          <span className="font-semibold">£5.99</span>
                        </div>
                        <p className="text-sm text-gray-600">3-5 business days</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="express"
                        checked={formData.deliveryOption === "express"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Express Delivery</span>
                          <span className="font-semibold">£9.99</span>
                        </div>
                        <p className="text-sm text-gray-600">1-2 business days</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fadeInScale">
                <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3" />
                  Payment Information
                </h2>

                {/* Payment Method Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-black mb-4">Select Payment Method</h3>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300 has-[:checked]:border-black has-[:checked]:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === "online"}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-lg">Online Payment</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Secure</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Pay securely with credit/debit card</p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300 has-[:checked]:border-black has-[:checked]:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-black border-gray-300 focus:ring-black"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-lg">Cash on Delivery</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Available</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Pay when you receive your order</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Online Payment Details - Only show if online payment is selected */}
                {formData.paymentMethod === "online" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Cash on Delivery Info */}
                {formData.paymentMethod === "cod" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-green-800 mb-2">Cash on Delivery Selected</h3>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Pay in cash when your order is delivered</li>
                          <li>• No advance payment required</li>
                          <li>• Additional COD charges may apply: £2.99</li>
                          <li>• Please keep exact change ready</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Address - Show for both payment methods */}
                <div className="border-t pt-6 mt-8">
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="billingSameAsShipping"
                      checked={formData.billingSameAsShipping}
                      onChange={(e) => setFormData({ ...formData, billingSameAsShipping: e.target.checked })}
                      className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Billing address same as shipping</span>
                  </label>

                  {!formData.billingSameAsShipping && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-black">Billing Address</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                        <input
                          type="text"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                          <input
                            type="text"
                            name="billingCity"
                            value={formData.billingCity}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                          <input
                            type="text"
                            name="billingPostalCode"
                            value={formData.billingPostalCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-fadeInScale">
                <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
                  <Check className="w-6 h-6 mr-3" />
                  Review Your Order
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-8">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.color} • {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-black">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-black mb-3 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Shipping Address
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.postalCode}
                      <br />
                      {formData.country}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-black mb-3 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Method
                    </h3>
                    <p className="text-sm text-gray-600">
                      **** **** **** {formData.cardNumber.slice(-4)}
                      <br />
                      {formData.cardName}
                      <br />
                      Expires: {formData.expiryDate}
                    </p>
                  </div>
                </div>

                {/* Order Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes (Optional)</label>
                  <textarea
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Any special instructions for your order..."
                  />
                </div>
              </div>
            )}

            {/* Step 4: Order Complete */}
            {currentStep === 4 && (
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center animate-fadeInScale">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-black mb-4">Order Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-black mb-2">Order Details</h3>
                  <p className="text-sm text-gray-600">Order Number: #NKM-{Date.now()}</p>
                  <p className="text-sm text-gray-600">Total: £{total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">
                    Estimated Delivery:{" "}
                    {formData.deliveryOption === "express"
                      ? "1-2 business days"
                      : formData.deliveryOption === "standard"
                        ? "3-5 business days"
                        : "5-7 business days"}
                  </p>
                </div>
                <Link
                  href="/category/all-categories"
                  className="inline-block bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform hover:shadow-lg"
                >
                  Continue Shopping
                </Link>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentStep === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 transform"
                  }`}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>
                <button
                  onClick={currentStep === 3 ? handlePlaceOrder : handleNextStep}
                  className="flex items-center bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform"
                >
                  {currentStep === 3 ? "Place Order" : "Continue"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-black mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">{deliveryFee === 0 ? "FREE" : `£${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">£{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
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
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
