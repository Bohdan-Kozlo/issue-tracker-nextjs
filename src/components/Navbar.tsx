"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#ff6600] to-[#ffae42] rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#ff6600] to-[#ffae42] bg-clip-text text-transparent">
              Issue Tracker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-[#ffae42] transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-[#ffae42] transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/issues"
              className="text-gray-300 hover:text-[#ffae42] transition-colors duration-200 font-medium"
            >
              Issues
            </Link>
            <Link
              href="/issues/new"
              className="text-gray-300 hover:text-[#ffae42] transition-colors duration-200 font-medium"
            >
              New Issue
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff6600] to-[#ffae42] hover:from-[#ffae42] hover:to-[#ff6600] text-white font-medium transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </Link>
          </div>

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
        </div>

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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
