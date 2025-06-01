"use client";

import type React from "react";

import { usePathname } from "next/navigation";

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  const pathname = usePathname();
  const isPrimaryBg = pathname === "/";
  const isSecondaryBg = pathname === "/quiz";
//   const isTertiaryBg = pathname === "/details" || pathname === "/thank-you";

  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('/background/${
            isPrimaryBg
              ? "bg_primary.jpg"
              : isSecondaryBg
              ? "bg_secondary.jpg"
              : "bg_tertiary.jpg"
          }')`,
        }}
      />

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen">{children}</div>
    </div>
  );
}
