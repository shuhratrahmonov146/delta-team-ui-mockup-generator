import Image from "next/image";
import { aboutValues } from "@/data/about/about";

export default function ValuesCard() {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-7xl mx-auto">
      {aboutValues.map((value, index) => (
        <div
          key={index}
          className="group relative flex flex-col rounded-2xl border border-[#1283BB]/30 overflow-hidden bg-[#05081C] transition-all duration-500 hover:border-[#1283BB]/60 hover:shadow-2xl hover:shadow-[#1283BB]/20 h-[300px] md:h-[380px] lg:w-[280px] lg:h-[280px] w-full max-w-[340px] md:max-w-none"
        >
          <div className="flex flex-col h-full transition-all duration-500 group-hover:blur-md group-hover:opacity-20 group-hover:scale-105">
            <div className="bg-[#1283BB] px-6 py-4 lg:px-5 lg:py-3 flex items-center gap-3">
              <div className="w-10 h-10 lg:w-8 lg:h-10 flex-shrink-0">
                <Image
                  src={value.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="w-full h-full brightness-0 invert"
                />
              </div>
              <span className="text-white font-bold text-xl md:text-2xl lg:text-lg tracking-tight truncate">
                {value.title}
              </span>
            </div>

            <div className="relative flex-grow flex items-center justify-center p-4">
              <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 lg:w-32 lg:h-32 flex items-center justify-center rounded-2xl bg-[#1283BB] shadow-[0_0_30px_rgba(18,131,187,0.3)] p-2">
                <Image
                  src={value.icon}
                  alt={value.title}
                  width={160}
                  height={160}
                  className="w-full h-auto brightness-0 invert"
                />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1283BB]/20 to-transparent opacity-100" />
            </div>
          </div>

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-center">
            <p className="text-white text-sm md:text-base leading-relaxed font-medium">
              {value.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
