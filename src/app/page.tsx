import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { ValueProposition } from "@/components/sections/value-proposition";
import { Benefits } from "@/components/sections/benefits";
import { ReportPreview } from "@/components/sections/report-preview";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Testimonials } from "@/components/sections/testimonials";
import { Social } from "@/components/sections/social";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueProposition />
        <Benefits />
        <ReportPreview />
        <HowItWorks />
        <Testimonials />
        <Social />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
