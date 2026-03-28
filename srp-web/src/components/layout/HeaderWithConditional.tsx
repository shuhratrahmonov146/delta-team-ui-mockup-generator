"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

export default function HeaderWithConditional() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) return null;

  return <Header />;
}
