"use client";

import { useEffect, useState } from "react";
import { GdprData } from "@/data/GdprContent";
import { Container } from "@/components/ui/Container";

type ContentItem =
  | string
  | {
      title?: string;
      text: string;
    };

export default function GdprPolicyPage() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("id") || "";
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="bg-white text-gray-800">
      <div className="bg-gray-50 border-b border-gray-200">
        <Container>
          <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 lg:py-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#474A55] tracking-tight leading-tight">
              Silk Road Professionals GDPR Policy
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-500 max-w-4xl">
              Trust is the foundation of effective collaboration. At Silk Road
              Professionals, we are committed to the privacy and security of any
              personal information entrusted to us.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <nav className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-1">
                <span className="block mb-4 text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Contents
                </span>
                {GdprData.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`group flex items-center w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base font-medium rounded-md transition-colors duration-200 ${
                      activeSection === section.id
                        ? "bg-[#1283BB]/10 text-[#1283BB]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    aria-current={
                      activeSection === section.id ? "page" : undefined
                    }
                  >
                    <span className="truncate">{section.title}</span>
                  </button>
                ))}
              </div>
            </nav>

            <main className="lg:col-span-9">
              <div className="max-w-none">
                {GdprData.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="mb-10 sm:mb-14 lg:mb-16 scroll-mt-24"
                  >
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 border-b border-gray-100">
                      {section.title}
                    </h2>

                    <div className="space-y-4 sm:space-y-6 text-gray-600 text-[15px] sm:text-base md:text-lg lg:text-xl leading-relaxed">
                      {section.content.map(
                        (item: ContentItem, index: number) => {
                          if (
                            typeof item === "object" &&
                            item !== null &&
                            !Array.isArray(item)
                          ) {
                            return (
                              <div
                                key={index}
                                className="mb-4 sm:mb-6 last:mb-0"
                              >
                                {item.title && (
                                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2">
                                    {item.title}
                                  </h4>
                                )}
                                <p className="text-gray-600">{item.text}</p>
                              </div>
                            );
                          }

                          if (typeof item === "string") {
                            if (item.startsWith("•")) {
                              return (
                                <div
                                  key={index}
                                  className="flex items-start ml-2 sm:ml-4"
                                >
                                  <span className="mr-2 text-[#1283BB]">•</span>
                                  <span>{item.substring(1).trim()}</span>
                                </div>
                              );
                            }
                            return <p key={index}>{item}</p>;
                          }

                          return null;
                        }
                      )}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-10 sm:mt-16 pt-8 border-t border-gray-200">
                <p className="text-sm sm:text-base text-gray-500">
                  If you have any questions about this policy, please contact us
                  at{" "}
                  <a
                    href={`mailto:${GdprData.dpoEmail}`}
                    className="text-[#1283BB] hover:text-[#1283BB]/80 font-medium transition-colors"
                  >
                    {GdprData.dpoEmail}
                  </a>
                </p>
              </div>
            </main>
          </div>
        </div>
      </Container>
    </div>
  );
}
