import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forbes Business Club - Adaptív Vezető Kutatás",
  description: "Adaptív vezető kutatás - Forbes Business Club",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative min-h-screen">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
              style={{ backgroundImage: "url('/background/bg_primary.jpg')" }}
            />

            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* Content */}
            <div className="relative z-20 min-h-screen">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
