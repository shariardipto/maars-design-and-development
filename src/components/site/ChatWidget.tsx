"use client";

import { useState, type FormEvent } from "react";
import type { SiteSettings } from "@/lib/config";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  if (!settings.chatEnabled) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = input.trim();
    if (!message || sending) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setInput("");
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const payload = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok) throw new Error(payload.error || "The assistant could not answer.");
      setMessages((prev) => [...prev, { role: "assistant", content: payload.reply || "" }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The assistant could not answer.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-[92px] z-40 flex flex-col items-end">
      {open && (
        <div className="mb-4 flex h-[420px] w-[320px] flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#191919] px-4 py-3 text-white">
            <span className="text-[13px] font-semibold">{settings.chatTitle}</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="text-lg leading-none">
              ×
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-[13px]">
            <p className="rounded bg-[#f5f5f5] px-3 py-2 text-[#444]">{settings.chatWelcome}</p>
            {messages.map((message, index) => (
              <p
                key={index}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-[85%] rounded bg-[#ff7e44] px-3 py-2 text-white"
                    : "max-w-[85%] rounded bg-[#f5f5f5] px-3 py-2 text-[#444]"
                }
              >
                {message.content}
              </p>
            ))}
            {error && <p className="text-red-600">{error}</p>}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-[#eee] p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type a message..."
              className="h-[38px] flex-1 border border-[#e5e5e5] px-3 text-[13px] outline-none focus:border-[#ff7e44]"
            />
            <button
              type="submit"
              disabled={sending}
              className="h-[38px] bg-[#191919] px-4 text-[11px] font-semibold uppercase text-white disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#191919] text-white shadow-lg transition-transform hover:scale-105"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
          <path d="M4 4h16v11H7l-3 3V4Z" />
        </svg>
      </button>
    </div>
  );
}
