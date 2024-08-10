import AboutRestaurantSection from "@/components/Home/AboutRestaurantSection";
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
    </main>
  );
}
