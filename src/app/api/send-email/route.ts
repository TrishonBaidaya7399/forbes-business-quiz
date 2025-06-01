import { generateEmailTemplate } from "@/lib/email.template";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userData, results, theme = "light" } = await request.json();

    // Generate HTML email template with specified theme
    const htmlTemplate = generateEmailTemplate(userData, results, theme);
    console.log(htmlTemplate);
    // Here you would integrate with Mailgun
    // For now, we'll simulate the email sending
    console.log("Sending email to:", userData.email);
    console.log("Email theme:", theme);
    console.log("Email template generated");

    // Mailgun integration would go here:
    // const mailgun = require('mailgun-js')({
    //   apiKey: process.env.MAILGUN_API_KEY,
    //   domain: process.env.MAILGUN_DOMAIN
    // })

    // await mailgun.messages().send({
    //   from: 'Forbes Business Club <noreply@forbesbusinessclub.com>',
    //   to: userData.email,
    //   subject: `Az Ön adaptív vezető felmérés eredménye (${theme === 'dark' ? 'Sötét' : 'Világos'} téma)`,
    //   html: htmlTemplate
    // })

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
