import { ServerClient } from "postmark";
import { NextResponse } from "next/server";

const POSTMARK_TOKEN = process.env.POSTMARK_API_TOKEN;
const DEFAULT_FROM = process.env.POSTMARK_FROM || "no-reply@genrobotics.org";
const RECIPIENTS = (process.env.CONTACT_RECIPIENTS || "").split(",").map(r => r.trim()).filter(Boolean) || [
  "email1@example.com",
  "email2@example.com",
];

export async function POST(request) {
  if (!POSTMARK_TOKEN) {
    console.error("POSTMARK_API_TOKEN is not set");
    return NextResponse.json({ message: "Mail service not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { firstName, lastName, email, message } = body || {};

    // Basic server-side validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }
    
    const client = new ServerClient(POSTMARK_TOKEN);

    const subject = `New Contact Form Message from ${firstName} ${lastName}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>From:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 3px; margin-top: 10px;">
            ${message.replace(/\n/g, "<br/>")}
          </div>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This message was sent via the contact form on your website. 
          Reply directly to this email to respond to ${firstName}.
        </p>
      </div>
    `;

    // Send to each recipient (Postmark supports multiple To addresses, but we'll send a single message with multiple recipients)
    const sendResult = await client.sendEmail({
      From: DEFAULT_FROM, // Use verified sender signature
      To: RECIPIENTS.join(", "),
      Subject: subject,
      HtmlBody: html,
      ReplyTo: email, // Allow recipients to reply directly to the user
    });

    // Postmark returns a structure; treat any error as failure
    if (!sendResult || sendResult.ErrorCode) {
      console.error("Postmark send error:", sendResult);
      return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending mail:", error);
    
    // Handle specific Postmark errors
    if (error.code === 412) {
      return NextResponse.json({ 
        message: "Email service is currently being set up. Please try again later or contact us directly." 
      }, { status: 500 });
    }
    
    if (error.code === 400 && error.message && error.message.includes("Sender Signature")) {
      return NextResponse.json({ 
        message: "Email service configuration issue. Please contact us directly." 
      }, { status: 500 });
    }
    
    if (error.message && error.message.includes("domain")) {
      return NextResponse.json({ 
        message: "Email service configuration issue. Please contact us directly." 
      }, { status: 500 });
    }
    
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}