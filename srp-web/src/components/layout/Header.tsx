import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Navbar } from "./Navbar";
import { MobileView } from "./MobileView";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type HeaderProps = {
  transparent?: boolean;
};

export function Header({ transparent }: HeaderProps) {
  return (
    <header
      className={`z-30 py-4 md:py-5 xl:py-6 transition-colors ${transparent ? "bg-transparent" : "bg-[#1283BB]"}`}
    >
      <Container>
        <div className="relative rounded-[32px] sm:rounded-[44px] md:rounded-[56px] lg:rounded-[66px] xl:rounded-[72px]">
          {/* GLASS OVERLAY */}
          <div className="absolute inset-0 rounded-[32px] sm:rounded-[44px] md:rounded-[56px] lg:rounded-[66px] xl:rounded-[72px] bg-white/15 backdrop-blur-[8px] sm:backdrop-blur-[10px] md:backdrop-blur-[12px] lg:backdrop-blur-[13.2px] xl:backdrop-blur-[15px] border border-white/30" />

          {/* CONTENT */}
          <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 md:px-6 lg:py-5 xl:px-8 4xl:py-6">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <div className="hidden min-[1150px]:block">
              <Navbar />
            </div>

            <div className="hidden md:block flex-shrink-0">
              <Button href="http://localhost:3001">
                FREE TECH CONSULTATION
              </Button>
            </div>

            <div className="md:hidden">
              <MobileView />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
