import { HeroSection, CategoriesSection, BestSellingSection,  BlogsSection, CraftedSection, Footer, CategoriesScrollSection } from '@/components/sections';
import LivestreamSectionWebRTC from '@/components/sections/livestream/LivestreamSection-webrtc';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />
      <CategoriesScrollSection />
      <LivestreamSectionWebRTC />
      <CategoriesSection />
      <BestSellingSection />
      {/* <CityBazarsSection /> */}
      <BlogsSection />
      <CraftedSection />
      <Footer />

    </div>
  );
}
