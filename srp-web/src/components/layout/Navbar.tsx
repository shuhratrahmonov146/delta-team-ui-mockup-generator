"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = "" }: NavbarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/case", label: "Case Studies" },
    { href: "/contact", label: "Contact" },
    { href: "http://careers.srpsoftware.com", label: "Careers" },
  ];

  return (
    <nav className={`hidden lg:flex items-center gap-7 ${className}`}>
      {links.map((link) => {
        const isActive =
          link.href === "/" ? false : pathname.startsWith(link.href);
        const isServices = link.label === "Services";

        return (
          <div
            key={link.href}
            className="relative group h-full flex items-center"
          >
            <Link
              href={link.href}
              className={`relative text-white flex items-center gap-1 py-4 transition-opacity hover:opacity-90`}
            >
              <span className="relative z-10 text-lg">{link.label}</span>

              {isServices && (
                <ChevronDown className="w-4 h-4 mt-1 transition-transform duration-200 group-hover:rotate-180" />
              )}

              <span
                className={`absolute left-0 bottom-3 h-[2px] bg-white transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
              />
            </Link>

            {isServices && (
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden min-w-[220px] py-2 border border-gray-100">
                  <Link
                    href="/services"
                    className="block px-5 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-[#1283BB] transition-colors"
                  >
                    All Services
                  </Link>

                  <Link
                    href="/product-foundation"
                    className="block px-5 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-[#1283BB] transition-colors"
                  >
                    Product Foundation
                  </Link>
                  <Link
                    href="/integration-sprint"
                    className="block px-5 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-[#1283BB] transition-colors"
                  >
                    Integration Sprint
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
