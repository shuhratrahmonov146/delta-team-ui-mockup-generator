import Link from "next/link";

export function CtaButton({
  href,
  text,
  mobileText,
  className = "",
  iconClassName = "",
}: {
  href: string;
  text: string;
  mobileText?: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[#0f172a] hover:bg-[#1a2744] active:scale-95 px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold text-white transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#4ABFE8] focus:ring-offset-2 focus:ring-offset-[#070129] touch-manipulation hover:shadow-lg hover:shadow-[#4ABFE8]/20 capitalize ${className}`}
    >
      {mobileText && (
        <span className="min-[480px]:hidden lg:text-[1.5rem] font-medium leading-[2rem]">
          {mobileText}
        </span>
      )}

      <span
        className={`${mobileText ? "hidden min-[480px]:inline" : ""} lg:text-[1.5rem] font-medium leading-[2rem]`}
      >
        {text}
      </span>

      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:rotate-45 group-hover:scale-110 flex-shrink-0 ${iconClassName}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </div>
    </Link>
  );
}
