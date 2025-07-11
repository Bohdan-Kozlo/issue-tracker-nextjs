import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#ff6600]/20 to-[#ffae42]/10 rounded-3xl rotate-45 animate-pulse" />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#ffae42]/15 to-[#ff6600]/5 rounded-2xl rotate-12 animate-bounce"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-to-br from-[#ff6600]/10 to-transparent rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Main decorative elements */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-radial from-[#ff6600]/30 via-[#ff6600]/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-radial from-[#ffae42]/25 via-[#ffae42]/8 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff6600]/5 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ffae42]/5 to-transparent"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-12">
        {/* Hero section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#ff6600]/10 border border-[#ff6600]/20 text-[#ffae42] text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-[#ff6600] rounded-full animate-pulse"></div>
            <span>Welcome to Issue Tracker</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#ff6600] via-[#ffae42] to-[#ff8c42] bg-clip-text text-transparent drop-shadow-2xl leading-tight">
            Issue Tracker
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            The modern way to manage your development tasks
          </p>

          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Create, organize, and control your issues in a beautiful and
            intuitive interface. Transform chaos into clarity.
          </p>
        </div>

        {/* CTA section */}
        <div className="space-y-6">
          <Link
            href="/register"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#ff6600] to-[#ffae42] hover:from-[#ffae42] hover:to-[#ff6600] text-white font-semibold text-lg shadow-2xl hover:shadow-[#ff6600]/25 transition-all duration-300 transform hover:scale-105"
          >
            Go to Start
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff6600] to-[#ffae42] rounded-xl mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              <h3 className="text-white font-semibold mb-2">Track Issues</h3>
              <p className="text-gray-400 text-sm">
                Create and manage issues with ease
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff6600] to-[#ffae42] rounded-xl mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Collaborate</h3>
              <p className="text-gray-400 text-sm">
                Work together on projects seamlessly
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff6600] to-[#ffae42] rounded-xl mb-4 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Analytics</h3>
              <p className="text-gray-400 text-sm">
                Track progress with detailed insights
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
