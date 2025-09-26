import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render, pretty } from "@react-email/render";

import { EmailTemplate } from "@/components/template/Email";

export async function POST(request: Request) {
  const body = await request.json();
  const { senderName, senderEmail, reasonToContact, senderMsg } = body;

  // Validate input
  if (
    !senderName ||
    !senderEmail ||
    !reasonToContact ||
    !senderMsg ||
    typeof senderName !== "string" ||
    typeof senderEmail !== "string" ||
    typeof reasonToContact !== "string" ||
    typeof senderMsg !== "string"
  ) {
    return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
  }

  // Render email template
  const htmlContent = await pretty(
    await render(
      EmailTemplate({
        userName: senderName,
        contactReason: reasonToContact,
        userMessage: senderMsg,
      })
    )
  );

  // Email message
  const message = {
    from: `"Zaheer Ali Shaikh - Contact Team" <${process.env.EMAIL_FROM}>`,
    to: `${senderName} <${senderEmail}>`,
    subject: "Your message has reached Zaheer Ali Shaikh 🚀",
    html: htmlContent,
    headers: {
      "X-Entity-Ref-ID": "contact-email",
    },
  };

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail(message);
    return NextResponse.json(
      {
        message: `Email successfully sent to ${senderEmail}`,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(`Error sending email to ${senderEmail}:`, err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}