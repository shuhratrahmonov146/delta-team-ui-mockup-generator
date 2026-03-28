"use client";

import React from "react";
import Image from "next/image";
import Hero from "./Hero";
import { ScrollHeader } from "@/components/layout/ScrollHeader";
import { Header } from "@/components/layout/Header";

export default function HeaderHeroWrapper() {
  return (
    <div className="relative w-full min-h-[75vh] md:min-h-screen flex flex-col bg-black">
      {/* Desktop video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden md:block"
      >
        <source src="/video/background.webm" type="video/webm" />
        <source src="/video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Mobile video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-[80%_center] z-0 md:hidden"
      >
        <source src="/video/background-mobile.webm" type="video/webm" />
        <source src="/video/background-mobile.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-0"></div>

      {/* Badge */}
      <div className="absolute bottom-0 left-0 w-[180px] sm:w-[210px] md:w-[230px] lg:w-[270px] 3xl:w-[300px] h-[90px] sm:h-[105px] md:h-[115px] lg:h-[135px] 3xl:h-[150px] z-10 bg-[url('/images/badge-bg.png')] bg-no-repeat bg-cover flex items-center justify-center">
        <Image
          src="/images/badge.webp"
          alt="Badge"
          width={150}
          height={100}
          className="object-contain w-[90px] h-[60px] sm:w-[97.5px] sm:h-[65px] md:w-[105px] md:h-[70px] lg:w-[135px] lg:h-[90px] 2xl:w-[150px] 2xl:h-[100px]"
        />
      </div>

      <ScrollHeader />
      <Header transparent />

      {/* Hero content */}
      <div className="relative z-20 flex-grow flex flex-col">
        <Hero />
      </div>
    </div>
  );
}
