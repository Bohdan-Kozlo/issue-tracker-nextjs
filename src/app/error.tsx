"use client";

import { useEffect } from "react";
import Button from "@/components/Button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            Something went wrong
          </h1>

          <p className="text-gray-400 mb-6">
            We apologize for the inconvenience. The issue has been logged and
            we&apos;re working to fix it.
          </p>

          <div className="flex gap-4">
            <Button variant="primary" onClick={() => reset()} className="px-6">
              Try again
            </Button>

            <Button
              variant="secondary"
              onClick={() => (window.location.href = "/dashboard")}
              className="px-6"
            >
              Go to dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
