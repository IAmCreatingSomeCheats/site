import Navbar from "../components/server/Navbar";
import HeroSection from "../components/server/HeroSection";
import FeaturesSection from "../components/server/FeaturesSection";
import StoreSection from "../components/server/StoreSection";
import LeaderboardSection from "../components/server/LeaderboardSection";
import CommunitySection from "../components/server/CommunitySection";
import FooterSection from "../components/server/FooterSection";

export default function Home() {
  return (
    <div className="bg-void-bg min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StoreSection />
      <LeaderboardSection />
      <CommunitySection />
      <FooterSection />
    </div>
  );
}