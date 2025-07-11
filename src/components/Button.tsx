import { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonStyles } from "@/lib/styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "transition-all duration-200 rounded-xl";

  const variantClasses = {
    primary: `${buttonStyles.primary} ${buttonStyles.primaryDisabled}`,
    secondary:
      "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/20",
    danger:
      "bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
