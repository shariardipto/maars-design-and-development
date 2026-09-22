"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminPost } from "@/lib/admin-client";
import type { IntegrationSettings } from "@/lib/config";

type IntegrationStatus = { chatbot: boolean; whatsapp: boolean; webhook: boolean };

const field = "h-[42px] w-full border border-[#e5e5e5] px-3 text-[13px] outline-none focus:border-[#ff7e44]";
const label = "mb-1 block text-[11px] uppercase tracking-[0.06em] text-[#7a7a7a]";

function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] ${
        ok ? "bg-[#e8f7ee] text-[#1f9254]" : "bg-[#f5f5f5] text-[#999]"
      }`}
    >
      <span className={`h-[6px] w-[6px] rounded-full ${ok ? "bg-[#1f9254]" : "bg-[#bbb]"}`} />
      {label}: {ok ? "Configured" : "Not configured"}
    </span>
  );
}

export default function IntegrationsForm({
  integrations,
  status,
  canEdit = false,
}: {
  integrations: IntegrationSettings;
  status: IntegrationStatus;
  canEdit?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState<IntegrationSettings>(integrations);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [testResult, setTestResult] = useState<{ provider: string; message: string; ok: boolean } | null>(null);

  function set<K extends keyof IntegrationSettings>(key: K, next: IntegrationSettings[K]) {
    setValue((current) => ({ ...current, [key]: next }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await adminPost("integrations", undefined, value);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save integrations.");
    } finally {
      setSaving(false);
    }
  }

  async function handleTest(provider: "whatsapp" | "chatbot") {
    setTestResult(null);
    try {
      const result = (await adminPost("integrations", "test", { provider })) as { ok: boolean; message: string };
      setTestResult({ provider, ok: result.ok, message: result.message });
    } catch (err) {
      setTestResult({ provider, ok: false, message: err instanceof Error ? err.message : "Test failed." });
    }
  }

  return (
    <div className="flex max-w-[720px] flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <StatusBadge ok={status.chatbot} label="Chatbot" />
        <StatusBadge ok={status.whatsapp} label="WhatsApp API" />
        <StatusBadge ok={status.webhook} label="WhatsApp Webhook" />
      </div>
      <p className="text-[12px] text-[#999]">
        API keys and secrets are set as server environment variables (see <code>.env.example</code>), never here —
        this page only configures which model/phone number to use.
      </p>

      <form onSubmit={handleSubmit}><fieldset disabled={!canEdit || saving} className="flex flex-col gap-10">
        <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">Chatbot</h2>
            <button
              type="button"
              onClick={() => handleTest("chatbot")}
              className="text-[12px] text-[#ff7e44] hover:underline"
            >
              Test Connection
            </button>
          </div>
          <div>
            <label className={label}>Model</label>
            <input
              className={field}
              placeholder="gpt-5"
              value={value.chatbotModel}
              onChange={(e) => set("chatbotModel", e.target.value)}
            />
          </div>
          <div>
            <label className={label}>Instructions</label>
            <textarea
              className="w-full resize-none border border-[#e5e5e5] p-3 text-[13px] outline-none focus:border-[#ff7e44]"
              rows={4}
              value={value.chatbotInstructions}
              onChange={(e) => set("chatbotInstructions", e.target.value)}
            />
          </div>
        </section>

        <section className="flex flex-col gap-4 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">WhatsApp Business API</h2>
            <button
              type="button"
              onClick={() => handleTest("whatsapp")}
              className="text-[12px] text-[#ff7e44] hover:underline"
            >
              Test Connection
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={label}>Phone Number ID</label>
              <input
                className={field}
                value={value.whatsappPhoneId}
                onChange={(e) => set("whatsappPhoneId", e.target.value)}
              />
            </div>
            <div>
              <label className={label}>Graph API Version</label>
              <input
                className={field}
                value={value.whatsappApiVersion}
                onChange={(e) => set("whatsappApiVersion", e.target.value)}
              />
            </div>
          </div>
        </section>

        {testResult && (
          <p className={`text-[13px] ${testResult.ok ? "text-[#1f9254]" : "text-red-600"}`}>
            {testResult.provider}: {testResult.message}
          </p>
        )}
        {error && <p className="text-[13px] text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="h-[46px] w-fit bg-[#191919] px-8 text-[11px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#ff7e44] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Integrations"}
        </button>
      </fieldset></form>
    </div>
  );
}
