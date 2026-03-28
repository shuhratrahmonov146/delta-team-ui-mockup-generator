import React from "react";
import Image from "next/image";

interface TechCardProps {
  title: string;
  subtitle: string;
  iconName: string;
}

const TechCard: React.FC<TechCardProps> = ({ title, subtitle, iconName }) => {
  return (
    <div className="w-full max-w-[280px] h-[220px] min-[560px]:w-[200px] min-[450px]:h-[200px] bg-white rounded-[16px] flex flex-col items-center justify-center p-4 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
      <div className="w-16 h-16 mb-4 relative">
        <Image
          src={`/icons/${iconName}`}
          alt={title}
          width={256}
          height={256}
          className="object-contain w-full h-full"
        />
      </div>

      <h3 className="text-[18px] font-bold text-gray-900 mb-2 text-center leading-tight">
        {title}
      </h3>
      <p className="text-[14px] text-gray-500 font-medium text-center leading-tight">
        {subtitle}
      </p>
    </div>
  );
};

export default TechCard;
