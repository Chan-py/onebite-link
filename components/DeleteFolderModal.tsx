"use client";

import { useEffect } from "react";
import type { Folder } from "@/app/_lib/types";

type DeleteFolderModalProps = {
  folder: Folder;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteFolderModal({ folder, onClose, onConfirm }: DeleteFolderModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[rgba(55,53,47,0.09)] bg-white p-6 shadow-[0_3px_6px_rgba(0,0,0,0.12),0_9px_24px_rgba(0,0,0,0.16)] dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525]"
      >
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold text-[#37352F] dark:text-[#E9E9E7]">
            폴더 삭제
          </h2>
          <p className="text-sm text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]">
            &lsquo;{folder.name}&rsquo; 폴더를 삭제할까요? 이 작업은 되돌릴 수 없어요.
          </p>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[rgba(55,53,47,0.09)] pt-5 dark:border-[rgba(255,255,255,0.09)]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-[rgba(55,53,47,0.65)] transition-colors duration-150 ease-in-out hover:bg-[#F1F1EF] dark:text-[rgba(255,255,255,0.6)] dark:hover:bg-[#2A2A2A]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-[#EB5757] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-[#d64545] dark:bg-[#E06060] dark:hover:bg-[#c94f4f]"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
