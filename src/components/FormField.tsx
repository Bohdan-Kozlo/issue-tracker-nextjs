import { ReactNode } from "react";

export interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
  error?: string;
}

export default function FormField({
  label,
  required = false,
  children,
  hint,
  error,
}: FormFieldProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-sm text-gray-400 mt-1">{hint}</p>}
      {error && (
        <p className="text-sm text-red-400 mt-1 animate-fade-in">{error}</p>
      )}
    </div>
  );
}
