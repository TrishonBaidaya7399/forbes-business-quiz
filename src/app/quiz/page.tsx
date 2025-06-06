"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { quizData } from "@/lib/quiz-data";

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>("");
  console.log({ answers });

  useEffect(() => {
    setSelectedOption(answers[currentQuestion] || "");
  }, [currentQuestion, answers]);

  const handleAnswerSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionId,
    }));
  };

  // Function to calculate category-based results
  const calculateCategoryResults = () => {
    const categoryResults: { [key: string]: {
      category: string;
      value: number;
      totalQuestions: number;
      totalScore: number;
      maxScore: number;
    } } = {};

    // Group questions by category
    const questionsByCategory: { [key: string]: { questionIndex: number; question: typeof quizData.questions[number] }[] } = {};
    quizData.questions.forEach((question, index) => {
      const category = question.category;
      if (!questionsByCategory[category]) {
        questionsByCategory[category] = [];
      }
      questionsByCategory[category].push({
        questionIndex: index,
        question: question,
      });
    });

    // Calculate percentage for each category
    Object.keys(questionsByCategory).forEach((category) => {
      const categoryQuestions = questionsByCategory[category];
      let totalScore = 0;
      const maxPossibleScore = categoryQuestions.length * 5; // Assuming max score is 5 per question

      categoryQuestions.forEach(({ questionIndex }) => {
        const answer = answers[questionIndex];
        if (answer) {
          totalScore += parseInt(answer);
        }
      });

      // Calculate percentage (0-100)
      const percentage =
        maxPossibleScore > 0
          ? Math.round((totalScore / maxPossibleScore) * 100)
          : 0;

      categoryResults[category] = {
        category: category,
        value: percentage,
        totalQuestions: categoryQuestions.length,
        totalScore: totalScore,
        maxScore: maxPossibleScore,
      };
    });

    return categoryResults;
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate category-based results
      const categoryResults = calculateCategoryResults();

      // Convert to array format for API
      const resultsArray = Object.values(categoryResults).map((result) => ({
        category: result.category,
        value: result.value,
      }));

      // Store both answers and calculated results
      const quizResults = {
        answers: answers,
        categoryResults: resultsArray,
        detailedResults: categoryResults,
      };

      // Store results (you can modify this to send to API)
      console.log("Quiz Results:", quizResults);

      // Store answers in localStorage and navigate to details
      localStorage.setItem("quizAnswers", JSON.stringify(quizResults));
      router.push("/details");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const question = quizData.questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-white text-2xl md:text-3xl font-light mb-2">
          Forbes
        </h1>
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
          BUSINESS
        </h2>
        <h3 className="text-white text-3xl md:text-4xl font-bold mb-8">CLUB</h3>
        <div className="w-24 h-0.5 bg-white mx-auto"></div>
      </motion.div>

      {/* Question Content */}
      <div className="w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed mb-16">
                {question.question}
              </h2>

              {/* Rating scale with numbers in a line and thin-to-fatty-to-thin border */}
              {/* Labels */}
              <div className="flex gap-4 md:gap-10 lg:gap-[80px] w-full mt-2 justify-center items-center">
                <span className="text-white text-xs h-fit">
                  Egyáltalán nem értek egyet
                </span>
                <div className="flex flex-col items-center">
                  {/* Numbers in a line */}
                  <div className="flex justify-between gap-2 md:gap-4 lg:gap-8 w-full mb-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="text-white text-lg font-medium">
                        {num}
                      </div>
                    ))}
                  </div>

                  {/* Thin-to-fatty-to-thin border */}
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent mb-6"></div>

                  {/* Radio buttons below */}
                  <div className="flex justify-between gap-2 md:gap-4 lg:gap-8 w-full">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleAnswerSelect(num.toString())}
                        className="flex flex-col items-center"
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 border-white transition-all duration-300 ${
                            selectedOption === num.toString()
                              ? "bg-white"
                              : "bg-transparent hover:bg-white/20"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <span className="text-white text-xs h-fit">
                  Teljes mértékben egyetértek
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8">
          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="text-white hover:bg-white/10 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Előző
            </Button>

            <span className="text-white text-sm">
              {currentQuestion + 1} / {quizData.questions.length}
            </span>

            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              className="hover:bg-orange-700 text-white disabled:opacity-50"
              style={{
                background: "linear-gradient(to right, #8C5728, #CD935F)",
              }}
            >
              {currentQuestion === quizData.questions.length - 1
                ? "Befejezés"
                : "Következő"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6"
      >
        <p className="text-white text-xs">
          by Viktor Lenartson, Copyright ZEL Group
        </p>
      </motion.footer>
    </div>
  );
}
