import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";

export default function Hero() {
  return (
    <Container>
      <section className="relative pt-6 sm:pt-8 md:pt-10 3xl:pt-20">
        <Navbar className="md:flex min-[1150px]:hidden absolute top-[-1.25rem]" />
        <h1 className="z-20 font-bold md:font-black text-[1.8rem] sm:text-[2.5rem] md:text-[3rem] xl:text-[4rem] 3xl:text-[5rem] 4xl:text-[6rem] leading-[1.2] tracking-[-1.6px] md:tracking-[-0.03em] text-white mb-4 capitalize">
          Building Trust between <br className="hidden sm:block" /> programming
          teams and <br /> international clients{" "}
        </h1>

        <p className="font-medium text-base sm:text-lg md:text-xl lg:text-[1.5rem] leading-[1.2] tracking-normal max-w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] text-[#F5F5F5] mb-6 md:mb-0">
          {" "}
          Helping your business grow with AI-powered B2B software solutions{" "}
        </p>

        <div className="md:hidden">
          <Button href="http://localhost:3001">FREE TECH CONSULTATION</Button>
        </div>
      </section>
    </Container>
  );
}
