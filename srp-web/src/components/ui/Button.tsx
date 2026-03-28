import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  href: string;
}

export function Button({ className, children, href }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block rounded-full transition-transform hover:scale-105",
        "px-2 sm:px-3 md:px-3.5 4xl:px-4",
        "py-2 sm:py-3 md:py-3.5 4xl:py-4",
        "text-xs sm:text-sm",
        "font-semibold uppercase transition-all text-center",
        "bg-white text-black hover:bg-gray-100 active:scale-95",
        className
      )}
    >
      {children}
    </Link>
  );
}
