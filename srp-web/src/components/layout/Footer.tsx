"use client";
import Image from "next/image";
import Link from "next/link";
import { footerMenuItems, LinkItem, socialMediaLinks } from "@/data/footer";
import { Container } from "../ui/Container";
import { useState } from "react";
import { Button } from "../ui/Button";
const year = new Date().getFullYear();

function SocialLinks() {
  return (
    <div className="text-left">
      <ul className="flex flex-col gap-3">
        {socialMediaLinks.map((link: LinkItem) => (
          <li key={link.href} className="flex items-center gap-2 justify-start">
            {link.logo && (
              <Image src={link.logo} alt={link.label} width={24} height={24} />
            )}
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1283BB] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmailContact({
  copied,
  onCopy,
}: {
  copied: boolean;
  onCopy: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="min-w-[250px] text-left">
      <h3 className="font-bold text-[#1283BB] mb-1">Email</h3>
      <button
        type="button"
        onClick={onCopy}
        className={`inline-block min-w-[250px] text-left break-all transition-all duration-300 ${
          copied ? "text-white" : "text-white hover:text-[#1283BB]"
        }`}
      >
        {copied ? "Email address copied!" : "communications@srpsoftware.com"}
      </button>
    </div>
  );
}

export function Footer() {
  const [copied, setCopied] = useState(false);
  const COPY_FEEDBACK_DURATION = 1000;
  const midIndex = Math.ceil(footerMenuItems.length / 2);
  const firstColumn = footerMenuItems.slice(0, midIndex);
  const secondColumn = footerMenuItems.slice(midIndex);

  const handleCopy = (): void => {
    navigator.clipboard.writeText("communications@srpsoftware.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, COPY_FEEDBACK_DURATION);
  };

  return (
    <footer className="bg-[#070129] text-white py-6 3xl:py-10 4xl:py-12">
      <Container>
        <div className="flex flex-col md:flex-row flex-wrap xl:flex-nowrap justify-between items-start gap-10">
          <div className="w-full md:w-auto flex gap-2 md:gap-12">
            <ul className="flex flex-col gap-2 text-left mr-auto sm:mr-10 md:mr-0">
              {firstColumn.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="hover:text-[#1283BB] transition-colors text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-2 text-left">
              {secondColumn.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="hover:text-[#1283BB] transition-colors text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-auto flex justify-start">
            <SocialLinks />
          </div>
          <div className="w-full md:w-auto flex flex-col gap-6 items-start">
            <div className="flex flex-col-reverse md:flex-col gap-6 w-full">
              <EmailContact copied={copied} onCopy={handleCopy} />
              <div className="w-full md:w-auto">
                <Button
                  href="http://localhost:3001"
                  className="w-full md:w-auto text-center"
                >
                  free tech consultation
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-6 items-center md:items-start text-center md:text-left mt-4 md:mt-0">
            <div className="logo flex flex-col md:flex-row items-center gap-2 md:gap-1">
              <Image src="/footer/logo.svg" alt="logo" width={33} height={29} />
              <p className="text-xl sm:text-2xl font-medium leading-6 uppercase">
                Silk Road Professionals
              </p>
            </div>
            <span className="text-sm text-gray-400 max-w-sm leading-relaxed px-4 md:px-0">
              Since 2013, we are a team of designers and engineers building
              high-quality software for Western companies through clear
              communication and trust.
            </span>
          </div>
        </div>
        <div className="mt-4 lg:mt-6 4xl:mt-8 pt-4 lg:pt-6 4xl:pt-8 border-t border-white/25 text-center text-sm md:text-lg text-gray-500">
          © {year} Silk Road Professionals. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
