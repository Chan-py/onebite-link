"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
  variant?: "error" | "success";
};

const VARIANT_CLASSES: Record<NonNullable<ToastProps["variant"]>, string> = {
  error:
    "border-[rgba(235,87,87,0.24)] bg-[#FFE2DD] text-[#C4554D] dark:border-[rgba(224,96,96,0.32)] dark:bg-[#3A2320] dark:text-[#E06060]",
  success:
    "border-[rgba(84,129,100,0.24)] bg-[#DBEDDB] text-[#548164] dark:border-[rgba(127,191,152,0.32)] dark:bg-[#1F2B22] dark:text-[#7FBF98]",
};

export default function Toast({ message, onClose, variant = "error" }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="alert"
      className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-md border px-4 py-3 text-sm font-medium shadow-[0_3px_6px_rgba(0,0,0,0.12),0_9px_24px_rgba(0,0,0,0.16)] ${VARIANT_CLASSES[variant]}`}
    >
      {message}
    </div>
  );
}
