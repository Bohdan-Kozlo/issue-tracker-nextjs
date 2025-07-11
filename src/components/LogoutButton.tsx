"use client";

import { logout } from "@/server-actions/auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { buttonStyles } from "@/lib/styles";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await logout();
      router.push("/login");
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      type="button"
      className={`px-4 py-2 rounded-lg ${buttonStyles.primary} ${buttonStyles.primaryDisabled}`}
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
