import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Admin Sign In" };

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#191919] px-6">
      <div className="flex w-full max-w-[800px] flex-col items-center">
        <h1 className="mb-8 text-[40px] font-bold text-white text-center">MAARS Design and Developments LTD.</h1>
        <h1 className="mb-8 text-[25px] font-bold text-white text-center">Admin Login</h1>
        <LoginForm />
      </div>
    </main>
  );
}
