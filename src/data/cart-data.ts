export interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  color: string
  size: string
  quantity: number
  brand: string
}

export const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Tulips Linen Fabric",
    price: 19.95,
    originalPrice: 24.95,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    color: "Orange",
    size: "2 Meters",
    quantity: 2,
    brand: "Harris Tweed",
  },
  {
    id: "2",
    name: "Bohem Velvet Fabric",
    price: 22.95,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    color: "Teal",
    size: "1 Meter",
    quantity: 1,
    brand: "Opulent Velvets",
  },
  {
    id: "3",
    name: "Premium Silk Collection",
    price: 35.95,
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    color: "Pink",
    size: "1 Meter",
    quantity: 1,
    brand: "Multyork",
  },
]
