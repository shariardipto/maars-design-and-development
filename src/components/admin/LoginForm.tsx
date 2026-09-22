"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Sign in failed.");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : "Sign in failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[360px] flex-col gap-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-[11px] uppercase tracking-[0.08em] text-white/50">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="h-[46px] w-full border border-white/15 bg-white/5 px-4 text-[14px] text-white outline-none focus:border-[#ff7e44]"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-[11px] uppercase tracking-[0.08em] text-white/50">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="h-[46px] w-full border border-white/15 bg-white/5 px-4 text-[14px] text-white outline-none focus:border-[#ff7e44]"
        />
      </div>

      {error && <p className="text-[13px] text-[#ff9c7a]">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="h-[46px] bg-[#ff7e44] text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[#191919] disabled:opacity-60"
      >
        {submitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
