import { adminRead } from "@/lib/server/admin";

type AuditRow = {
  id: number;
  actor: string;
  actor_name: string;
  action: string;
  target: string;
  created_at: string;
};

export default async function AdminAuditPage() {
  let rows: AuditRow[];
  try {
    rows = (await adminRead("audit")) as AuditRow[];
  } catch (error) {
    return <p className="text-[14px] text-[#7a7a7a]">{error instanceof Error ? error.message : "Access denied."}</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-semibold">Audit Log</h1>

      <div className="overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#f0f0f0] text-[11px] uppercase tracking-[0.06em] text-[#7a7a7a]">
            <tr>
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Actor</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Target</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[#eee]">
                <td className="px-4 py-3 text-[#7a7a7a]">{new Date(row.created_at).toLocaleString()}</td>
                <td className="px-4 py-3">{row.actor_name}</td>
                <td className="px-4 py-3">{row.action}</td>
                <td className="px-4 py-3 text-[#7a7a7a]">{row.target}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-[#999]">
                  No activity yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
