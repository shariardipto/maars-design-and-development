import Hero from "@/components/home/Hero";
import AboutIntro from "@/components/home/AboutIntro";
import ProcessSection from "@/components/home/ProcessSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Testimonials from "@/components/home/Testimonials";
import ServicesSection from "@/components/home/ServicesSection";
import ClientLogos from "@/components/home/ClientLogos";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutIntro />
      <ProcessSection />
      <FeaturedProjects />
      <Testimonials />
      <ServicesSection />
      <ClientLogos />
      <ContactCTA />
    </main>
  );
}