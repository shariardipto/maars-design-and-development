export const defaultSettings = {
  siteName: "MDDL", tagline: "Maars Design and Developments LTD.",
  description: "Thoughtful architecture, interiors and spaces designed around you.",
  phone: "+18886541321", email: "hello@mddl.studio", address: "41 Waldeck Avenue, Grapevine, Nashville, TX 76051",
  instagram: "", facebook: "", linkedin: "", twitter: "",
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
  specializationTitle: "Shaping the future.", specializationDescription: "Considered architecture brings people, place and purpose together. We create enduring spaces through thoughtful planning, honest materials and attention to every detail.",
  specializationImage: "/images/reference/specialization.png", servicesImage: "/images/reference/services.png",
  ctaTitle: "Let's Talk About Your Project.",
  steps: [
    { title: "Client Needs", description: "We start by listening — understanding how you live, work and move through a space before a single line is drawn." },
    { title: "Planning Design", description: "Concepts are developed into detailed plans, balancing light, material and layout against budget and site constraints." },
    { title: "Architect Sketch", description: "Refined drawings and 3D visualizations bring the design to life, ready to guide construction from start to finish." },
  ],
  services: [
    { title: "Furniture & Accessories", description: "Custom and curated furniture pieces selected to match the scale and material palette of each space." },
    { title: "Construction", description: "End-to-end build management, from groundwork to finishing, with a dedicated site lead on every project." },
    { title: "Architecture", description: "Concept-to-construction architectural design shaped around site, light and the way people move through space." },
    { title: "3D Animation", description: "Photorealistic renders and walkthroughs that help clients see and refine a space before construction begins." },
  ],
  testimonials: [
    { name: "Helena Cross", role: "Homeowner, Grapevine", quote: "MDDL turned a vague idea into a home that actually fits how we live. Every detail, from the light to the storage, was considered." },
    { name: "David Okafor", role: "Restaurant Owner", quote: "The team managed our build from sketch to handover without a single surprise. Communication was clear at every stage." },
    { name: "Mei Lin Tan", role: "Property Developer", quote: "Their 3D visualizations let us show units before construction even started. Genuinely some of the best renders we've used." },
  ] as { name: string; role: string; quote: string }[],
  clients: ["NOVARA", "URBN & CO", "GRIDWORKS", "STONEFORM", "LUMENHAUS", "ATELIER 8"] as string[],
};
export const defaultIntegrations = {
  chatbotModel: "", chatbotInstructions: "You are MDDL's design assistant. Help visitors understand architecture and interior design services. Be concise. Do not invent prices, availability, guarantees or project facts. Invite visitors to use the contact form for a consultation. Never request sensitive information.",
  whatsappPhoneId: "", whatsappApiVersion: "v23.0",
};
export type SiteSettings = typeof defaultSettings;
export type SiteContent = typeof defaultContent;
export type IntegrationSettings = typeof defaultIntegrations;
