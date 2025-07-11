import Link from "next/link";
import { getCurrentUser } from "@/server-actions/auth";
import LogoutButton from "./LogoutButton";
import MobileMenu from "./MobileMenu";
import { textGradient, buttonStyles } from "@/lib/styles";

export default async function Navbar() {
  const user = await getCurrentUser();

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
            <span className={`text-xl font-bold ${textGradient}`}>
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

          {/* Auth buttons / User info */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-300 font-medium">{user.name}</span>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className={`px-4 py-2 rounded-lg ${buttonStyles.primary}`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu component */}
          <MobileMenu user={user} />
        </div>
      </div>
    </nav>
  );
}
