export interface BannerData {
  id: number
  title: string
  subtitle: string
  description: string
  image1: string
  image2: string
  cta: string
  ctaLink?: string
}

export const banners: BannerData[] = [
  {
    id: 1,
    title: "Premium Silk Collection",
    subtitle: "Luxury Redefined",
    description:
      "Experience the finest silk fabrics crafted with precision and elegance. Perfect for special occasions and formal wear.",
    image1: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    image2:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    cta: "Explore Silk",
    ctaLink: "/category/formal",
  },
  {
    id: 2,
    title: "Cotton Comfort Series",
    subtitle: "Breathable & Soft",
    description: "Discover our premium cotton collection designed for everyday comfort without compromising on style.",
    image1:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    image2:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    cta: "Shop Cotton",
    ctaLink: "/category/unstitched",
  },
  {
    id: 3,
    title: "Bridal Exclusive Range",
    subtitle: "Your Dream Wedding",
    description:
      "Make your special day unforgettable with our exclusive bridal fabric collection featuring intricate designs.",
    image1:
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    image2:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    cta: "View Bridal",
    ctaLink: "/category/bridal",
  },
]
