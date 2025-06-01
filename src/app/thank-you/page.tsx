"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  const handleReturnToSite = () => {
    window.open("https://forbes.hu", "_blank")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-white text-2xl md:text-3xl font-light mb-2">Forbes</h1>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">BUSINESS</h2>
          <h3 className="text-white text-3xl md:text-4xl font-bold">CLUB</h3>
        </div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light mb-12">Köszönjük a kitöltést!</h1>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={handleReturnToSite}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-md transition-all duration-300 transform hover:scale-105"
          >
            Vissza a Forbes Business Club oldalára
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16"
        >
          <p className="text-white text-xs">by Viktor Lenartson, Copyright ZEL Group</p>
        </motion.footer>
      </motion.div>
    </div>
  )
}
