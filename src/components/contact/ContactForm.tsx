"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="border border-[#ff7844]/30 bg-[#fff4ef] p-8 text-[14px] text-[#161616]">
        Thanks for reaching out — we&apos;ll get back to you within one business day.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#777]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="h-[50px] w-full border border-[#e5e5e5] bg-transparent px-4 text-[14px] outline-none transition-colors focus:border-[#ff7844]"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#777]">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="h-[50px] w-full border border-[#e5e5e5] bg-transparent px-4 text-[14px] outline-none transition-colors focus:border-[#ff7844]"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-[11px] uppercase tracking-[0.08em] text-[#777]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none border border-[#e5e5e5] bg-transparent px-4 py-3 text-[14px] outline-none transition-colors focus:border-[#ff7844]"
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-[50px] w-fit items-center justify-center bg-[#161616] px-9 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#ff7844]"
      >
        Send Now
      </button>
    </form>
  );
}
