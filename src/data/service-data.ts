import { Truck, CreditCard, Headphones, Shield, Clock, Award, RefreshCw, MapPin } from "lucide-react"

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string
  iconComponent: any
  bgColor: string
  iconColor: string
  hoverColor: string
}

export const services: ServiceItem[] = [
  {
    id: "free-shipping",
    title: "Free Shipping",
    description: "Free delivery on orders over £50. Fast and reliable shipping nationwide.",
    icon: "🚚",
    iconComponent: Truck,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverColor: "hover:bg-blue-100",
  },
  {
    id: "flexible-payment",
    title: "Flexible Payment",
    description: "Multiple payment options including card, PayPal, and buy now pay later.",
    icon: "💳",
    iconComponent: CreditCard,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    hoverColor: "hover:bg-green-100",
  },
  {
    id: "customer-support",
    title: "24/7 Support",
    description: "Round-the-clock customer service to help with all your queries.",
    icon: "🎧",
    iconComponent: Headphones,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    hoverColor: "hover:bg-purple-100",
  },
  {
    id: "secure-shopping",
    title: "Secure Shopping",
    description: "Your data is protected with SSL encryption and secure payment processing.",
    icon: "🛡️",
    iconComponent: Shield,
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    hoverColor: "hover:bg-red-100",
  },
  {
    id: "fast-delivery",
    title: "Fast Delivery",
    description: "Express delivery options available. Get your order within 24-48 hours.",
    icon: "⚡",
    iconComponent: Clock,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
    hoverColor: "hover:bg-yellow-100",
  },
  {
    id: "quality-guarantee",
    title: "Quality Guarantee",
    description: "Premium quality fabrics with satisfaction guarantee or money back.",
    icon: "🏆",
    iconComponent: Award,
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    hoverColor: "hover:bg-indigo-100",
  },
  {
    id: "easy-returns",
    title: "Easy Returns",
    description: "Hassle-free returns within 30 days. No questions asked policy.",
    icon: "🔄",
    iconComponent: RefreshCw,
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    hoverColor: "hover:bg-teal-100",
  },
  {
    id: "nationwide-delivery",
    title: "Nationwide Delivery",
    description: "We deliver across the UK. Track your order in real-time.",
    icon: "📍",
    iconComponent: MapPin,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    hoverColor: "hover:bg-orange-100",
  },
]
