import Image from "next/image";

export function Logo() {
  return (
    <div className="transition-all duration-400 ease-in-out hover:opacity-70">
      <Image
        src="/logo/logo.svg"
        alt="logo"
        width={232}
        height={56}
        className="h-8 sm:h-10 md:h-12 lg:h-[52px] xl:h-14 w-auto object-contain"
      />
    </div>
  );
}
