import { NextResponse } from "next/server";
import { getSurveyStats } from "@/lib/database";

export async function GET() {
  try {
    const stats = await getSurveyStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching survey stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
