import FAQSection from "./sections/FAQ";
import Features from "./sections/Features";
import HeaderHeroWrapper from "./sections/HeaderHeroWrapper";
import Testimonials from "./sections/Testimonials";
import PartnersSection from "./sections/Partners";
import { CTASection } from "./sections/CTA";

export default function LandingPage() {
  return (
    <div className="font-['DM_Sans',sans-serif] overflow-x-hidden">
      <HeaderHeroWrapper />
      <Testimonials />
      <Features />
      <PartnersSection />
      <CTASection />
      <FAQSection />
    </div>
  );
}
