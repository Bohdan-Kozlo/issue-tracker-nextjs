"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function GoogleCallbackPage() {
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        const storedState = localStorage.getItem("googleAuthState");

        if (!state || state !== storedState) {
          setStatus("error");
          setError("Invalid state parameter. Authentication failed.");
          toast.error("Authentication failed. Please try again.");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        localStorage.removeItem("googleAuthState");

        if (!code) {
          setStatus("error");
          setError("Authentication code missing");
          toast.error("Authentication failed. Please try again.");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        const response = await fetch("/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!data.success) {
          setStatus("error");
          setError(data.message || "Authentication failed");
          toast.error(data.message || "Authentication failed");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        setStatus("success");
        toast.success("Authentication successful!");
        setTimeout(() => router.push("/dashboard"), 1000);
      } catch (err) {
        console.error("Error handling Google callback:", err);
        setStatus("error");
        setError("Unexpected error during authentication");
        toast.error("Authentication failed. Please try again.");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="bg-white/10 p-8 rounded-xl shadow-xl border border-white/20 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">
          {status === "loading" && "Processing Google Login..."}
          {status === "success" && "Login Successful!"}
          {status === "error" && "Authentication Failed"}
        </h2>

        {status === "loading" && (
          <div className="flex justify-center">
            <svg
              className="animate-spin h-10 w-10 text-[#ff6600]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        )}

        {status === "success" && (
          <p className="text-green-400">Redirecting to dashboard...</p>
        )}

        {status === "error" && (
          <div>
            <p className="text-red-400 mb-4">{error}</p>
            <p className="text-gray-400">Redirecting to login page...</p>
          </div>
        )}
      </div>
    </div>
  );
}
