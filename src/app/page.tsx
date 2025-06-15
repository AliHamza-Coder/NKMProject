import AdditionalBanner from "@/components/additional-banner";
import CategoryCircles from "@/components/category-circles";
import FAQSection from "@/components/faq-section";
import FeaturedProducts from "@/components/featured-products";
import HeroSlider from "@/components/hero-slider";
import StylishBanners from "@/components/stylish-banners";

export default function Home() {
  return (
    <>
        <HeroSlider/>
        <CategoryCircles/>
        <FeaturedProducts/>
        <StylishBanners/>
        <AdditionalBanner/>
        <FAQSection/>
    </>
  );
}
