import Link from "next/link";
import { adminRead } from "@/lib/server/admin";
import type { ManagedProject } from "@/lib/server/repository";

export default async function AdminProjectsPage() {
  let projects: ManagedProject[];
  try {
    projects = (await adminRead("projects")) as ManagedProject[];
  } catch (error) {
    return <p className="text-[14px] text-[#7a7a7a]">{error instanceof Error ? error.message : "Access denied."}</p>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[24px] font-semibold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex h-[40px] items-center bg-[#191919] px-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#ff7e44]"
        >
          New Project
        </Link>
      </div>

      <div className="overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#f0f0f0] text-[11px] uppercase tracking-[0.06em] text-[#7a7a7a]">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-[#eee]">
                <td className="px-4 py-3 font-medium">{project.title}</td>
                <td className="px-4 py-3 text-[#7a7a7a]">{project.category}</td>
                <td className="px-4 py-3 capitalize text-[#7a7a7a]">{project.status}</td>
                <td className="px-4 py-3 text-[#7a7a7a]">{project.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/projects/${project.id}`} className="text-[#ff7e44] hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-[#999]">
                  No projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
