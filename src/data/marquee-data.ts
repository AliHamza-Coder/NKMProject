export interface MarqueeData {
  id: number
  text: string
  icon: string
  active: boolean
}

export const marqueeMessages: MarqueeData[] = [
  {
    id: 1,
    text: "🎉 FREE DELIVERY ON ORDERS ABOVE RS. 5000",
    icon: "🚚",
    active: true,
  },
  {
    id: 2,
    text: "✨ NEW WINTER COLLECTION NOW LIVE",
    icon: "❄️",
    active: true,
  },
  {
    id: 3,
    text: "🔥 SHOP NOW AND SAVE UP TO 50% OFF",
    icon: "💰",
    active: true,
  },
  {
    id: 4,
    text: "⏰ LIMITED TIME OFFER - HURRY UP",
    icon: "⚡",
    active: true,
  },
  {
    id: 5,
    text: "🎁 SPECIAL DISCOUNTS ON BULK ORDERS",
    icon: "📦",
    active: true,
  },
]

// Function to get active marquee messages
export const getActiveMarqueeMessages = (): string => {
  const activeMessages = marqueeMessages.filter((msg) => msg.active)
  return activeMessages.map((msg) => msg.text).join(" | ") + " | "
}
