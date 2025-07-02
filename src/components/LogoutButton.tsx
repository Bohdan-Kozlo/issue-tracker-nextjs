"use client";

import { logout } from "@/app/server-actions/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LogoutButton() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await logout();
    });
    router.push("/login");
  };

  return (
    <>
      <button
        onClick={handleLogout}
        type="submit"
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff6600] to-[#ffae42] hover:from-[#ffae42] hover:to-[#ff6600] text-white font-medium transition-all duration-300 transform hover:scale-105"
      >
        Logout
      </button>
    </>
  );
}
