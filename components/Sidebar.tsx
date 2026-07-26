"use client";

import { useState } from "react";
import Link from "next/link";
import type { Folder } from "@/app/_lib/types";
import { supabase } from "@/app/_lib/supabase";
import FolderItem from "./FolderItem";
import DeleteFolderModal from "./DeleteFolderModal";
import EditFolderModal from "./EditFolderModal";

type SidebarProps = {
  folders: Folder[];
  activeFolderId?: string;
  onDeleteFolder?: (folderId: string) => void;
  onEditFolder?: (folderId: string, name: string) => void;
};

export default function Sidebar({
  folders,
  activeFolderId = "all",
  onDeleteFolder,
  onEditFolder,
}: SidebarProps) {
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);
  const isAllActive = activeFolderId === "all";

  const handleConfirmDelete = () => {
    if (folderToDelete) onDeleteFolder?.(folderToDelete.id);
    setFolderToDelete(null);
  };

  const handleSaveEdit = (name: string) => {
    if (folderToEdit) onEditFolder?.(folderToEdit.id, name);
    setFolderToEdit(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <aside className="flex w-60 shrink-0 flex-col gap-1 border-r border-[rgba(55,53,47,0.09)] bg-[#F7F6F3] px-3 py-6 dark:border-[rgba(255,255,255,0.09)] dark:bg-[#202020]">
      <Link
        href="/"
        className={`rounded-md px-3 py-1.5 text-left text-sm font-medium transition-colors duration-150 ease-in-out ${
          isAllActive
            ? "bg-[#2F3437] text-white dark:bg-[#E9E9E7] dark:text-[#2F3437]"
            : "text-[rgba(55,53,47,0.65)] hover:bg-[#EDEDEB] dark:text-[rgba(255,255,255,0.6)] dark:hover:bg-[#2A2A2A]"
        }`}
      >
        All
      </Link>
      <div className="mt-4 flex flex-col gap-1">
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            folder={folder}
            isActive={folder.id === activeFolderId}
            onEditClick={setFolderToEdit}
            onDeleteClick={setFolderToDelete}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="mt-auto rounded-md px-3 py-1.5 text-left text-sm font-medium text-[rgba(55,53,47,0.65)] transition-colors duration-150 ease-in-out hover:bg-[#EDEDEB] dark:text-[rgba(255,255,255,0.6)] dark:hover:bg-[#2A2A2A]"
      >
        로그아웃
      </button>
      {folderToDelete && (
        <DeleteFolderModal
          folder={folderToDelete}
          onClose={() => setFolderToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
      {folderToEdit && (
        <EditFolderModal
          folder={folderToEdit}
          onClose={() => setFolderToEdit(null)}
          onSave={handleSaveEdit}
        />
      )}
    </aside>
  );
}
