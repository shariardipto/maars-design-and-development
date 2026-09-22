"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminPost } from "@/lib/admin-client";
import type { SiteSettings } from "@/lib/config";

const field = "h-[42px] w-full border border-[#e5e5e5] px-3 text-[13px] outline-none focus:border-[#ff7e44]";
const label = "mb-1 block text-[11px] uppercase tracking-[0.06em] text-[#7a7a7a]";

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [value, setValue] = useState<SiteSettings>(settings);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof SiteSettings>(key: K, next: SiteSettings[K]) {
    setValue((current) => ({ ...current, [key]: next }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await adminPost("settings", undefined, value);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-[720px] flex-col gap-10">
      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <h2 className="text-[16px] font-semibold">Site</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={label}>Site Name</label>
            <input className={field} value={value.siteName} onChange={(e) => set("siteName", e.target.value)} />
          </div>
          <div>
            <label className={label}>Tagline</label>
            <input className={field} value={value.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={label}>Description</label>
          <input
            className={field}
            value={value.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <h2 className="text-[16px] font-semibold">Contact Info</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={label}>Phone</label>
            <input className={field} value={value.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div>
            <label className={label}>Email</label>
            <input className={field} value={value.email} onChange={(e) => set("email", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={label}>Address</label>
          <input className={field} value={value.address} onChange={(e) => set("address", e.target.value)} />
        </div>
      </section>

      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <h2 className="text-[16px] font-semibold">Social Links</h2>
        <p className="text-[12px] text-[#999]">Leave blank to hide a link from the site.</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={label}>Instagram URL</label>
            <input className={field} value={value.instagram} onChange={(e) => set("instagram", e.target.value)} />
          </div>
          <div>
            <label className={label}>Facebook URL</label>
            <input className={field} value={value.facebook} onChange={(e) => set("facebook", e.target.value)} />
          </div>
          <div>
            <label className={label}>LinkedIn URL</label>
            <input className={field} value={value.linkedin} onChange={(e) => set("linkedin", e.target.value)} />
          </div>
          <div>
            <label className={label}>Twitter / X URL</label>
            <input className={field} value={value.twitter} onChange={(e) => set("twitter", e.target.value)} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <h2 className="text-[16px] font-semibold">WhatsApp Click-to-Chat</h2>
        <label className="flex items-center gap-2 text-[13px]">
          <input
            type="checkbox"
            checked={value.whatsappEnabled}
            onChange={(e) => set("whatsappEnabled", e.target.checked)}
          />
          Show the WhatsApp button on the site
        </label>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={label}>WhatsApp Number (digits only, with country code)</label>
            <input
              className={field}
              value={value.whatsappNumber}
              onChange={(e) => set("whatsappNumber", e.target.value)}
              placeholder="18886541321"
            />
          </div>
          <div>
            <label className={label}>Pre-filled Message</label>
            <input
              className={field}
              value={value.whatsappMessage}
              onChange={(e) => set("whatsappMessage", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <h2 className="text-[16px] font-semibold">Chat Assistant</h2>
        <label className="flex items-center gap-2 text-[13px]">
          <input
            type="checkbox"
            checked={value.chatEnabled}
            onChange={(e) => set("chatEnabled", e.target.checked)}
          />
          Show the chat widget on the site
        </label>
        <p className="text-[12px] text-[#999]">
          Requires an OpenAI API key and model configured under Integrations.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={label}>Widget Title</label>
            <input className={field} value={value.chatTitle} onChange={(e) => set("chatTitle", e.target.value)} />
          </div>
          <div>
            <label className={label}>Welcome Message</label>
            <input
              className={field}
              value={value.chatWelcome}
              onChange={(e) => set("chatWelcome", e.target.value)}
            />
          </div>
        </div>
      </section>

      {error && <p className="text-[13px] text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="h-[46px] w-fit bg-[#191919] px-8 text-[11px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#ff7e44] disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
