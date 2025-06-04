"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  validateEmailFormat,
  saveUserData,
  sendResultEmail,
} from "@/lib/api-service";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  name: string;
  email: string;
  company: string;
  position: string;
  termAndCondition: boolean;
}

export default function DetailsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      termAndCondition: false,
    },
  });

  const watchTermAndCondition = watch("termAndCondition");

  const validateEmailAddress = (email: string): boolean => {
    const validation = validateEmailFormat(email);

    if (!validation.isValid) {
      setEmailError(validation.message);
      setError("email", { type: "manual", message: validation.message });
      return false;
    }

    setEmailError("");
    clearErrors("email");
    return true;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setEmailError("");

    try {
      // Validate email format
      const isEmailValid = validateEmailAddress(data.email);
      if (!isEmailValid) {
        setIsSubmitting(false);
        return;
      }

      // Validate terms and conditions
      if (!data.termAndCondition) {
        setError("termAndCondition", {
          type: "manual",
          message: "A GDPR feltételek elfogadása kötelező",
        });
        setIsSubmitting(false);
        return;
      }

      // Get survey answers from localStorage
      const answersJson = localStorage.getItem("quizAnswers");
      if (!answersJson) {
        throw new Error("No survey answers found");
      }

      const quizResults = JSON.parse(answersJson);
      const rawAnswers = quizResults.answers; // Extract only the answers part
      const categoryResults = quizResults.categoryResults; // For email bar chart

      // Calculate averageScore from raw answers
      const answerValues = Object.values(rawAnswers).map(Number);
      const averageScore =
        answerValues.length > 0
          ? answerValues.reduce((sum, val) => sum + val, 0) /
            answerValues.length
          : 0;

      // Save to database
      const saveResponse = await saveUserData({
        ...data,
        responses: rawAnswers, // Send only the answers part
        averageScore: averageScore,
        termAndCondition: data.termAndCondition, // Pass the boolean value
      });

      if (!saveResponse.success) {
        throw new Error(saveResponse.message);
      }

      // Prepare results for email (including category percentages for bar chart)
      const results = {
        averageScore: averageScore,
        categoryResults: categoryResults, // Pass category results for the email
      };

      // Send email with results
      await sendResultEmail(data, results);

      // Clear localStorage
      localStorage.removeItem("quizAnswers");

      // Navigate to thank you page
      router.push("/thank-you");
    } catch (error) {
      toast.error(
        error
          ? `${error}`
          : "Failed to submit the form, please try again, or do the survey again."
      );
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="border-[3px] border-l-[1px] border-orange-500 rounded-lg">
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl relative z-10">
            <h1 className="text-white text-2xl font-bold mb-2">
              Kérem az eredményemet!
            </h1>

            <p className="text-white/80 text-sm mb-6">
              Az alábbi adatok megadása után elküldjük az Ön személyre szabott
              értékelését az adaptív vezető felmérés alapján.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="text-white text-sm block mb-2">
                  Kérjük adja meg a nevét! *
                </label>
                <Input
                  {...register("name", { required: "A név megadása kötelező" })}
                  placeholder="Név"
                  className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-white text-sm block mb-2">
                  Kérjük adja meg az e-mail címét! *
                </label>
                <Input
                  {...register("email", {
                    required: "Az e-mail cím megadása kötelező",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Érvénytelen e-mail cím",
                    },
                  })}
                  type="email"
                  placeholder="Email"
                  className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                />
                {(errors.email || emailError) && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email?.message || emailError}
                  </p>
                )}
              </div>

              <div>
                <label className="text-white text-sm block mb-2">
                  Kérjük adja meg a cégnevét! *
                </label>
                <Input
                  {...register("company", {
                    required: "A cégnév megadása kötelező",
                  })}
                  placeholder="Cégnév"
                  className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                />
                {errors.company && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.company.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-white text-sm block mb-2">
                  Kérjük adja meg a pozícióját! *
                </label>
                <Input
                  {...register("position", {
                    required: "A pozíció megadása kötelező",
                  })}
                  placeholder="Pozíció"
                  className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                />
                {errors.position && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.position.message}
                  </p>
                )}
              </div>

              {/* GDPR Terms and Conditions Checkbox */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="termAndCondition"
                  checked={watchTermAndCondition}
                  onCheckedChange={(checked) => {
                    setValue("termAndCondition", checked as boolean);
                    if (checked) {
                      clearErrors("termAndCondition");
                    }
                  }}
                  className="mt-1 border-white/30 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                />
                <div className="flex-1">
                  <label
                    htmlFor="termAndCondition"
                    className="text-white text-sm cursor-pointer"
                  >
                    Elfogadom a GDPR feltételeit *
                  </label>
                  {errors.termAndCondition && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.termAndCondition.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="text-white px-8 py-3 text-lg rounded-sm h-[50px] min-h-[50px] transition-all duration-300 transform hover:scale-105 w-full"
                style={{
                  background: "linear-gradient(to right, #8C5728, #CD935F)",
                }}
              >
                {isSubmitting ? "Küldés..." : "Küldés"}
              </Button>
            </form>
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
      </motion.div>
    </div>
  );
}
