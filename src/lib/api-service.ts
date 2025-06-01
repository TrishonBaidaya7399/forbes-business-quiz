import axios from "axios"

// Configure axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log("Making API request:", config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

export interface UserSubmissionData {
  name: string
  email: string
  company: string
  position: string
  answers: Record<number, string>
  results: {
    totalQuestions: number
    correctAnswers: number
    wrongAnswers: number
    score: number
    percentage: number
  }
}

export async function saveUserData(data: UserSubmissionData) {
  try {
    const response = await api.post("/api/user-info", data)
    return response.data
  } catch (error) {
    console.error("Error saving user data:", error)
    throw error
  }
}

export { api }
