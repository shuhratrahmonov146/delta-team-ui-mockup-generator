"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { offices } from "@/data/offices";
import OfficeCard from "@/components/ui/OfficeCard";
import ContactSidebar from "@/components/contact/ContactSidebar";
import ContactFormFields from "@/components/contact/ContactFormFields";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false,
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: null, message: "" });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const services = [
    "C# ERP systems",
    "Android/iOS Mobile Apps",
    "Odoo Python Systems",
    "3rd party integrations (quickbooks, excel, salesforce)",
    "Javascript web apps (NextJS/React/Angular)",
    "AI and Cyber Security Consulting",
    "Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!e.currentTarget.checkValidity()) {
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        message: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone,
          services: selectedServices,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message:
            "Thank you! We have received your message and will contact you soon.",
        });
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
        setPhone("");
        setSelectedServices([]);
        setTouched({
          firstName: false,
          lastName: false,
          email: false,
          message: false,
        });
      } else {
        setStatus({
          type: "error",
          message: "Failed to send message. Please try again.",
        });
      }
    } catch {
      setStatus({ type: "error", message: "Connection error." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F5F5]">
      {status.message && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none px-4">
          <div
            className={`pointer-events-auto shadow-2xl rounded-xl p-6 max-w-sm w-full transform transition-all duration-300 scale-100 flex flex-col items-center text-center gap-3 border ${
              status.type === "success"
                ? "bg-white border-green-100"
                : "bg-white border-red-100"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                status.type === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {status.type === "success" ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>

            <div>
              <h4
                className={`text-lg font-bold ${status.type === "success" ? "text-gray-900" : "text-gray-900"}`}
              >
                {status.type === "success" ? "Success!" : "Error"}
              </h4>
              <p className="text-gray-500 text-lg mt-1">{status.message}</p>
            </div>
          </div>
        </div>
      )}

      <Container>
        <div className="py-8 md:py-12 lg:py-20 font-sans text-slate-800">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-6 lg:mb-10"
            noValidate
          >
            <div className="lg:col-span-8">
              <h1 className="font-dm font-bold text-[40px] md:text-[48px] leading-tight mb-4">
                Contact our team
              </h1>
              <p className="font-dm font-normal text-base leading-6 text-[#64748B] max-w-[672px] mb-8">
                Got a question about our services? Our team is here to help.
                Fill out the form and we&apos;ll be in touch as soon as
                possible.
              </p>

              <ContactFormFields
                formData={formData}
                touched={touched}
                phone={phone}
                setPhone={setPhone}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isSubmitting={isSubmitting}
              />
            </div>
            <ContactSidebar
              services={services}
              selectedServices={selectedServices}
              handleServiceChange={handleServiceChange}
            />
          </form>

          <div className="border-t border-gray-200 pt-6 md:pt-8 lg:pt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Image
                src="/icons/location-blue.svg"
                alt=""
                width={24}
                height={24}
              />
              Our Offices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {offices.map((office, index) => (
                <OfficeCard key={index} office={office} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
