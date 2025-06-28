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
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ff6600] to-[#ffae42] bg-clip-text text-transparent mb-2">
        {title}
      </h1>
      {subtitle && <p className="text-gray-400 text-lg">{subtitle}</p>}
    </div>
  );
}
