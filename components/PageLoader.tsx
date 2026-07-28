"use client";

import Image from "next/image";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">

        <Image
          src="/logo.svg"
          alt="DBMSC Steel"
          width={220}
          height={90}
          priority
        />

        <div className="mt-8 h-12 w-12 animate-spin rounded-full border-[4px] border-orange-200 border-t-[#F36F21]" />

        <p className="mt-6 text-lg font-semibold text-gray-800">
          Preparing your workspace...
        </p>
      </div>
    </div>
  );
}