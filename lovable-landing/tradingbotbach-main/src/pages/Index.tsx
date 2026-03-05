import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import FloatingDollars from "@/components/FloatingDollars";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <FloatingDollars />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
