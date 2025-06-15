"use client"

import Link from "next/link"

const services = [
  {
    id: 1,
    icon: "🚚",
    title: "Free Shipping",
    description: "Free shipping for order above $100",
    bgColor: "bg-orange-50",
    iconBg: "bg-orange-100",
  },
  {
    id: 2,
    icon: "💳",
    title: "Flexible Payment",
    description: "Multiple secure payment options",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
  },
  {
    id: 3,
    icon: "🎧",
    title: "24x7 Support",
    description: "We support online all days",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
  },
]

export default function ServiceBanners() {
  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              href={`/services/${service.title.toLowerCase().replace(/ /g, '-')}`}
              key={service.id}
              className={`${service.bgColor} rounded-xl p-6 flex items-center space-x-4 hover:scale-105 hover:shadow-lg transition-all duration-300 group cursor-pointer`}
            >
              <div
                className={`${service.iconBg} w-12 h-12 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-black transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
