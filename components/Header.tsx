"use client";

import { useState } from "react";
import Link from "next/link";
import NewFolderModal from "./NewFolderModal";

type HeaderProps = {
  onCreateFolder: (name: string) => void;
};

export default function Header({ onCreateFolder }: HeaderProps) {
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  const handleCreateFolder = (name: string) => {
    onCreateFolder(name);
    setIsFolderModalOpen(false);
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[rgba(55,53,47,0.09)] px-6 dark:border-[rgba(255,255,255,0.09)]">
      <h1 className="flex items-center gap-1.5 text-[15px] font-semibold tracking-tight text-[#37352F] dark:text-[#E9E9E7]">
        <span aria-hidden="true">📎</span>
        한입 링크
      </h1>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsFolderModalOpen(true)}
          className="flex items-center gap-1.5 rounded-md border border-[rgba(55,53,47,0.16)] px-4 py-2 text-sm font-medium text-[#37352F] transition-colors duration-150 ease-in-out hover:bg-[#F1F1EF] dark:border-[rgba(255,255,255,0.09)] dark:text-[#E9E9E7] dark:hover:bg-[#2A2A2A]"
        >
          <span className="text-base leading-none">+</span>
          새 폴더
        </button>
        <Link
          href="/new"
          className="flex items-center gap-1.5 rounded-md bg-[#2F3437] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-[#454341] dark:bg-[#E9E9E7] dark:text-[#2F3437] dark:hover:bg-[#c9c9c7]"
        >
          <span className="text-base leading-none">+</span>
          새 링크
        </Link>
      </div>
      {isFolderModalOpen && (
        <NewFolderModal
          onClose={() => setIsFolderModalOpen(false)}
          onCreate={handleCreateFolder}
        />
      )}
    </header>
  );
}
