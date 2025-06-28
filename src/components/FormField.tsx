import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}

export default function FormField({
  label,
  required = false,
  children,
  hint,
}: FormFieldProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-sm text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
