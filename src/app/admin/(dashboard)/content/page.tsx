import { adminRead } from "@/lib/server/admin";
import ContentForm from "@/components/admin/ContentForm";
import type { SiteContent } from "@/lib/config";

export default async function AdminContentPage() {
  let content: SiteContent;
  try {
    content = (await adminRead("content")) as SiteContent;
  } catch (error) {
    return <p className="text-[14px] text-[#7a7a7a]">{error instanceof Error ? error.message : "Access denied."}</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-semibold">Site Content</h1>
      <ContentForm content={content} />
    </div>
  );
}
