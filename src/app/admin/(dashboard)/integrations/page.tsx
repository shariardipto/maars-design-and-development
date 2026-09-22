import { adminRead } from "@/lib/server/admin";
import IntegrationsForm from "@/components/admin/IntegrationsForm";
import type { IntegrationSettings } from "@/lib/config";
import { currentUser } from "@/lib/server/auth";

export default async function AdminIntegrationsPage() {
  const user = await currentUser();
  let data: IntegrationSettings & { status: { chatbot: boolean; whatsapp: boolean; webhook: boolean } };
  try {
    data = (await adminRead("integrations")) as typeof data;
  } catch (error) {
    return <p className="text-[14px] text-[#7a7a7a]">{error instanceof Error ? error.message : "Access denied."}</p>;
  }

  const { status, ...integrations } = data;

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-semibold">Integrations</h1>
      <IntegrationsForm integrations={integrations} status={status} canEdit={user?.permissions.includes("integrations.write")} />
    </div>
  );
}
