"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="alert"
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-md border border-[rgba(235,87,87,0.24)] bg-[#FFE2DD] px-4 py-3 text-sm font-medium text-[#C4554D] shadow-[0_3px_6px_rgba(0,0,0,0.12),0_9px_24px_rgba(0,0,0,0.16)] dark:border-[rgba(224,96,96,0.32)] dark:bg-[#3A2320] dark:text-[#E06060]"
    >
      {message}
    </div>
  );
}
