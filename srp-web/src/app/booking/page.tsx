"use client";

import BookingDescription from "./components/BookingDescription";
import BookingForm from "./components/BookingForm";
import { Container } from "@/components/ui/Container";

export default function BookingPage() {
  return (
    <main className="flex-1">
      <div className="h-full bg-[#1283BB] text-white font-sans">
        <Container>
          <div className="grid md:grid-cols-2 py-6 md:py-10 gap-12">
            <BookingDescription />
            <BookingForm />
          </div>
        </Container>
      </div>
    </main>
  );
}
