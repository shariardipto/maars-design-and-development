import { adminRead } from "@/lib/server/admin";
import EnquiriesTable, { type Enquiry } from "@/components/admin/EnquiriesTable";
import { currentUser } from "@/lib/server/auth";

export default async function AdminEnquiriesPage() {
  const user = await currentUser();
  let enquiries: Enquiry[];
  try {
    enquiries = (await adminRead("enquiries")) as Enquiry[];
  } catch (error) {
    return <p className="text-[14px] text-[#7a7a7a]">{error instanceof Error ? error.message : "Access denied."}</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-semibold">Enquiries</h1>
      <EnquiriesTable enquiries={enquiries} canEdit={user?.permissions.includes("enquiries.write")} />
    </div>
  );
}
