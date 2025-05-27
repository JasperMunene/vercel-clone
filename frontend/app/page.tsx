import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { WorkflowSection } from "@/components/workflow-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CtaSection } from "@/components/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}