"use client";
import React, { useState } from "react";
import Image from "next/image";

interface StaffCardProps {
  title: string;
  description: string;
  imageName: string;
}

const StaffCard: React.FC<StaffCardProps> = ({
  title,
  description,
  imageName,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-[896px] bg-[#0078D4] text-white rounded-2xl p-6 md:p-8 mx-auto">
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between md:items-start gap-3 md:gap-5 ">
        <h2 className="order-2 md:order-1 w-full text-[18px] md:text-[24px] leading-[28px] md:leading-[32px] font-bold uppercase text-center mb-0 md:mb-4">
          {title}
        </h2>

        <div className="order-3 md:order-2 md:flex-1 md:max-w-[500px]">
          <p
            className={`text-[14px] md:text-[18px] leading-[28px] md:leading-[40px] font-medium text-white/90 transition-all duration-300 ${
              !isExpanded
                ? "max-[480px]:line-clamp-2 max-[480px]:overflow-hidden"
                : ""
            }`}
          >
            {description}
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="block min-[481px]:hidden mt-2 text-yellow-300 font-semibold text-sm hover:text-yellow-100 transition-colors"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        </div>

        <div className="order-1 md:order-3 flex-shrink-0 relative w-[200px] h-[200px] md:w-[280px] md:h-[280px] mx-auto md:mx-0">
          <Image
            src={`/icons/${imageName}`}
            alt={title}
            width={300}
            height={300}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
