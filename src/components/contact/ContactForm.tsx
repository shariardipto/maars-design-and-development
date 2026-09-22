"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Something went wrong.");

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-[#ff7e44]/30 bg-[#fff4ef] p-8 text-[14px] text-[#191919]">
        Thanks for reaching out — we&apos;ll get back to you within one business day.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Honeypot: real visitors never see or fill this in. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#7a7a7a]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="h-[50px] w-full border border-[#e5e5e5] bg-transparent px-4 text-[14px] outline-none transition-colors focus:border-[#ff7e44]"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#7a7a7a]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="h-[50px] w-full border border-[#e5e5e5] bg-transparent px-4 text-[14px] outline-none transition-colors focus:border-[#ff7e44]"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#7a7a7a]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="w-full resize-none border border-[#e5e5e5] bg-transparent px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#ff7e44]"
        />
      </div>

      {status === "error" && <p className="text-[13px] text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-[50px] w-fit items-center justify-center bg-[#191919] px-9 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#ff7e44] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Now"}
      </button>
    </form>
  );
}
