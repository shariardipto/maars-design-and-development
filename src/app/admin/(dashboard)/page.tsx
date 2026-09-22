import { adminRead } from "@/lib/server/admin";

type DashboardStats = {
  projects: number;
  drafts: number;
  enquiries: number | null;
  users: number | null;
};

export default async function AdminDashboardPage() {
  const stats = (await adminRead("dashboard")) as DashboardStats;

  const cards = [
    { label: "Published Projects", value: stats.projects },
    { label: "Drafts", value: stats.drafts },
    { label: "New Enquiries", value: stats.enquiries },
    { label: "Active Users", value: stats.users },
  ].filter((card) => card.value !== null);

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-semibold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-6 shadow-sm">
            <div className="text-[32px] font-bold text-[#ff7e44]">{card.value}</div>
            <div className="mt-1 text-[12px] uppercase tracking-[0.08em] text-[#7a7a7a]">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
