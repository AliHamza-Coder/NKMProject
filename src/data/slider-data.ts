export interface SliderData {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  cta: string
  ctaLink?: string
  learnMoreLink?: string
}

export const heroSlides: SliderData[] = [
  {
    id: 1,
    title: "Premium Fabric Collection",
    subtitle: "Discover Luxury in Every Thread",
    description: "Explore our exclusive range of premium fabrics crafted for the modern fashion enthusiast",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    cta: "Shop Collection",
  },
  {
    id: 2,
    title: "Winter Collection 2024",
    subtitle: "Warmth Meets Elegance",
    description: "Cozy up in style with our latest winter fabric collection featuring rich textures and colors",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    cta: "Explore Winter",
  },
  {
    id: 3,
    title: "Bridal Exclusive",
    subtitle: "Your Dream Wedding Awaits",
    description: "Exquisite bridal fabrics that make your special day unforgettable",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
    cta: "View Bridal",
  },
]
