"use client";

import { useState } from "react";

const filters = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "in-progress", label: "In Progress" },
  { key: "closed", label: "Closed" },
];

export default function StatusFilterButtons() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeFilter === filter.key
                ? "bg-[#ff6600] text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
