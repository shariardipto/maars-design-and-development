"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminPost } from "@/lib/admin-client";
import type { ManagedProject } from "@/lib/server/repository";

export default function ProjectForm({
  project,
  media,
}: {
  project?: ManagedProject;
  media: string[];
}) {
  const router = useRouter();
  const [cover, setCover] = useState(project?.cover || media[0] || "");
  const [gallery, setGallery] = useState<string[]>(project?.gallery || []);
  const [status, setStatus] = useState(project?.status || "draft");
  const [featured, setFeatured] = useState(project?.featured || false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function toggleGalleryImage(path: string) {
    setGallery((current) =>
      current.includes(path) ? current.filter((item) => item !== path) : [...current, path],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const data = new FormData(event.currentTarget);

    try {
      await adminPost("projects", project?.id, {
        slug: data.get("slug"),
        title: data.get("title"),
        category: data.get("category"),
        cover,
        gallery,
        location: data.get("location"),
        year: data.get("year"),
        description: data.get("description"),
        status,
        featured,
        sortOrder: Number(data.get("sortOrder")),
      });
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save this project.");
      setSaving(false);
    }
  }

  const field = "h-[42px] w-full border border-[#e5e5e5] px-3 text-[13px] outline-none focus:border-[#ff7e44]";
  const label = "mb-1 block text-[11px] uppercase tracking-[0.06em] text-[#7a7a7a]";

  return (
    <form onSubmit={handleSubmit} className="flex max-w-[720px] flex-col gap-6 bg-white p-8 shadow-sm">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={label}>Title</label>
          <input name="title" defaultValue={project?.title} required className={field} />
        </div>
        <div>
          <label className={label}>Slug</label>
          <input
            name="slug"
            defaultValue={project?.slug}
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Lowercase letters, numbers and hyphens only."
            className={field}
          />
        </div>
        <div>
          <label className={label}>Category</label>
          <input name="category" defaultValue={project?.category} required className={field} />
        </div>
        <div>
          <label className={label}>Location</label>
          <input name="location" defaultValue={project?.location} className={field} />
        </div>
        <div>
          <label className={label}>Year</label>
          <input name="year" defaultValue={project?.year} required pattern="\d{4}" className={field} />
        </div>
        <div>
          <label className={label}>Sort Order</label>
          <input
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={project?.sortOrder ?? 0}
            required
            className={field}
          />
        </div>
      </div>

      <div>
        <label className={label}>Description</label>
        <textarea
          name="description"
          defaultValue={project?.description}
          required
          rows={4}
          className="w-full resize-none border border-[#e5e5e5] p-3 text-[13px] outline-none focus:border-[#ff7e44]"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={label}>Status</label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as typeof status)}
            className={field}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <label className="flex items-end gap-2 pb-2 text-[13px]">
          <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
          Featured on homepage
        </label>
      </div>

      <div>
        <label className={label}>Cover Image</label>
        <div className="grid max-h-[220px] grid-cols-4 gap-2 overflow-y-auto border border-[#e5e5e5] p-2">
          {media.map((path) => (
            <button
              type="button"
              key={path}
              onClick={() => setCover(path)}
              className={`truncate border p-1 text-left text-[10px] ${cover === path ? "border-[#ff7e44] text-[#ff7e44]" : "border-transparent text-[#7a7a7a]"}`}
            >
              {path.split("/").pop()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={label}>Gallery Images</label>
        <div className="grid max-h-[220px] grid-cols-4 gap-2 overflow-y-auto border border-[#e5e5e5] p-2">
          {media.map((path) => (
            <label key={path} className="flex items-center gap-1 truncate text-[10px] text-[#7a7a7a]">
              <input
                type="checkbox"
                checked={gallery.includes(path)}
                onChange={() => toggleGalleryImage(path)}
              />
              {path.split("/").pop()}
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-[13px] text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="h-[46px] w-fit bg-[#191919] px-8 text-[11px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#ff7e44] disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}
