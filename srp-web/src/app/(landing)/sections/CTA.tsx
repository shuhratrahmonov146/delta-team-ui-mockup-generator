import { CtaButton } from "@/components/ui/CtaButton";

export function CTASection() {
  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#070129]" />
        <div className="absolute h-[280px] w-[280px] rounded-full bg-[#4ABFE8] blur-3xl opacity-60 sm:h-[450px] sm:w-[450px] md:h-[677px] md:w-[677px] transition-all duration-500 animate-pulse" />
        <div className="absolute h-[200px] w-[200px] rounded-full bg-[#1283BB] blur-3xl opacity-60 sm:h-[300px] sm:w-[300px] md:h-[450px] md:w-[450px] transition-all duration-700 animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 text-center">
        <h2 className="mb-3 lg:tracking-[-0.3rem] sm:mb-4 md:mb-6 flex flex-col text-[24px] items-center justify-center sm:text-[32px] md:text-6xl lg:text-[80px] font-bold tracking-tight text-white gap-1 sm:gap-2 md:gap-3 lg:gap-[40px] leading-tight transition-all duration-500">
          <span className="block">Get Started with</span>
          <span className="block">Free Tech Consultation!</span>
        </h2>

        <p className="mx-auto mt-6 md:mt-8 lg:mt-10 mb-6 sm:mb-8 md:mb-10 max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 px-2 sm:px-3 md:px-4">
          Book a free 45-minute consultation with our team. We&apos;ll discuss
          your project, explore solutions, and map out the path forward, no
          strings attached.
        </p>

        <CtaButton href="http://localhost:3001" text="get started now" />
      </div>
    </section>
  );
}
