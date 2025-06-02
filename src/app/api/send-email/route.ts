import { type NextRequest, NextResponse } from "next/server";
import mailgun from "mailgun-js";
import { generateEmailTemplate } from "@/lib/email.template";

export async function POST(request: NextRequest) {
  try {
    const { userData, results, theme = "light" } = await request.json();

    // Generate HTML email template with specified theme
    const htmlTemplate = generateEmailTemplate(userData, results, theme);

    // Initialize Mailgun with environment variables
    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY || "",
      domain: process.env.MAILGUN_DOMAIN || "",
    });

    // Prepare email data
    const data = {
      from: `Forbes Business Club <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: userData.email,
      subject: `Az Ön adaptív vezető felmérés eredménye (${
        theme === "dark" ? "Sötét" : "Világos"
      } téma)`,
      html: htmlTemplate,
    };

    // Send email
    await new Promise((resolve, reject) => {
      mg.messages().send(data, (error, body) => {
        if (error) {
          console.error("Mailgun error:", error);
          reject(error);
        } else {
          console.log("Email sent successfully:", body);
          resolve(body);
        }
      });
    });

    return NextResponse.json({
      success: true,
      message: `Email sent successfully with ${theme} theme`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
