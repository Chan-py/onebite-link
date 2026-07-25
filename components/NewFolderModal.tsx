"use client";

import { useEffect, useRef, useState } from "react";

type NewFolderModalProps = {
  onClose: () => void;
  onCreate: (name: string) => void;
};

export default function NewFolderModal({ onClose, onCreate }: NewFolderModalProps) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onCreate(trimmed);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <form
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[rgba(55,53,47,0.09)] bg-white p-6 shadow-[0_3px_6px_rgba(0,0,0,0.12),0_9px_24px_rgba(0,0,0,0.16)] dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525]"
      >
        <h2 className="text-lg font-semibold text-[#37352F] dark:text-[#E9E9E7]">
          새 폴더
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="folder-name"
            className="text-sm font-medium text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]"
          >
            폴더 이름
          </label>
          <input
            ref={inputRef}
            id="folder-name"
            name="folder-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="rounded-md border border-[rgba(55,53,47,0.16)] bg-white px-3 py-2 text-sm text-[#37352F] outline-none transition-colors duration-150 ease-in-out placeholder:text-[rgba(55,53,47,0.4)] focus:border-[#2383E2] focus:shadow-[0_0_0_1px_#2383E2] dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525] dark:text-[#E9E9E7] dark:placeholder:text-[rgba(255,255,255,0.4)] dark:focus:border-[#5AA7E4] dark:focus:shadow-[0_0_0_1px_#5AA7E4]"
          />
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
            type="submit"
            disabled={!name.trim()}
            className="rounded-md bg-[#2F3437] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-[#454341] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#E9E9E7] dark:text-[#2F3437] dark:hover:bg-[#c9c9c7]"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
