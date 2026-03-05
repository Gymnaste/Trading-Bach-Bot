import FloatingDollars from '../landing/FloatingDollars'
import LandingHeader from '../landing/LandingHeader'
import HeroSection from '../landing/HeroSection'
import FeaturesSection from '../landing/FeaturesSection'
import Footer from '../landing/Footer'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[hsl(216,71%,8%)] relative">
            <FloatingDollars />
            <LandingHeader />
            <HeroSection />
            <FeaturesSection />
            <Footer />
        </div>
    )
}
