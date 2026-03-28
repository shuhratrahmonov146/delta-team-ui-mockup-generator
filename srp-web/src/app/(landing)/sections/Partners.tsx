import Image from "next/image";
import Link from "next/link";
import { partners } from "@/data/partners";

export default function PartnersSection() {
  const midIndex = Math.ceil(partners.length / 2);
  const firstRow = partners.slice(0, midIndex);
  const secondRow = partners.slice(midIndex);

  const firstRowFull = [...firstRow, ...firstRow, ...firstRow];
  const secondRowFull = [...secondRow, ...secondRow, ...secondRow];

  return (
    <section className="py-10 sm:py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-[96px] font-bold tracking-tight text-[#0B0B2C]">
            Trusted by businesses <br />
            <span className="text-[#1283BB]">worldwide</span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-24 pb-8 group">
        <div className="flex">
          <div className="flex animate-scroll-right group-hover:pause-animation gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center whitespace-nowrap">
            {firstRowFull.map((partner, index) => (
              <Link
                key={`${partner.name}-row1-${index}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="relative w-24 sm:w-32 md:w-40 lg:w-44 xl:w-[180px] h-10 sm:h-12 md:h-14 lg:h-16 flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-[1.2] cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, (max-width: 1280px) 176px, 180px"
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex">
          <div className="flex animate-scroll-left group-hover:pause-animation gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center whitespace-nowrap">
            {secondRowFull.map((partner, index) => (
              <Link
                key={`${partner.name}-row2-${index}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="relative w-24 sm:w-32 md:w-40 lg:w-44 xl:w-[180px] h-10 sm:h-12 md:h-14 lg:h-16 flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-[1.2] cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, (max-width: 1280px) 176px, 180px"
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
