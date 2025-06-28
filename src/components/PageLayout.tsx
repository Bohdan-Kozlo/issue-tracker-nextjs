import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function PageLayout({
  children,
  className = "",
}: PageLayoutProps) {
  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-20 px-4 ${className}`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
        <div className="absolute top-40 right-20 w-64 h-64 bg-gradient-radial from-[#ff6600]/10 via-[#ff6600]/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">{children}</div>
    </main>
  );
}
