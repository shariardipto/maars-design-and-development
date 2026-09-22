export const defaultSettings = {
  siteName: "MDDL", tagline: "Maars Design and Developments LTD.",
  description: "Thoughtful architecture, interiors and spaces designed around you.",
  phone: "", email: "", address: "", instagram: "", facebook: "", linkedin: "", twitter: "",
  whatsappEnabled: false, whatsappNumber: "", whatsappMessage: "Hello, I'd like to discuss a project with MDDL.",
  chatEnabled: false, chatTitle: "MDDL design assistant", chatWelcome: "Hello. What kind of space are you planning?",
};
export const defaultContent = {
  heroTitle: "Architecture", heroAccent: "and Decor.", heroOutline: "Living space.",
  heroDescription: "MDDL creates thoughtful architectural and interior spaces through design, detail and a strong understanding of how people experience the built environment.",
  heroImage: "/images/reference/hero-main.png", heroSideImage: "/images/reference/hero-right.png",
  aboutTitle: "We turn ideas into works of art", aboutDescription: "MDDL approaches architecture and interior design through a careful balance of function, material, proportion and human experience. Every project is shaped by its context, purpose and the people who live, work and interact within the space.",
  aboutImage: "/images/reference/about.png", videoUrl: "",
  processTitle: "Let Your Home Be Unique Stylish.", processImage: "/images/reference/process.png",
  processDescription: "From the first conversation to the final detail, we bring clarity, care and a shared vision to every stage of your project.",
  projectTitle: "Best and stand out amongst peers",
  specializationTitle: "Shaping The Future.", specializationDescription: "Considered architecture brings people, place and purpose together. We create enduring spaces through thoughtful planning, honest materials and attention to every detail.",
  specializationImage: "/images/reference/specialization.png", servicesImage: "/images/reference/services.png",
  ctaTitle: "Let's Talk About Your Project.",
  steps: [
    { title: "Client Needs", description: "Listening to your ambitions, your daily life and what matters to you." },
    { title: "Planning Design", description: "Balancing light, material and layout with your budget and site." },
    { title: "Architect Sketch", description: "Bringing the vision to life through detailed drawings and visualizations." },
  ],
  services: [
    { title: "Furniture & Accessories", description: "Custom and curated pieces selected for the scale and material palette of each space." },
    { title: "Construction", description: "From groundwork to finishing, a considered approach to every stage of the build." },
    { title: "Architecture", description: "Concept-to-construction design shaped around site, light and the way you live." },
    { title: "3D Animation", description: "Visualizations and walkthroughs that let you experience a space before it is built." },
  ],
  testimonials: [] as { name: string; role: string; quote: string }[],
  clients: [] as string[],
};
export const defaultIntegrations = {
  chatbotModel: "", chatbotInstructions: "You are MDDL's design assistant. Help visitors understand architecture and interior design services. Be concise. Do not invent prices, availability, guarantees or project facts. Invite visitors to use the contact form for a consultation. Never request sensitive information.",
  whatsappPhoneId: "", whatsappApiVersion: "v23.0",
};
export type SiteSettings = typeof defaultSettings;
export type SiteContent = typeof defaultContent;
export type IntegrationSettings = typeof defaultIntegrations;
