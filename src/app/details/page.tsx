"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { calculateSurveyResults } from "@/lib/quiz-utils"
import { validateEmailFormat, saveUserData, sendResultEmail } from "@/lib/api-service"

interface FormData {
  name: string
  email: string
  company: string
  position: string
}

export default function DetailsPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormData>()

  const validateEmailAddress = (email: string): boolean => {
    const validation = validateEmailFormat(email)

    if (!validation.isValid) {
      setEmailError(validation.message)
      setError("email", { type: "manual", message: validation.message })
      return false
    }

    setEmailError("")
    clearErrors("email")
    return true
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setEmailError("")

    try {
      // Validate email format
      const isEmailValid = validateEmailAddress(data.email)
      if (!isEmailValid) {
        setIsSubmitting(false)
        return
      }

      // Get survey answers from localStorage
      const answersJson = localStorage.getItem("quizAnswers")
      if (!answersJson) {
        throw new Error("No survey answers found")
      }

      const answers = JSON.parse(answersJson)
      const results = calculateSurveyResults(answers)

      // Save to database
      const saveResponse = await saveUserData({
        ...data,
        responses: answers,
        averageScore: results.averageScore,
      })

      if (!saveResponse.success) {
        if (saveResponse.message?.includes("már kitöltötték")) {
          setEmailError("Ezzel az e-mail címmel már kitöltötték a felmérést")
          setError("email", { type: "manual", message: "Ezzel az e-mail címmel már kitöltötték a felmérést" })
          setIsSubmitting(false)
          return
        }
        throw new Error(saveResponse.message)
      }

      // Send email with results
      await sendResultEmail(data, results)

      // Clear localStorage
      localStorage.removeItem("quizAnswers")

      // Navigate to thank you page
      router.push("/thank-you")
    } catch (error) {
      console.error("Error submitting form:", error)

      // if (error.response?.data?.message?.includes("már kitöltötték")) {
      //   setEmailError("Ezzel az e-mail címmel már kitöltötték a felmérést")
      //   setError("email", { type: "manual", message: "Ezzel az e-mail címmel már kitöltötték a felmérést" })
      // } else {
      //   alert("Hiba történt az adatok elküldése során. Kérjük, próbálja újra.")
      // }
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <h1 className="text-white text-2xl font-bold mb-2 text-center">Kérem az eredményemet!</h1>

            <p className="text-white/80 text-sm mb-6 text-center">
              Az alábbi adatok megadása után elküldjük az Ön személyre szabott értékelését az adaptív vezető felmérés
              alapján.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="text-white text-sm block mb-2">Kérjük adja meg a nevét! *</label>
                <Input
                  {...register("name", { required: "A név megadása kötelező" })}
                  placeholder="Név"
                  className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-white text-sm block mb-2">Kérjük adja meg az e-mail címét! *</label>
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
                  <p className="text-red-400 text-xs mt-1">{errors.email?.message || emailError}</p>
                )}
              </div>

              <div>
                <label className="text-white text-sm block mb-2">Kérjük adja meg a cégnevét! *</label>
                <Input
                  {...register("company", { required: "A cégnév megadása kötelező" })}
                  placeholder="Cégnév"
                  className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                />
                {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>}
              </div>

              <div>
                <label className="text-white text-sm block mb-2">Kérjük adja meg a pozícióját! *</label>
                <Input
                  {...register("position", { required: "A pozíció megadása kötelező" })}
                  placeholder="Pozíció"
                  className="bg-black/20 border-white/30 text-white placeholder:text-white/50"
                />
                {errors.position && <p className="text-red-400 text-xs mt-1">{errors.position.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg disabled:opacity-50"
              >
                {isSubmitting ? "Küldés..." : "Küldés"}
              </Button>
            </form>
          </div>
        </div>

        <footer className="mt-8 text-center">
          <p className="text-white text-xs">by Viktor Lenartson, Copyright ZEL Group</p>
        </footer>
      </motion.div>
    </div>
  )
}
