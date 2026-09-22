import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/site/FloatingWidgets";
import { getConfig } from "@/lib/server/repository";
import RevealMotion from "@/components/site/RevealMotion";

// Every public page reads live settings/content/project data from SQLite, so the
// whole site must render per-request — otherwise admin edits wouldn't appear
// without a rebuild.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = getConfig("settings");

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header settings={settings} />
      <div id="main-content" tabIndex={-1}>{children}</div>
      <Footer settings={settings} />
      <FloatingWidgets settings={settings} />
      <RevealMotion />
    </>
  );
}
