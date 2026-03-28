"use client";
import { useState, useEffect, TouchEvent } from "react";
import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { features } from "@/data/features";

export default function Features() {
  const extendedFeatures = [...features, ...features, ...features];
  const startOffset = features.length;

  const [index, setIndex] = useState(startOffset);
  const [visibleCards, setVisibleCards] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleCards(3);
      else if (window.innerWidth >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    if (index >= extendedFeatures.length - visibleCards) return;
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (index <= 0) return;
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (index >= 2 * features.length) {
      setIsTransitioning(false);
      setIndex(index - features.length);
    } else if (index < features.length) {
      setIsTransitioning(false);
      setIndex(index + features.length);
    }
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
  };

  return (
    <section className="bg-[#070129] text-white py-10 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      <Container>
        <div className="max-w-[100rem] mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1283BB] text-white text-sm font-medium">
                <span className="text-lg">✦</span>
                <span>Software Features</span>
                <span className="text-lg">✦</span>
              </div>
            </div>
            <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-8xl tracking-tight text-[#1283BB] text-center mb-6 md:mb-12 lg:mb-16">
              We deliver business automation solutions
            </h2>
          </div>

          <div className="relative group px-0 md:px-4">
            <button
              onClick={prev}
              className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center           rounded-full backdrop-blur-md transition-all duration-300             cursor-pointer border border-white/20 bg-white/10 hover:bg-white left-2 group-hover:bg-white/20 2xl:-left-12 2xl:bg-white/10 2xl:hover:bg-white 2xl:group-hover:bg-white"
            >
              <ChevronLeft className="w-6 h-6 text-white 2xl:group-hover:text-[#070129]" />
            </button>

            <button
              onClick={next}
              className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center
              rounded-full backdrop-blur-md transition-all duration-300
              cursor-pointer border border-white/20 bg-white/10 hover:bg-white right-2 group-hover:bg-white/20 2xl:-right-12 2xl:bg-white/10 2xl:hover:bg-white 2xl:group-hover:bg-white"
            >
              <ChevronRight className="w-6 h-6 text-white 2xl:group-hover:text-[#070129]" />
            </button>

            <div
              className="overflow-hidden px-1"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex items-stretch gap-6 ease-out"
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transitionDuration: isTransitioning ? "500ms" : "0ms",
                  transform: `translateX(calc(-${index} * (100% + 24px) / ${visibleCards}))`,
                }}
              >
                {extendedFeatures.map((item, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 flex flex-col"
                    style={{
                      width: `calc((100% - ${(visibleCards - 1) * 24}px) / ${visibleCards})`,
                    }}
                  >
                    <FeatureCard {...item} className="h-full" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6 md:hidden">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsTransitioning(true);
                    setIndex(startOffset + i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300
                  ${
                    index % features.length === i
                      ? "w-6 bg-[#1283BB]"
                      : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
