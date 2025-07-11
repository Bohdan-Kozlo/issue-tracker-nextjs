/**
 * Utility classes for common styling patterns throughout the application
 */

// Primary gradient colors used throughout the app
export const gradientColors = {
  primary: "from-[#ff6600] to-[#ffae42]",
  primaryHover: "hover:from-[#ffae42] hover:to-[#ff6600]",
} as const;

// Common button styles
export const buttonStyles = {
  primary: `
    bg-gradient-to-r ${gradientColors.primary} ${gradientColors.primaryHover} 
    text-white font-medium transition-all duration-300 transform hover:scale-105
  `,
  primaryLarge: `
    bg-gradient-to-r ${gradientColors.primary} ${gradientColors.primaryHover} 
    text-white font-semibold shadow-lg hover:shadow-[#ff6600]/25 
    transition-all duration-300 transform hover:scale-105
  `,
  primaryDisabled: `
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
} as const;

// Common text gradient for headings
export const textGradient = `
  bg-gradient-to-r ${gradientColors.primary} bg-clip-text text-transparent
`;

// Glass morphism effect
export const glassMorphism = `
  bg-white/5 backdrop-blur-sm border border-white/10
`;

// Common layout patterns
export const containerStyles = {
  card: `${glassMorphism} rounded-2xl p-8`,
  cardSmall: `${glassMorphism} rounded-xl p-6`,
  cardCompact: `${glassMorphism} rounded-lg p-4`,
} as const;

// Status badge styles
export const statusStyles = {
  open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  in_progress: "bg-[#ff6600]/20 text-[#ffae42] border-[#ff6600]/30",
  closed: "bg-green-500/20 text-green-400 border-green-500/30",
  default: "bg-gray-500/20 text-gray-400 border-gray-500/30",
} as const;

// Priority styles
export const priorityStyles = {
  high: "text-red-400",
  medium: "text-[#ffae42]",
  low: "text-green-400",
  default: "text-gray-400",
} as const;

// Input field styles
export const inputStyles = `
  w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
  text-white placeholder-gray-400 
  focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent 
  transition-all duration-200
`;

// Common utility functions
export const getStatusStyles = (status: string) => {
  const normalizedStatus = status
    .toLowerCase()
    .replace(" ", "_") as keyof typeof statusStyles;
  return statusStyles[normalizedStatus] || statusStyles.default;
};

export const getPriorityStyles = (priority: string) => {
  const normalizedPriority =
    priority.toLowerCase() as keyof typeof priorityStyles;
  return priorityStyles[normalizedPriority] || priorityStyles.default;
};
