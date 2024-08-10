import Footer from "@/components/Footer";
import AboutRestaurantSection from "@/components/Home/AboutRestaurantSection";
import GallerySection from "@/components/Home/GallerySection";
import HeroSection from "@/components/Home/HeroSection";
import Oportitunityes from "@/components/Home/Oportitunityes";
import RoomSection from "@/components/Home/RoomSection";
import WelcomeSection from "@/components/Home/WelcomeSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WelcomeSection />
      <Oportitunityes />
      <RoomSection />
      <AboutRestaurantSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
