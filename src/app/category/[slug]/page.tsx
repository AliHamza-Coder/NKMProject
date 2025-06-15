"use client"

import { useParams } from "next/navigation"
import CategoryPage from "@/components/category-page"

export default function CategoryPageRoute() {
  const params = useParams()
  const slug = params?.slug as string || "all-categories"
  
  return <CategoryPage categorySlug={slug} />
}