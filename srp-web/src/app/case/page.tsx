"use client";

import { useState, useEffect } from "react";
import { caseStudiesData, CaseStudy } from "@/data/case";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

const categories = [
  "All",
  "Software Development",
  "System Integration",
  "Mobile Development",
  "Business Intelligence",
];

const ITEMS_PER_PAGE = 6;

export default function CaseStudiesList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const filteredCases =
    activeCategory === "All"
      ? caseStudiesData
      : caseStudiesData.filter(
          (item: CaseStudy) => item.category === activeCategory
        );

  const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentCases = filteredCases.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="flex-1 relative">
      <Container>
        {/* SEO H1 - visually hidden */}
        <h1 className="sr-only">
          Our Case Studies - Successful Projects Portfolio
        </h1>

        <div className="mx-auto px-4 py-2 sm:py-2 md:py-2 lg:py-12">
          {/* SEO H2 - Filter Section */}
          <h2 className="sr-only">Browse Projects by Category</h2>

          <div className="hidden lg:flex flex-wrap gap-3 mb-10 items-center justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all border ${
                  activeCategory === category
                    ? "bg-[#1283BB] text-white"
                    : "text-[#0a051a] hover:text-white hover:bg-[#1283bb]/80 border-[#1283bb]/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="lg:hidden relative mb-8 flex justify-end items-center gap-4 z-20">
            <span className="text-[#0A051A] font-semibold text-[12px]">
              Filter:
            </span>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-between min-w-[160px] px-4 py-1.5 bg-[#1283BB] text-white rounded-full text-[12px] font-normal shadow-md relative z-50"
            >
              <span className="truncate max-w-[120px]">{activeCategory}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 ml-2 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/5"
                  onClick={() => setIsOpen(false)}
                />

                <div className="absolute top-full right-0 mt-2 w-[220px] bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-[13px] border-b last:border-0 border-gray-50 hover:bg-gray-50 transition-colors ${
                        activeCategory === category
                          ? "text-[#1283BB] font-bold bg-blue-50/30"
                          : "text-gray-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* SEO H2 - Projects Grid Section */}
          <h2 className="sr-only">Featured Case Studies</h2>

          {filteredCases.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 relative z-0">
                {currentCases.map((item: CaseStudy) => (
                  <CaseStudyCard key={item.id} item={item} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pb-10">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full border border-[#1283BB] text-[#1283BB] hover:bg-[#1283BB] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#1283BB] transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                          currentPage === number
                            ? "bg-[#1283BB] text-white shadow-lg shadow-blue-500/30"
                            : "text-[#0A051A] hover:bg-[#1283BB]/10"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full border border-[#1283BB] text-[#1283BB] hover:bg-[#1283BB] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#1283BB] transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </main>
  );
}
