import { z } from "zod";
import { permissions, roles } from "./permissions";
export const text = (max = 200) => z.string().trim().max(max);
const required = (max = 200) => text(max).min(1, "This field is required.");
const webUrl = z.union([z.literal(""), z.url().max(500).refine((s) => s.startsWith("https://"), "Use an HTTPS URL.")]);
export const imagePath = z.string().regex(/^\/images\/[a-zA-Z0-9_./@ -]+\.(png|jpe?g|webp|avif)$/i, "Use a local /images/ image path.").refine((s) => !s.includes(".."), "Invalid image path.");
const item = z.object({ title: required(120), description: required(1500) });
export const settingsSchema = z.object({
  siteName: required(80), tagline: text(160), description: text(500), phone: text(40).regex(/^[+\d\s().-]*$/),
  email: z.union([z.literal(""), z.email().max(254)]), address: text(500),
  instagram: webUrl, facebook: webUrl, linkedin: webUrl, twitter: webUrl,
  whatsappEnabled: z.boolean(), whatsappNumber: text(20).regex(/^$|^[1-9]\d{6,14}$/), whatsappMessage: text(500),
  chatEnabled: z.boolean(), chatTitle: required(80), chatWelcome: required(500),
}).refine((s) => !s.whatsappEnabled || !!s.whatsappNumber, "Set a WhatsApp number before enabling it.");
export const contentSchema = z.object({
  heroTitle: required(80), heroAccent: required(80), heroOutline: required(80), heroDescription: required(1500), heroImage: imagePath, heroSideImage: imagePath,
  aboutTitle: required(150), aboutDescription: required(4000), aboutImage: imagePath, videoUrl: webUrl,
  processTitle: required(150), processDescription: required(1500), processImage: imagePath,
  projectTitle: required(150), specializationTitle: required(150), specializationDescription: required(4000), specializationImage: imagePath,
  servicesImage: imagePath, ctaTitle: required(150), steps: z.array(item).length(3), services: z.array(item).min(1).max(12),
  testimonials: z.array(z.object({ name: required(100), role: text(150), quote: required(2000) })).max(12), clients: z.array(required(80)).max(18),
});
export const integrationSchema = z.object({ chatbotModel: text(100).regex(/^[\w.:-]*$/), chatbotInstructions: required(8000), whatsappPhoneId: text(40).regex(/^\d*$/), whatsappApiVersion: z.string().regex(/^v\d{2}\.0$/) });
export const projectSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), title: required(160), category: required(100),
  cover: imagePath, gallery: z.array(imagePath).max(30), location: text(200), year: z.string().regex(/^\d{4}$/), description: required(10000),
  status: z.enum(["draft", "published", "archived"]), featured: z.boolean(), sortOrder: z.number().int().min(0).max(10000),
});
export const passwordSchema = z.string().min(12, "Use at least 12 characters.").max(128);
export const userSchema = z.object({ name: required(100), email: z.email().max(254).transform((s) => s.toLowerCase()), role: z.enum(roles), active: z.boolean(), password: z.union([z.literal(""), passwordSchema]).optional() });
export const roleSchema = z.object({ role: z.enum(roles).exclude(["admin"]), permissions: z.array(z.enum(permissions)).max(permissions.length) });
export const enquirySchema = z.object({ name: required(100), email: z.email().max(254), message: z.string().trim().min(10).max(5000), website: text(200).optional() });
