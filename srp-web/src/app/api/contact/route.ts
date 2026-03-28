import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { SMTP_EMAIL, SMTP_PASSWORD, NEXT_PUBLIC_COMPANY_EMAIL } =
      process.env;

    if (!SMTP_EMAIL || !SMTP_PASSWORD || !NEXT_PUBLIC_COMPANY_EMAIL) {
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error (Missing .env variables)",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, email, phone, message, services } = body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #0f1035; text-align: center;">📩 New Lead from Website</h2>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />

        <div style="margin-bottom: 15px;">
          <p style="margin: 5px 0;"><strong>👤 Name:</strong> ${firstName} ${lastName}</p>
          <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #1283BB; text-decoration: none;">${email}</a></p>
          ${phone ? `<p style="margin: 5px 0;"><strong>📞 Phone:</strong> ${phone}</p>` : ""}
        </div>

        ${
          services && services.length > 0
            ? `<div style="background-color: #f0f8ff; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
                 <strong>🛠 Interested Services:</strong><br/> ${services.join(", ")}
               </div>`
            : ""
        }

        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #0f1035;">
          <p style="margin-top: 0; color: #888; font-size: 12px; text-transform: uppercase;">Message:</p>
          <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #aaa;">
          Sent via SRP Software Contact Form
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"SRP Website Bot" <${SMTP_EMAIL}>`,
      to: NEXT_PUBLIC_COMPANY_EMAIL,
      replyTo: email,
      subject: `New Inquiry: ${firstName} ${lastName}`,
      html: htmlContent,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
