import Image from "next/image";
import Link from "next/link";
import { CaseStudy } from "@/data/case";
import { CaseLinkIcon } from "@/components/icons/caseIcons";

interface CaseStudyCardProps {
  item: CaseStudy;
}

export default function CaseStudyCard({ item }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case/${item.id}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-[32px] shadow hover:shadow-2xl transition-all duration-500"
    >
      <Image
        src={item.cardImage || item.heroImage}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#070129]/90 via-[#070129]/10 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#070129]/40 via-[#070129]/10 to-transparent opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500" />

      <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <CaseLinkIcon className="text-[#1283BB]" />
      </div>

      <div className="absolute bottom-8 left-8 right-8">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
          {item.title}
        </h3>
        <span className="inline-block px-3 py-1 bg-[#1283BB] text-white text-xs font-semibold rounded-full mt-2 shadow-sm">
          {item.category}
        </span>
      </div>
    </Link>
  );
}
