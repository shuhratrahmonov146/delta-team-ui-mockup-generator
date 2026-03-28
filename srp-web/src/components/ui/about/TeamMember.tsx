"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TeamMember } from "@/data/about/team";

export const TeamMemberCard = ({
  name,
  surname,
  role,
  image,
  href,
}: TeamMember) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      <div
        className="lg:hidden perspective-1000 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative aspect-[3/4] transition-transform duration-700 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-slate-900">
            <Image
              src={image}
              alt={`${name} ${surname}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />

            <div className="absolute inset-0" />

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="backdrop-blur-sm bg-slate-900/40 rounded-lg p-3 border border-white/10">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-white text-sm font-semibold">
                    {name} {surname}
                  </h3>
                  <div className="flex-shrink-0 w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-2.5 h-2.5 text-white"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden bg-slate-900">
            <div className="h-full flex flex-col justify-center p-4">
              <div className="backdrop-blur-sm bg-slate-900/40 rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-white text-base font-semibold leading-tight">
                    {name} {surname}
                  </h3>
                  <div className="flex-shrink-0 w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-2.5 h-2.5 text-white"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  {role}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-cyan-500 hover:text-cyan-400 transition-colors"
                >
                  <span className="text-xs font-medium">LinkedIn</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:block group"
      >
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-900">
          <Image
            src={image}
            alt={`${name} ${surname}`}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />

          <div className="absolute inset-0" />

          <div className="absolute bottom-0 left-0 right-0 p-6 lg:translate-y-0 lg:opacity-100 transition-all duration-300 ease-out">
            <div className="backdrop-blur-sm bg-slate-900/40 rounded-lg p-4 border border-white/10">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-white text-xl font-semibold leading-tight">
                  {name} {surname}
                </h3>
                <div className="flex-shrink-0 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center mt-0.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-3 h-3 text-white"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{role}</p>
            </div>
          </div>
        </div>
      </a>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
};
