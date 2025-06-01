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

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Store answers in localStorage and navigate to details
      localStorage.setItem("quizAnswers", JSON.stringify(answers));
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
              <div className="flex flex-col items-center mb-12">
                {/* Numbers in a line */}
                <div className="flex justify-between w-full max-w-md mb-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="text-white text-lg font-medium">
                      {num}
                    </div>
                  ))}
                </div>

                {/* Thin-to-fatty-to-thin border */}
                <div className="w-full max-w-md h-1 bg-gradient-to-r from-transparent via-white to-transparent mb-6"></div>

                {/* Radio buttons below */}
                <div className="flex justify-between w-full max-w-md">
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

                {/* Labels */}
                <div className="flex justify-between w-full max-w-md mt-2">
                  <span className="text-white text-xs">
                    Egyáltalán nem értek egyet
                  </span>
                  <span className="text-white text-xs">
                    Teljes mértékben egyetértek
                  </span>
                </div>
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
              <ChevronLeft className="w-4 h-4 mr-2" />
              Előző
            </Button>

            <span className="text-white text-sm">
              {currentQuestion + 1} / {quizData.questions.length}
            </span>

            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              className="bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50"
            >
              {currentQuestion === quizData.questions.length - 1
                ? "Befejezés"
                : "Következő"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12">
        <p className="text-white text-xs">
          by Viktor Lenartson, Copyright ZEL Group
        </p>
      </footer>
    </div>
  );
}
