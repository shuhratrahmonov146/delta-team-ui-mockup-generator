interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`w-full bg-[#1283BB] rounded-[18px] p-6 sm:p-7 md:p-8 text-white flex flex-col h-full ${className}`}
    >
      <h3 className="font-dm-sans font-extrabold text-xl sm:text-2xl leading-snug tracking-tight mb-4 sm:mb-6">
        {title}
      </h3>
      <p className="text-sm sm:text-base lg:text-[18px] leading-relaxed flex-grow">
        {description}
      </p>
    </div>
  );
}
