import { textGradient } from "@/lib/styles";

interface GradientHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function GradientHeading({
  title,
  subtitle,
  className = "",
}: GradientHeadingProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className={`text-4xl font-bold mb-2 ${textGradient}`}>{title}</h1>
      {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
    </div>
  );
}
