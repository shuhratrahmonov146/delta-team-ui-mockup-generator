"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import TechCard from "@/components/ui/TechCard";
import StaffCard from "@/components/ui/StaffCard";
import { techStackData } from "@/data/techStack";
import { servicesData } from "@/data/servicesData";

const categories = {
  Mobile: ["Flutter"],
  Frontend: ["React", "Next.js", "Blazor"],
  Backend: ["C#", ".NET", "Python Django", "Node.Js"],
  Cloud: ["Azure", "GCP", "Kubernetes", "Docker"],
};

type CategoryKey = "All" | keyof typeof categories;

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs: CategoryKey[] = [
    "All",
    ...(Object.keys(categories) as Array<keyof typeof categories>),
  ];

  const filteredTechStack =
    activeTab === "All"
      ? techStackData
      : techStackData.filter((item) =>
          categories[activeTab].includes(item.title)
        );

  return (
    <div className="bg-[#070129] text-white py-16 md:py-20 lg:py-28">
      <Container>
        <h1 className="text-white text-[2rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] font-semibold text-center mb-4 md:mb-6 lg:mb-8">
          Tech Stacks
        </h1>

        <div className="flex flex-col items-center mb-12">
          <div className="hidden lg:flex flex-wrap gap-2 items-center justify-center">
            <div className="bg-[#fff] rounded-full flex flex-wrap gap-1 border border-white/5">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-1 rounded-full text-[16px] font-normal transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-[#1283BB] text-white shadow-lg"
                      : "text-[#333] hover:text-white hover:bg-[#1283BB]/70"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:hidden relative flex justify-end items-center gap-4 w-full max-w-[300px]">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center justify-between flex-1 px-4 py-2 bg-white text-[#0A051A] rounded-full text-[14px] font-normal shadow-md border border-white/10 transition-all active:scale-[0.98]"
            >
              <span className="font-semibold">{activeTab}</span>
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                />

                <div className="absolute top-full right-0 mt-2 w-full bg-[#0A051A] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-[14px] font-normal transition-colors border-b border-white/5 last:border-none ${
                        activeTab === tab
                          ? "bg-[#1283BB] text-white"
                          : "text-white/70 hover:bg-white/5"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 min-[560px]:grid-cols-2 min-[840px]:grid-cols-3  min-[1120px]:grid-cols-4 gap-y-6 gap-x-4 md:gap-y-8 md:gap-x-6 justify-items-center min-h-[300px] w-[80%] mx-auto">
          {filteredTechStack.length > 0 ? (
            filteredTechStack.map((item, index) => (
              <TechCard
                key={`${item.title}-${index}`}
                title={item.title}
                subtitle={item.subtitle}
                iconName={item.icon}
              />
            ))
          ) : (
            <div className="col-span-full py-10 flex flex-col items-center justify-center text-center">
              <p className="text-gray-400 text-lg">
                There is no information in this category yet.
              </p>
            </div>
          )}
        </div>

        <div className="py-8 sm:py-12 md:py-16 lg:py-20">
          <h2 className="text-white text-[2rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] font-semibold text-center mb-8 md:mb-12 lg:mb-16">
            Services
          </h2>

          <div className="flex flex-col gap-8 md:gap-10 lg:gap-12 items-center">
            {servicesData.map((service, index) => (
              <StaffCard
                key={index}
                title={service.title}
                description={service.description}
                imageName={service.image}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
