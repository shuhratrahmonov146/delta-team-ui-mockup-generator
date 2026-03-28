"use server";

interface BookingState {
  message: string;
  success: boolean;
  meetLink?: string;
}

export async function submitBooking(
  prevState: BookingState | null,
  formData: FormData
): Promise<BookingState> {
  try {
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const company = formData.get("company")?.toString().trim();
    const date = formData.get("date")?.toString();
    const time = formData.get("time")?.toString();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !date || !time) {
      return {
        message: "Please fill in all required fields",
        success: false,
      };
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000");

    const response = await fetch(`${baseUrl}/api/calendar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        company: company || undefined,
        date,
        time,
        description: message || undefined,
        id: `booking-${Date.now()}`,
        submittedAt: new Date().toISOString(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        message: data.error || "Failed to create booking. Please try again.",
        success: false,
      };
    }

    return {
      message: "Booking confirmed! You will receive a calendar invite shortly.",
      success: true,
      meetLink: data.link,
    };
  } catch (error: unknown) {
    console.error("Booking error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred. Please try again later.";

    return {
      message: errorMessage,
      success: false,
    };
  }
}
