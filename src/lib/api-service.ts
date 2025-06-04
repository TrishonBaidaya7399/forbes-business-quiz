import axios from "axios";

// Configure axios with backend URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      "Making API request:",
      config.method?.toUpperCase(),
      config.url
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface UserSubmissionData {
  name: string;
  email: string;
  company: string;
  position: string;
  responses: Record<number, string>;
  averageScore: number;
  termAndCondition: boolean;
}

// Simple client-side email validation
export function validateEmailFormat(email: string): {
  isValid: boolean;
  message: string;
} {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, message: "E-mail cím szükséges" };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Érvénytelen e-mail formátum" };
  }

  return { isValid: true, message: "Email format is valid" };
}

export async function saveUserData(data: UserSubmissionData) {
  try {
    const response = await api.post("/survey-submission", data);
    return response.data;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendResultEmail(userData: any, results: any) {
  try {
    const response = await api.post("/send-email", {
      userData,
      results,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function getSurveySubmissions() {
  try {
    const response = await api.get("/survey-submissions");
    return response.data;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
}

export async function getSurveyStats() {
  try {
    const response = await api.get("/survey-stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
}

export { api };
