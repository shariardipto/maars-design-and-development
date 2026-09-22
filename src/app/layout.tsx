import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const heebo = localFont({
  src: [{ path: "../../public/fonts/Heebo-400.ttf", weight: "400" }, { path: "../../public/fonts/Heebo-700.ttf", weight: "700" }],
  variable: "--font-heebo",
  display: "swap",
});

const mukta = localFont({
  src: [{ path: "../../public/fonts/Mukta-300.ttf", weight: "300" }, { path: "../../public/fonts/Mukta-400.ttf", weight: "400" }],
  variable: "--font-mukta",
  display: "swap",
});
const poppins = localFont({ src: "../../public/fonts/Poppins-700.ttf", weight: "700", variable: "--font-poppins", display: "swap", preload: false });

export const metadata: Metadata = {
  title: {
    default: "MDDL",
    template: "%s | MDDL",
  },

  description:
    "MDDL Architecture, Interior Design and Creative Design Studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heebo.variable} ${mukta.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
