"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
 const router=useRouter();const [error,setError]=useState("");const [busy,setBusy]=useState(false);
 async function logout(){setBusy(true);setError("");try{const response=await fetch("/api/auth/logout",{method:"POST"});if(!response.ok)throw new Error("Sign out failed. Please retry.");router.replace("/admin/login");router.refresh();}catch(error){setError(error instanceof Error?error.message:"Unable to sign out.");setBusy(false);}}
 return <><button disabled={busy} onClick={logout}>{busy?"Signing out…":"Sign out"}</button>{error&&<p role="alert">{error}</p>}</>;
}
