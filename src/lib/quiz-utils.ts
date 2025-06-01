import { quizData } from "./quiz-data"

export interface QuizResult {
  totalQuestions: number
  correctAnswers: number
  wrongAnswers: number
  score: number
  percentage: number
  answers: Array<{
    questionId: number
    question: string
    userAnswer: string
    correctAnswer: string
    isCorrect: boolean
    options: Array<{ id: string; text: string }>
  }>
}

export function calculateResults(userAnswers: Record<number, string>): QuizResult {
  let correctCount = 0
  const detailedAnswers = []

  for (let i = 0; i < quizData.questions.length; i++) {
    const question = quizData.questions[i]
    const userAnswer = userAnswers[i]
    const isCorrect = userAnswer === question.correctAnswer

    if (isCorrect) {
      correctCount++
    }

    detailedAnswers.push({
      questionId: question.id,
      question: question.question,
      userAnswer: userAnswer || "",
      correctAnswer: question.correctAnswer,
      isCorrect,
      options: question.options,
    })
  }

  const totalQuestions = quizData.questions.length
  const wrongAnswers = totalQuestions - correctCount
  const percentage = Math.round((correctCount / totalQuestions) * 100)

  return {
    totalQuestions,
    correctAnswers: correctCount,
    wrongAnswers,
    score: correctCount,
    percentage,
    answers: detailedAnswers,
  }
}
