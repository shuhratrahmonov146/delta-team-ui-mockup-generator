"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Navbar } from "./Navbar";
import { MobileView } from "./MobileView";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ScrollHeader() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = Math.max(0, window.scrollY);
      setVisible(currentScroll > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out transform-gpu shadow-xl ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
        ${isHomePage ? "bg-[#1283BB] lg:bg-black/60" : "bg-[#1283BB]"}
      `}
    >
      <Container>
        <div className="flex items-center justify-between py-[18px] lg:py-3">
          <Link href="/">
            <Logo />
          </Link>

          <div className="hidden min-[1150px]:block">
            <Navbar />
          </div>

          <div className="hidden md:block">
            <Button href="http://localhost:3001">FREE TECH CONSULTATION</Button>
          </div>

          <div className="md:hidden">
            <MobileView />
          </div>
        </div>
      </Container>
    </header>
  );
}
