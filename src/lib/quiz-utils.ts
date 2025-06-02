import { quizData } from "./quiz-data";

export interface SurveyResponse {
  totalQuestions: number;
  responses: Array<{
    questionId: number;
    question: string;
    userResponse: string;
    responseText: string;
    options: Array<{ id: string; text: string }>;
  }>;
  averageScore: number;
}

export function calculateSurveyResults(
  userAnswers: Record<number, string>
): SurveyResponse {
  const detailedResponses = [];
  let totalScore = 0;

  for (let i = 0; i < quizData.questions.length; i++) {
    const question = quizData.questions[i];
    const userResponse = userAnswers[i];
    const responseOption = question.options.find(
      (opt) => opt.id === userResponse
    );

    // Convert response to numeric value for average calculation
    const numericValue = Number.parseInt(userResponse) || 0;
    totalScore += numericValue;

    detailedResponses.push({
      questionId: question.id,
      question: question.question,
      userResponse: userResponse || "",
      responseText: responseOption?.text || "",
      options: question.options,
    });
  }

  const totalQuestions = quizData.questions.length;
  const averageScore = totalQuestions > 0 ? totalScore / totalQuestions : 0;

  return {
    totalQuestions,
    responses: detailedResponses,
    averageScore: Math.round(averageScore * 100) / 100, // Round to 2 decimal places
  };
}
