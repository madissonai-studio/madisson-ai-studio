import Hero from "@/components/Hero";
import Marketplace from "@/components/Marketplace";
import Pricing from "@/components/Pricing";
import AcademyTeaser from "@/components/AcademyTeaser";
import FollowSection from "@/components/FollowSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Marketplace />
      <FollowSection />
      <Pricing />
      <AcademyTeaser />
    </>
  );
}
