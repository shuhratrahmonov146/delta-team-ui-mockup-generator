import Image from "next/image";
import { Office } from "@/data/offices";
import Flag from "react-world-flags";

interface OfficeCardProps {
  office: Office;
}

export default function OfficeCard({ office }: OfficeCardProps) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    office.address
  )}`;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {" "}
          <Flag
            code={office.flag}
            className="w-[2.5rem] h-[1.5rem] object-cover"
          />
          <h3 className="font-bold text-gray-900 text-lg">{office.country}</h3>
        </div>
        <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded">
          {office.city}
        </span>
      </div>

      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 mb-4 flex-grow cursor-pointer group/address"
      >
        <Image
          src="/icons/location.svg"
          alt="location"
          width={20}
          height={20}
          className="mt-0.5 opacity-60 shrink-0 group-hover/address:opacity-100 transition-opacity"
        />
        <p className="text-gray-500 text-sm leading-relaxed group-hover/address:text-[#1283BB] group-hover/address:underline transition-all">
          {office.address}
        </p>
      </a>

      <div className="border-t border-gray-100 pt-4 mt-auto">
        <a
          href={`tel:${office.phone}`}
          className="flex items-center gap-3 text-[#1283BB]/75 hover:text-[#1283BB] transition-colors font-medium text-sm"
        >
          <div className="opacity-70">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          {office.phone}
        </a>
      </div>
    </div>
  );
}
