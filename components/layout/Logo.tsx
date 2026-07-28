"use client";

import { useState } from "react";
import Image from "next/image";

const LOGO_URL = "https://dbmscsteel.ae/wp-content/uploads/2022/06/logo-2.svg";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Fallback wordmark if the remote logo can't be reached
    return (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-sm font-extrabold text-white">
          D
        </div>
        <span
          className={
            variant === "dark"
              ? "text-lg font-extrabold tracking-tight text-white"
              : "text-lg font-extrabold tracking-tight text-ink-900"
          }
        >
          DBMSC
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-8 w-[132px]">
      <Image
        src={LOGO_URL}
        alt="DBMSC Steel"
        fill
        sizes="132px"
        style={{ objectFit: "contain", objectPosition: "left center" }}
        className={variant === "dark" ? "brightness-0 invert" : ""}
        unoptimized
        onError={() => setFailed(true)}
      />
    </div>
  );
}
