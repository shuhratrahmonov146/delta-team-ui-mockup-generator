"use client";
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { X } from "lucide-react";

export default function ProductionBridge() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const CALENDAR_URL =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ08YXL81GWXbtznZ53rC3VB_aBCTGWNLqRpjNu6GHpxwTqTVb-gdBzNEhhrIzPNc2Dl3RLN7xkA?gv=true";
  return (
    <>
      <section className="bg-[#1283BB]">
        <Container>
          <div className="py-4 md:py-6 lg:py-8 text-white/90">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold text-center mb-4 sm:mb-6 md:mb-8 3xl:mb-10">
              Bring your AI prototype <br className="md:hidden" /> to product
              reality
            </h1>

            {/* SEO H2 - Introduction */}
            <h2 className="sr-only">
              Transform Your AI Prototype into a Scalable Product
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 md:mb-4 lg:mb-6">
              Tools like lovable and replit are great for prototyping new
              concepts. But when complexity hits or you need to hook into an
              existing codebase, &quot;Vibe Coding&quot; stalls.{" "}
              <b>The SRP Product Foundation</b> provides the architectural
              guardrails AI lacks by grafting your prototype into a
              tried-and-tested product.
            </p>

            <p className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 md:mb-4 lg:mb-6">
              We combine AI speed with professional templates to ensure that
              when you&apos;re ready to scale, you aren&apos;t starting from
              zero.
            </p>

            {/* SEO H2 - Process */}
            <h2 className="sr-only">Our 7-Day Product Foundation Process</h2>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1628] text-white text-sm md:text-lg lg:text-xl 2xl:text-2xl font-medium mb-2 md:mb-4 lg:mb-6">
              <span className="text-lg">✦</span>
              <span>And we do it in 7 days - here&apos;s how:</span>
              <span className="text-lg">✦</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black mb-1">
                1. Architectural Mapping:
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 md:mb-4 lg:mb-6 pl-5">
                A 45-minute deep dive to map your logic, data flows, and
                constraints, and review prototypes if available.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black mb-1">
                2. Product Transplant:
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 md:mb-4 lg:mb-6 pl-5">
                Within 7 days, we graft your AI prototype into the structure of
                one of our tried-and-tested customer facing products.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black mb-1">
                3. The Product Foundation:
              </h3>
              <p className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 md:mb-4 lg:mb-6 pl-5">
                You receive a simple deployed app+codebase (stack, data
                structures, and roadmap) ready to get built into a full product.
              </p>
            </div>

            {/* SEO H2 - Pricing */}
            <h2 className="sr-only">Pricing and How to Get Started</h2>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1628] text-white text-sm md:text-lg lg:text-xl 2xl:text-2xl font-medium mb-3 md:mb-6">
              <span className="text-lg">✦</span>
              <span>What does it Cost?</span>
              <span className="text-lg">✦</span>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl font-medium mb-2 md:mb-4 lg:mb-6">
              We charge a one off <span className="font-extrabold">$1500</span>{" "}
              fee for this service (waived for qualifying partners).
            </p>

            <div
              onClick={handleOpenModal}
              className="inline-block cursor-pointer"
            >
              <CtaButton
                className="bg-white !text-[#000000] hover:!text-white hover:!bg-[#000000] gap-3 md:pr-4"
                iconClassName="md:h-10 md:w-10 !bg-[#1283BB] !text-white"
                href="#"
                text="Book a Technical Strategy Call on Google Calendar"
                mobileText="Book a Strategy Call"
              />
            </div>

            <p className="text-sm md:text-lg italic font-medium opacity-90 mt-3 md:mt-6">
              Let&apos;s map your architecture and see if a Product Foundation
              is the right fit for your roadmap.
            </p>
          </div>
        </Container>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl h-[75vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all hover:scale-110 text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <iframe
              src={CALENDAR_URL}
              width="100%"
              height="100%"
              frameBorder="0"
              className="w-full h-full"
              title="Schedule Appointment"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
