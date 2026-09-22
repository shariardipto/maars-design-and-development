import type { SiteSettings } from "@/lib/config";
import WhatsAppButton from "./WhatsAppButton";
import ChatWidget from "./ChatWidget";

export default function FloatingWidgets({ settings }: { settings: SiteSettings }) {
  return (
    <>
      <ChatWidget settings={settings} />
      <WhatsAppButton settings={settings} />
    </>
  );
}
