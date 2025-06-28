import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "textarea";
}

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200 ${className}`}
      {...props}
    />
  );
}

export function Textarea({
  className = "",
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200 resize-none ${className}`}
      {...props}
    />
  );
}

export function Select({
  className = "",
  children,
  ...props
}: InputHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <select
      className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
