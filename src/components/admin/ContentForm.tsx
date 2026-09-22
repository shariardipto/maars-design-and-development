"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminPost } from "@/lib/admin-client";
import type { SiteContent } from "@/lib/config";

const field = "h-[42px] w-full border border-[#e5e5e5] px-3 text-[13px] outline-none focus:border-[#ff7e44]";
const label = "mb-1 block text-[11px] uppercase tracking-[0.06em] text-[#7a7a7a]";
const textarea =
  "w-full resize-none border border-[#e5e5e5] p-3 text-[13px] outline-none focus:border-[#ff7e44]";

export default function ContentForm({ content }: { content: SiteContent }) {
  const router = useRouter();
  const [value, setValue] = useState<SiteContent>(content);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof SiteContent>(key: K, next: SiteContent[K]) {
    setValue((current) => ({ ...current, [key]: next }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await adminPost("content", undefined, value);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save content.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-[820px] flex-col gap-10">
      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <h2 className="text-[16px] font-semibold">Hero</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={label}>Title</label>
            <input className={field} value={value.heroTitle} onChange={(e) => set("heroTitle", e.target.value)} />
          </div>
          <div>
            <label className={label}>Accent</label>
            <input className={field} value={value.heroAccent} onChange={(e) => set("heroAccent", e.target.value)} />
          </div>
          <div>
            <label className={label}>Background Outline Text</label>
            <input className={field} value={value.heroOutline} onChange={(e) => set("heroOutline", e.target.value)} />
          </div>
          <div>
            <label className={label}>Image</label>
            <input className={field} value={value.heroImage} onChange={(e) => set("heroImage", e.target.value)} />
          </div>
          <div>
            <label className={label}>Side Image</label>
            <input
              className={field}
              value={value.heroSideImage}
              onChange={(e) => set("heroSideImage", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className={label}>Description</label>
          <textarea
            className={textarea}
            rows={3}
            value={value.heroDescription}
            onChange={(e) => set("heroDescription", e.target.value)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <h2 className="text-[16px] font-semibold">About</h2>
        <div>
          <label className={label}>Title</label>
          <input className={field} value={value.aboutTitle} onChange={(e) => set("aboutTitle", e.target.value)} />
        </div>
        <div>
          <label className={label}>Description</label>
          <textarea
            className={textarea}
            rows={3}
            value={value.aboutDescription}
            onChange={(e) => set("aboutDescription", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={label}>Image</label>
            <input className={field} value={value.aboutImage} onChange={(e) => set("aboutImage", e.target.value)} />
          </div>
          <div>
            <label className={label}>Video URL (optional)</label>
            <input className={field} value={value.videoUrl} onChange={(e) => set("videoUrl", e.target.value)} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <h2 className="text-[16px] font-semibold">Process</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={label}>Title</label>
            <input
              className={field}
              value={value.processTitle}
              onChange={(e) => set("processTitle", e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Image</label>
            <input
              className={field}
              value={value.processImage}
              onChange={(e) => set("processImage", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className={label}>Description</label>
          <textarea
            className={textarea}
            rows={2}
            value={value.processDescription}
            onChange={(e) => set("processDescription", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          {value.steps.map((step, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 border-t border-[#eee] pt-4">
              <div>
                <label className={label}>Step {index + 1} Title</label>
                <input
                  className={field}
                  value={step.title}
                  onChange={(e) => {
                    const steps = [...value.steps];
                    steps[index] = { ...steps[index], title: e.target.value };
                    set("steps", steps);
                  }}
                />
              </div>
              <div>
                <label className={label}>Step {index + 1} Description</label>
                <input
                  className={field}
                  value={step.description}
                  onChange={(e) => {
                    const steps = [...value.steps];
                    steps[index] = { ...steps[index], description: e.target.value };
                    set("steps", steps);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <h2 className="text-[16px] font-semibold">Specialization</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={label}>Title</label>
            <input
              className={field}
              value={value.specializationTitle}
              onChange={(e) => set("specializationTitle", e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Image</label>
            <input
              className={field}
              value={value.specializationImage}
              onChange={(e) => set("specializationImage", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className={label}>Description</label>
          <textarea
            className={textarea}
            rows={2}
            value={value.specializationDescription}
            onChange={(e) => set("specializationDescription", e.target.value)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <h2 className="text-[16px] font-semibold">Portfolio & Call To Action</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={label}>Portfolio Section Title</label>
            <input
              className={field}
              value={value.projectTitle}
              onChange={(e) => set("projectTitle", e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Services Section Image</label>
            <input
              className={field}
              value={value.servicesImage}
              onChange={(e) => set("servicesImage", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className={label}>Contact CTA Title</label>
          <input className={field} value={value.ctaTitle} onChange={(e) => set("ctaTitle", e.target.value)} />
        </div>
      </section>

      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold">Services</h2>
          <button
            type="button"
            onClick={() => set("services", [...value.services, { title: "", description: "" }])}
            className="text-[12px] text-[#ff7e44] hover:underline"
          >
            + Add service
          </button>
        </div>
        {value.services.map((service, index) => (
          <div key={index} className="grid grid-cols-[1fr_2fr_auto] gap-3 border-t border-[#eee] pt-4">
            <input
              className={field}
              placeholder="Title"
              value={service.title}
              onChange={(e) => {
                const services = [...value.services];
                services[index] = { ...services[index], title: e.target.value };
                set("services", services);
              }}
            />
            <input
              className={field}
              placeholder="Description"
              value={service.description}
              onChange={(e) => {
                const services = [...value.services];
                services[index] = { ...services[index], description: e.target.value };
                set("services", services);
              }}
            />
            <button
              type="button"
              onClick={() => set("services", value.services.filter((_, i) => i !== index))}
              className="text-[12px] text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold">Testimonials</h2>
          <button
            type="button"
            onClick={() => set("testimonials", [...value.testimonials, { name: "", role: "", quote: "" }])}
            className="text-[12px] text-[#ff7e44] hover:underline"
          >
            + Add testimonial
          </button>
        </div>
        {value.testimonials.map((testimonial, index) => (
          <div key={index} className="grid grid-cols-2 gap-3 border-t border-[#eee] pt-4">
            <input
              className={field}
              placeholder="Name"
              value={testimonial.name}
              onChange={(e) => {
                const testimonials = [...value.testimonials];
                testimonials[index] = { ...testimonials[index], name: e.target.value };
                set("testimonials", testimonials);
              }}
            />
            <input
              className={field}
              placeholder="Role"
              value={testimonial.role}
              onChange={(e) => {
                const testimonials = [...value.testimonials];
                testimonials[index] = { ...testimonials[index], role: e.target.value };
                set("testimonials", testimonials);
              }}
            />
            <textarea
              className={`${textarea} col-span-2`}
              rows={2}
              placeholder="Quote"
              value={testimonial.quote}
              onChange={(e) => {
                const testimonials = [...value.testimonials];
                testimonials[index] = { ...testimonials[index], quote: e.target.value };
                set("testimonials", testimonials);
              }}
            />
            <button
              type="button"
              onClick={() => set("testimonials", value.testimonials.filter((_, i) => i !== index))}
              className="col-span-2 text-left text-[12px] text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold">Client Names</h2>
          <button
            type="button"
            onClick={() => set("clients", [...value.clients, ""])}
            className="text-[12px] text-[#ff7e44] hover:underline"
          >
            + Add client
          </button>
        </div>
        {value.clients.map((client, index) => (
          <div key={index} className="flex gap-3">
            <input
              className={field}
              value={client}
              onChange={(e) => {
                const clients = [...value.clients];
                clients[index] = e.target.value;
                set("clients", clients);
              }}
            />
            <button
              type="button"
              onClick={() => set("clients", value.clients.filter((_, i) => i !== index))}
              className="text-[12px] text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      {error && <p className="text-[13px] text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="h-[46px] w-fit bg-[#191919] px-8 text-[11px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#ff7e44] disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Content"}
      </button>
    </form>
  );
}
