"use client";

import { FAQItem, FAQData } from "@/data/faq";
import { useState } from "react";

export default function FAQSection() {
  const [isActive, setIsActive] = useState<number | null>(null);

  const toggleActive = (index: number) => {
    setIsActive((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white py-10 sm:py-16 md:py-24 lg:py-32">
      <div className="mb-6 md:mb-10 lg:mb-24 xl:mb-[120px]">
        <h2 className="mb-3 sm:mb-4 md:mb-6 flex flex-col items-center justify-center text-[24px] md:text-5xl lg:text-6xl xl:text-[96px] font-bold tracking-tight text-[#070129] leading-tight transition-all duration-500">
          <span className="block text-center">Have Questions?</span>
          <span className="block text-center">We get asked these a lot…</span>
        </h2>
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative">
          <div className="space-y-0">
            {FAQData.map(({ question, answer }: FAQItem, index: number) => {
              const isOpen = isActive === index;
              const isLast = index === FAQData.length - 1;

              return (
                <div key={index} className="relative">
                  {!isLast && (
                    <div className="absolute left-2 top-4 bottom-0 w-px border-l border-dashed border-gray-300 z-0" />
                  )}

                  <div className="relative pl-[72px]">
                    <div
                      className={`absolute left-0 top-1 sm:top-1.5 h-4 w-4 rounded-full z-10 transition-all duration-300
                        ${
                          isOpen
                            ? "bg-[#1283bb] ring-4 ring-[#1283bb]/10 scale-110"
                            : "bg-gray-900"
                        }`}
                    />

                    <div
                      onClick={() => toggleActive(index)}
                      className="cursor-pointer group min-h-[44px] flex flex-col justify-center"
                      role="button"
                    >
                      <h3
                        className={`text-base sm:text-lg md:text-xl lg:text-[24px] font-medium transition-colors duration-200 pr-2 pb-3 md:pb-6
                        ${isOpen ? "text-gray-900 font-semibold" : "text-gray-900 group-hover:text-[#1283bb]"}`}
                      >
                        {question}
                      </h3>

                      <div
                        className={`grid transition-all duration-300 ease-in-out
                        ${isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <div className="overflow-hidden">
                          <div
                            className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-[18px] pb-6"
                            dangerouslySetInnerHTML={{ __html: answer }}
                          />
                        </div>
                      </div>

                      {!isLast && (
                        <div className="border-t border-gray-100 pt-3 md:pt-6" />
                      )}
                      {isLast && <div className="pb-8" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
