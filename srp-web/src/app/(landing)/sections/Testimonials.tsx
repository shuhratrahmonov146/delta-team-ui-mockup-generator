"use client";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/data/testimonials";
import { QuoteIcon } from "@/components/icons/QuoteIcon";
import Image from "next/image";
import { CtaButton } from "@/components/ui/CtaButton";

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-10 sm:py-16 md:py-24 lg:py-32 bg-white">
      <Container>
        <div className="max-w-[100rem] mx-auto">
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1628] text-white text-sm font-medium">
              <span className="text-lg">✦</span>
              <span>Our Testimonials</span>
              <span className="text-lg">✦</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-semibold text-center text-[#0A1628] mb-6 md:mb-12 lg:mb-20">
            What our customers say
          </h2>

          <div className="grid lg:grid-cols-[1fr_2fr] items-center">
            <div className="flex flex-col md:flex-row lg:flex-col overflow-x-auto md:overflow-x-auto lg:overflow-x-visible max-lg:mb-8">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex-shrink-0 border-b text-left p-4 transition-all duration-300 ${activeTab === index ? "border-[#1283BB]" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  <h3
                    className={`font-bold text-lg mb-1 ${activeTab === index ? "text-[#1283BB]" : "text-[#0A1628]"}`}
                  >
                    {testimonial.name}
                  </h3>
                  <p
                    className={`text-sm ${activeTab === index ? "text-gray-600" : "text-gray-500"}`}
                  >
                    {testimonial.role}, {testimonial.company}{" "}
                  </p>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:min-h-[466px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`col-start-1 row-start-1 w-full transition-all duration-500
                  ${
                    activeTab === index
                      ? "opacity-100 translate-x-0 z-10"
                      : "opacity-0 translate-x-8 -z-10 pointer-events-none"
                  }`}
                >
                  <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] gap-8 items-start">
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-200 mx-auto md:mx-0 w-full max-w-[260px] md:max-w-[300px] lg:max-w-none">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 300px, 260px"
                        unoptimized
                      />
                    </div>
                    <div className="relative flex items-center h-full pb-8">
                      <div>
                        <QuoteIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mb-6" />
                        <p className="text-xl md:text-xl font-medium text-[#0A1628] leading-relaxed">
                          {testimonial.quote}
                        </p>
                        <QuoteIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mt-6 ml-auto rotate-180" />
                      </div>
                      <CtaButton
                        href="/case"
                        text="case studies"
                        className="absolute bottom-0 left-0 md:left-auto md:right-0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
