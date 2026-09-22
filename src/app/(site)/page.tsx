import Hero from "@/components/home/Hero";
import AboutIntro from "@/components/home/AboutIntro";
import ProcessSection from "@/components/home/ProcessSection";
import Specialization from "@/components/home/Specialization";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Testimonials from "@/components/home/Testimonials";
import ServicesSection from "@/components/home/ServicesSection";
import ClientLogos from "@/components/home/ClientLogos";
import ContactCTA from "@/components/home/ContactCTA";
import { getConfig } from "@/lib/server/repository";
import { listProjects } from "@/lib/server/repository";

export default function Home() {
  const content = getConfig("content");
  const settings = getConfig("settings");
  const featured = listProjects().filter((project) => project.featured);

  return (
    <main>
      <Hero content={content} settings={settings} />
      <AboutIntro content={content} />
      <ProcessSection content={content} />
      <FeaturedProjects projects={featured} title={content.projectTitle} />
      <Testimonials content={content} />
      <Specialization content={content} />
      <ServicesSection content={content} />
      <ClientLogos content={content} />
      <ContactCTA title={content.ctaTitle} />
    </main>
  );
}
