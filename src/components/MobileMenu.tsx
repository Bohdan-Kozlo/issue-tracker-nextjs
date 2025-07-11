"use client";

import Link from "next/link";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

interface MobileMenuProps {
  user: { name: string } | null;
}

export default function MobileMenu({ user }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        <svg
          className={`w-6 h-6 transition-transform duration-200 ${
            isMenuOpen ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#16213e]/50 rounded-lg mt-2 backdrop-blur-sm border border-white/10">
          <Link
            href="/"
            className="block px-3 py-2 rounded-lg text-gray-300 hover:text-[#ffae42] hover:bg-white/10 transition-all duration-200 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded-lg text-gray-300 hover:text-[#ffae42] hover:bg-white/10 transition-all duration-200 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/issues"
            className="block px-3 py-2 rounded-lg text-gray-300 hover:text-[#ffae42] hover:bg-white/10 transition-all duration-200 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Issues
          </Link>
          <Link
            href="/issues/new"
            className="block px-3 py-2 rounded-lg text-gray-300 hover:text-[#ffae42] hover:bg-white/10 transition-all duration-200 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            New Issue
          </Link>
          <div className="border-t border-white/20 pt-3 mt-3 space-y-1">
            {user ? (
              <>
                <div className="block px-3 py-2 rounded-lg text-gray-300 font-medium">
                  {user.name}
                </div>
                <div onClick={() => setIsMenuOpen(false)}>
                  <LogoutButton />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 rounded-lg bg-gradient-to-r from-[#ff6600] to-[#ffae42] text-white font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
