import axios from "axios";
import type { SurveyResponse } from "./quiz-utils";

interface UserData {
  name: string;
  email: string;
  company: string;
  position: string;
}

export async function sendResultEmail(
  userData: UserData,
  results: SurveyResponse,
  theme: "light" | "dark" = "light"
) {
  try {
    const response = await axios.post("/api/send-email", {
      userData,
      results,
      theme,
    });

    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

// Function to send both light and dark theme emails
export async function sendBothThemeEmails(
  userData: UserData,
  results: SurveyResponse
) {
  try {
    const [lightResponse, darkResponse] = await Promise.all([
      sendResultEmail(userData, results, "light"),
      sendResultEmail(userData, results, "dark"),
    ]);

    return {
      light: lightResponse,
      dark: darkResponse,
    };
  } catch (error) {
    console.error("Error sending themed emails:", error);
    throw error;
  }
}
