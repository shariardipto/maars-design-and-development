import { adminRead } from "@/lib/server/admin";
import SettingsForm from "@/components/admin/SettingsForm";
import type { SiteSettings } from "@/lib/config";

export default async function AdminSettingsPage() {
  let settings: SiteSettings;
  try {
    settings = (await adminRead("settings")) as SiteSettings;
  } catch (error) {
    return <p className="text-[14px] text-[#7a7a7a]">{error instanceof Error ? error.message : "Access denied."}</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-semibold">Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
