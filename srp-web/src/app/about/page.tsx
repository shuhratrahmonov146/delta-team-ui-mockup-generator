"use client";

import Image from "next/image";
import { aboutBranchOffices } from "@/data/about/offices";
import { Container } from "@/components/ui/Container";
import { aboutTeamMembers } from "@/data/about/team";
import { TeamMemberCard } from "@/components/ui/about/TeamMember";
import ValuesCard from "@/components/ui/about/ValuesCard";
import HowWork from "@/components/ui/about/HowWork";
import { BranchOfficeCard } from "@/components/ui/about/BranchOfficeCard";

export default function AboutPage() {
  return (
    <main className="bg-[#070129] py-12 md:py-20 px-4 md:px-8 xl:px-20">
      <Container>
        {/* SEO H1 - visually hidden */}
        <h1 className="sr-only">About us - Our Vision, Mission & Team</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-12 md:mt-20">
          <div className="relative bg-[#13172E] rounded-2xl p-8 md:p-12 transition-transform hover:scale-[1.02] duration-300 mt-10 lg:mt-0">
            <div className="absolute -top-10 right-8 md:right-12 w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl flex items-center justify-center p-4 shadow-xl">
              <Image
                src="/icons_about/section_vision/vision_logo.svg"
                alt="Vision Icon"
                width={64}
                height={64}
                className="w-auto h-auto max-w-[64px] max-h-[64px]"
              />
            </div>
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              Vision
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl">
              Building trust between programming teams in Central Asia and
              international clients by delivering quality software on time,
              within budget, and with clear communication.
            </p>
          </div>
          <div className="relative bg-[#13172E] rounded-2xl p-8 md:p-12 transition-transform hover:scale-[1.02] duration-300">
            <div className="absolute -top-10 right-8 md:right-12 w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl flex items-center justify-center p-4 shadow-xl">
              <Image
                src="/icons_about/section_vision/mission_logo.svg"
                alt="Mission Icon"
                width={64}
                height={64}
                className="w-auto h-auto max-w-[64px] max-h-[64px]"
              />
            </div>
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              Mission
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl">
              Equipping software development teams in Central Asia to drive
              clients to new levels of success through programming services
              offered at high value and low cost.
            </p>
          </div>
        </div>

        <div className="mt-24 md:mt-40">
          <h2 className="text-white text-4xl md:text-7xl lg:text-8xl font-bold text-center mb-16 md:mb-24">
            Our Core Values
          </h2>
          <ValuesCard />
        </div>

        <div className="mt-24 md:mt-40 lg:mt-60 relative px-4 py-20">
          <h2 className="text-white text-4xl md:text-7xl lg:text-8xl font-bold text-center mb-8 md:mb-24 ">
            How we Work
          </h2>

          <HowWork />
        </div>

        <div className="mt-24 md:mt-40 lg:mt-60 px-4">
          <h2 className="text-white text-4xl md:text-8xl lg:text-[110px] font-bold text-center mb-16 md:mb-24 tracking-tight">
            Team Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {aboutTeamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </div>

        <div className="mt-24 md:mt-40 lg:mt-60 px-4 space-y-24 md:space-y-48">
          {aboutBranchOffices.map((branch, index) => (
            <BranchOfficeCard key={index} branch={branch} />
          ))}
        </div>
      </Container>
    </main>
  );
}
