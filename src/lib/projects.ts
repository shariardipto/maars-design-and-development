export type Project = {
  slug: string;
  title: string;
  category: string;
  cover: string;
  gallery: string[];
  location: string;
  year: string;
  description: string;
};

const img = (name: string) => `/images/home/${name}`;

export const projects: Project[] = [
  {
    slug: "modern-villa-renovation",
    title: "Modern Villa Renovation",
    category: "Residential Architecture",
    cover: img("2024_10_05_11_07_IMG_2066.JPG"),
    gallery: [
      img("2024_10_05_11_09_IMG_2069.JPG"),
      img("2024_10_05_11_14_IMG_2077.JPG"),
    ],
    location: "Grapevine, TX",
    year: "2024",
    description:
      "A full exterior and structural renovation that reworks the building's massing with layered balconies, brick accents and vertical greenery.",
  },
  {
    slug: "skyline-residences",
    title: "Skyline Residences",
    category: "Residential Architecture",
    cover: img("2024_10_05_11_10_IMG_2112.JPG"),
    gallery: [img("2024_10_05_11_07_IMG_2066.JPG"), img("2024_10_05_11_09_IMG_2069.JPG")],
    location: "Nashville, TN",
    year: "2024",
    description:
      "A mixed-material residential tower combining charcoal cladding, brick banding and glazed balconies for a quietly bold street presence.",
  },
  {
    slug: "riverside-apartments",
    title: "Riverside Apartments",
    category: "Residential Architecture",
    cover: img("2024_10_05_11_09_IMG_2069.JPG"),
    gallery: [img("2024_10_05_11_10_IMG_2112.JPG"), img("2024_10_05_11_14_IMG_2077.JPG")],
    location: "Waldeck, TX",
    year: "2023",
    description:
      "Low-rise apartment blocks set among mature trees, designed around shared courtyards and generous private balconies.",
  },
  {
    slug: "courtyard-garden-terrace",
    title: "Courtyard Garden Terrace",
    category: "Residential Architecture",
    cover: img("2024_10_05_11_14_IMG_2077.JPG"),
    gallery: [img("2024_10_05_11_09_IMG_2069.JPG"), img("2024_10_05_11_11_IMG_2082.JPG")],
    location: "Grapevine, TX",
    year: "2023",
    description:
      "A private outdoor terrace framed by brick pilasters and tropical planting, built as a quiet extension of the home's living space.",
  },
  {
    slug: "minimalist-master-suite",
    title: "Minimalist Master Suite",
    category: "Interior Design",
    cover: img("2024_10_05_11_09_IMG_2050.JPG"),
    gallery: [img("2024_10_05_11_09_IMG_2044.JPG"), img("2024_10_05_11_09_IMG_2058.JPG")],
    location: "Nashville, TN",
    year: "2024",
    description:
      "A warm, material-led bedroom with concealed storage, soft task lighting and a restrained palette of oak and concrete.",
  },
  {
    slug: "urban-loft-bedroom",
    title: "Urban Loft Bedroom",
    category: "Interior Design",
    cover: img("2024_10_05_11_09_IMG_2044.JPG"),
    gallery: [img("2024_10_05_11_09_IMG_2050.JPG"), img("2024_10_05_11_09_IMG_2058.JPG")],
    location: "Grapevine, TX",
    year: "2024",
    description:
      "Mirrored wardrobes and a slatted timber screen give this compact loft bedroom depth, light and a strong sense of privacy.",
  },
  {
    slug: "open-plan-dining-hall",
    title: "Open-Plan Dining Hall",
    category: "Interior Design",
    cover: img("2024_10_05_11_11_IMG_2082.JPG"),
    gallery: [img("2024_10_05_11_09_IMG_2050.JPG"), img("2024_10_05_11_14_IMG_2077.JPG")],
    location: "Nashville, TN",
    year: "2023",
    description:
      "A double-height dining and stair hall anchored by a sculptural staircase, built-in joinery and layered ambient lighting.",
  },
  {
    slug: "sunset-penthouse-retreat",
    title: "Sunset Penthouse Retreat",
    category: "Interior Design",
    cover: img("2024_10_05_11_09_IMG_2058.JPG"),
    gallery: [img("2024_10_05_11_09_IMG_2044.JPG"), img("2024_10_05_11_09_IMG_2050.JPG")],
    location: "Waldeck, TX",
    year: "2024",
    description:
      "A top-floor bedroom suite opening onto a private balcony, designed to frame the evening skyline as its focal point.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
