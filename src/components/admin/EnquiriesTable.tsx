"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminPost } from "@/lib/admin-client";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "in-progress" | "closed";
  created_at: string;
};

export default function EnquiriesTable({ enquiries, canEdit = false }: { enquiries: Enquiry[]; canEdit?: boolean }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function updateStatus(id: string, status: Enquiry["status"]) {
    setPendingId(id);
    setError("");
    try {
      await adminPost("enquiries", id, { status });
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to update this enquiry.");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {error && <p role="alert" className="text-red-700">{error}</p>}
      {enquiries.map((enquiry) => (
        <div key={enquiry.id} className="bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-[14px] font-semibold">{enquiry.name}</div>
              <div className="text-[12px] text-[#7a7a7a]">{enquiry.email}</div>
              <div className="text-[11px] text-[#999]">{enquiry.created_at} UTC</div>
            </div>

            <select
              value={enquiry.status}
              aria-label={`Status for ${enquiry.name}`}
              disabled={!canEdit || pendingId !== null}
              onChange={(event) => updateStatus(enquiry.id, event.target.value as Enquiry["status"])}
              className="h-[36px] border border-[#e5e5e5] px-2 text-[12px]"
            >
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <p className="mt-4 text-[13px] leading-[1.7] text-[#444]">{enquiry.message}</p>
        </div>
      ))}

      {enquiries.length === 0 && <p className="text-[13px] text-[#999]">No enquiries yet.</p>}
    </div>
  );
}
