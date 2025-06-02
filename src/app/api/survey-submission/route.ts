import { type NextRequest, NextResponse } from "next/server";
import {
  saveSurveySubmission,
  getSurveySubmissionByEmail,
} from "@/lib/database";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Check if user has already submitted
    const existingSubmission = await getSurveySubmissionByEmail(data.email);
    if (existingSubmission) {
      return NextResponse.json(
        {
          success: false,
          message: "Ezzel az e-mail címmel már kitöltötték a felmérést",
        },
        { status: 409 }
      );
    }

    const submissionData = {
      name: data.name,
      email: data.email,
      company: data.company,
      position: data.position,
      responses: data.responses,
      averageScore: data.averageScore,
      submittedAt: new Date(),
    };

    const result = await saveSurveySubmission(submissionData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Survey submission saved successfully",
        id: result.id,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to save survey submission" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error saving survey submission:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save survey submission" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { getSurveySubmissions } = await import("@/lib/database");
    const submissions = await getSurveySubmissions(50);

    return NextResponse.json({
      success: true,
      data: submissions,
      count: submissions.length,
    });
  } catch (error) {
    console.error("Error fetching survey submissions:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
