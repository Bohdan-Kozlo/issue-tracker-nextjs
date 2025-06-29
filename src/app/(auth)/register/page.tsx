import Link from "next/link";
import PasswordField from "@/components/PasswordField";
import EmailField from "@/components/EmailField";
import GoogleReg from "@/components/GoogleReg";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-radial from-[#ff6600]/20 via-[#ff6600]/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-radial from-[#ffae42]/15 via-[#ffae42]/3 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Registration form */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ff6600] to-[#ffae42] bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">Join Issue Tracker today</p>
          </div>

          {/* Registration form */}
          <form className="space-y-6">
            {/* Username field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
              />
            </div>

            {/* Email field */}
            <EmailField />

            {/* Password field */}
            <PasswordField />

            {/* Register button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff6600] to-[#ffae42] hover:from-[#ffae42] hover:to-[#ff6600] text-white font-semibold shadow-lg hover:shadow-[#ff6600]/25 transition-all duration-300 transform hover:scale-105"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Google registration */}
          <GoogleReg />

          {/* Login link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#ffae42] hover:text-[#ff6600] font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
