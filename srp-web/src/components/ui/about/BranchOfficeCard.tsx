import { useState } from "react";
import { BranchOffice } from "@/data/about/offices";
import Image from "next/image";
import { MapPin } from "lucide-react";

export const BranchOfficeCard = ({ branch }: { branch: BranchOffice }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center max-w-6xl 4xl:max-w-7xl mx-auto w-full">
      <h2 className="text-white text-4xl md:text-8xl lg:text-[110px] font-bold text-center mb-12 md:mb-16 tracking-tight">
        {branch.name}
      </h2>

      <div className="w-full aspect-[16/9] relative rounded-2xl overflow-hidden mb-8 bg-[#13172E]">
        <Image
          src={branch.image}
          alt={branch.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="w-full bg-[#1283BB] rounded-2xl p-6 md:p-14 flex flex-col items-start text-left">
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs md:text-sm font-medium mb-6 md:mb-8 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-pointer group/map"
        >
          <MapPin />

          <span className="group-hover/map:underline">{branch.location}</span>
        </a>

        <h3 className="text-white text-2xl md:text-6xl font-bold mb-4 md:mb-8">
          {branch.name}
        </h3>

        <div className="text-white text-sm md:text-xl lg:text-2xl leading-relaxed max-w-5xl">
          <p className="md:hidden">
            {isExpanded ? branch.text : `${branch.text.slice(0, 100)}...`}
          </p>
          <p className="hidden md:block">{branch.text}</p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden mt-4 text-white font-regular underline"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};
