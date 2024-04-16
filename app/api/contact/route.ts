import { NextResponse } from "next/server";
import { mailOptions, transporter } from "@/lib/nodeMailer";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message } = body;
  if (!email || !message) {
    return NextResponse.json(
      { message: "Email and message are required" },
      { status: 400 }
    );
  }
  try {
    await transporter.sendMail(
      mailOptions(name, email, phone, message),
      function (error) {
        if (error) {
          return NextResponse.json(
            { message: `Internal Server Error: ${error.message}` },
            { status: 500 }
          );
        } else {
          return NextResponse.json(
            { message: "Message sent successfully" },
            { status: 200 }
          );
        }
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: `Internal Server Error: ${e.message}` },
      { status: 500 }
    );
  }
}
