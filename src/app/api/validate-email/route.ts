// import { validateEmail } from "@/lib/api-service";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { isValid: false, message: "E-mail cím szükséges" },
        { status: 400 }
      );
    }

    // const validation = await validateEmail(email);

    // return NextResponse.json(validation);
  } catch (error) {
    console.error("Email validation API error:", error);
    return NextResponse.json(
      { isValid: false, message: "E-mail validáció sikertelen" },
      { status: 500 }
    );
  }
}
