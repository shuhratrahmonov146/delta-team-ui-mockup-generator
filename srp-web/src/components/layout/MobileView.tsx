"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function MobileView() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => setIsAnimating(true), 75);

      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "unset";
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/product-foundation", label: "Product Foundation" },
    { href: "/integration-sprint", label: "Integration Sprint" },
    { href: "/case", label: "Case Studies" },
    { href: "/contact", label: "Contact" },
    { href: "http://careers.srpsoftware.com", label: "Careers" },
  ];

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[60] text-white transition-all flex"
        aria-label="Toggle menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-black/40 backdrop-blur-sm z-[45]"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed left-0 right-0 top-24 sm:top-28 md:top-32 z-50 px-6">
            <div className="mx-auto max-w-[1148px]">
              <div
                className={`relative overflow-hidden rounded-[20px] sm:rounded-[30px] bg-[#1283BB] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out ${
                  isAnimating
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                <nav className="flex flex-col p-6">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="py-2 font-medium text-white hover:opacity-60 border-b border-white/15"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="mt-4" onClick={() => setIsOpen(false)}>
                    <Button href="http://localhost:3001" className="w-full">
                      FREE TECH CONSULTATION
                    </Button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
