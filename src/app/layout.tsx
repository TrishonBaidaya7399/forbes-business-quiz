import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundWrapper } from "@/components/background-wrapper";
import { Toaster } from "@/components/ui/sonner";

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
          <BackgroundWrapper>{children}</BackgroundWrapper>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
