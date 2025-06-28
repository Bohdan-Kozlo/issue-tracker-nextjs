export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-radial from-[#ff6600]/20 via-[#ff6600]/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-radial from-[#ffae42]/15 via-[#ffae42]/3 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center">
        {/* Animated logo/icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-[#ff6600] border-r-[#ff6600] rounded-full animate-spin"></div>
            {/* Inner pulsing circle */}
            <div className="absolute inset-2 bg-gradient-to-br from-[#ff6600] to-[#ffae42] rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-8 h-8 text-white"
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
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ff6600] to-[#ffae42] bg-clip-text text-transparent mb-2">
            Issue Tracker
          </h2>
          <p className="text-gray-400 text-lg">Loading your workspace...</p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-[#ff6600] rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-[#ff8c42] rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-[#ffae42] rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#ff6600] to-[#ffae42] rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading messages */}
        <div className="mt-6">
          <p className="text-sm text-gray-500 animate-pulse">
            Preparing your dashboard...
          </p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 left-10 w-4 h-4 bg-[#ff6600]/30 rounded-full animate-ping"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-32 right-16 w-3 h-3 bg-[#ffae42]/40 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-24 left-16 w-5 h-5 bg-[#ff6600]/20 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-12 w-2 h-2 bg-[#ffae42]/50 rounded-full animate-ping"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Floating squares */}
        <div
          className="absolute top-1/4 left-1/6 w-6 h-6 border-2 border-[#ff6600]/20 rotate-45 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/6 w-4 h-4 border-2 border-[#ffae42]/30 rotate-12 animate-pulse"
          style={{ animationDelay: "1.2s" }}
        ></div>
      </div>
    </div>
  );
}
