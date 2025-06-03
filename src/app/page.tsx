"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with social icons */}
      <header className="relative overflow-hidden h-12">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-animated"></div>

        {/* Content */}
        <div className="relative z-10 flex justify-end items-center h-12 px-4 md:px-6">
          <div className="flex space-x-4">
            <Instagram className="w-5 h-5 text-white hover:text-yellow-500 cursor-pointer transition-colors" />
            <Facebook className="w-5 h-5 text-white hover:text-yellow-500 cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-white hover:text-yellow-500 cursor-pointer transition-colors" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-light mb-2">
                Forbes
              </h1>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                BUSINESS
              </h2>
              <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
                CLUB
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-white text-sm md:text-base mb-8">
              Egy visszajelzés neked – és nekünk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="text-white text-3xl md:text-4xl lg:text-5xl font-light mb-8">
              Adaptív vezető kutatás
            </h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
              Ez a felmérés több, mint egy önértékelés: közös tükör, amelyben
              megmutatkozik, mennyire vagy ma adaptív vezető. Segít
              feltérképezni, hogyan reagálsz a változásokra, tartasz irányt a
              bizonytalanságban, és inspirálsz másokat. A kitöltést követően
              írásos értékelést küldünk, amely személyre szabott visszajelzést
              ad erősségeidről és fejlesztési lehetőségeidről. Te megismered
              magadat vezetőként, mi pedig tanulunk belőled – együtt építve a
              jövő vezetését. Kezdjük el – nézd meg, hol tartasz, és hova
              léphetsz tovább
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              onClick={() => router.push("/quiz")}
              className="text-white px-8 py-3 text-lg rounded-sm transition-all duration-300 transform hover:scale-105 w-fit md:w-[300px] lg:w-[380px] h-[58px]"
              style={{
                background: "linear-gradient(to right, #8C5728, #CD935F)",
              }}
            >
              Kitöltöm
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-white text-xs mt-6">
              A felmérés kitöltése körülbelül 10 percet vesz igénybe
            </p>
          </motion.div>
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
