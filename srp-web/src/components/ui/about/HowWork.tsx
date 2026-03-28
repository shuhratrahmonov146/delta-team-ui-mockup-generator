import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { aboutProcessSteps } from "@/data/about/how_work";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function HowWork() {
  return (
    <div className="relative max-w-7xl mx-auto py-12">
      <div className="md:hidden relative ">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={700}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-white/30 !w-2 !h-2",
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-[#1283BB] !w-8",
          }}
          className="how-we-work-swiper"
        >
          {aboutProcessSteps.map((step, index) => (
            <SwiperSlide key={index} className="pt-[2px]">
              <div className="flex flex-col items-center text-center px-8 py-12">
                <div className="shine-effect relative w-40 h-40 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center p-10 transition-all duration-700 shadow-[0_0_100px_rgba(18,131,187,0.1)] border border-white/10 overflow-hidden">
                  <div className="absolute inset-0 rounded-full bg-[#1283BB]/10 blur-3xl" />

                  {typeof step.icon === "string" ? (
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={120}
                      height={120}
                      className="w-full h-auto brightness-0 invert opacity-60"
                    />
                  ) : (
                    <step.icon className="w-full h-auto text-white opacity-60" />
                  )}
                </div>
                <div className="w-16 h-0.5 bg-[#1283BB] mx-auto rounded-full mt-6 mb-4" />

                <div className="mb-6">
                  <p className="text-white text-lg font-bold leading-tight max-w-[240px]">
                    {step.title}
                  </p>
                </div>
                <div className="max-w-[280px]">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-20 lg:gap-8 items-start relative z-10">
        {aboutProcessSteps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center group relative"
          >
            <div className="shine-effect relative w-48 h-48 lg:w-44 lg:h-44 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center p-12 transition-all duration-700 group-hover:scale-105 group-hover:bg-white/10 shadow-[0_0_100px_rgba(18,131,187,0.1)] border border-white/10 group-hover:border-[#1283BB]/50 overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-[#1283BB]/10 opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-700" />

              {typeof step.icon === "string" ? (
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={120}
                  height={120}
                  className="w-full h-auto transition-all duration-700 group-hover:scale-110 brightness-0 invert opacity-60 group-hover:opacity-100"
                />
              ) : (
                <step.icon className="w-full h-auto transition-all duration-700 group-hover:scale-110 text-white opacity-60 group-hover:opacity-100" />
              )}
            </div>
            <div className="w-0 h-0.5 bg-[#1283BB] mx-auto transition-all duration-500 group-hover:w-16 rounded-full mt-6 mb-4" />

            <div className="transition-all duration-500 mb-6 opacity-100 group-hover:opacity-0 group-hover:-translate-y-4">
              <p className="text-white text-xl lg:text-2xl font-bold leading-tight max-w-[240px]">
                {step.title}
              </p>
            </div>
            <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-96 group-hover:opacity-100 max-w-[260px] mt-2 group-hover:translate-y-0 translate-y-4 lg:absolute top-[240px] w-[500px]">
              <p className="text-gray-300 text-base leading-relaxed">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
