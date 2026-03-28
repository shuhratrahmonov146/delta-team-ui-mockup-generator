"use client";

import { usePathname } from "next/navigation";
import { ScrollHeader } from "./ScrollHeader";

export default function ScrollHeaderWithConditional() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) return null;

  return <ScrollHeader />;
}
