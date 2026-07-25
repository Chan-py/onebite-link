"use client";

import { useEffect, useRef, useState } from "react";
import type { Folder, LinkItem } from "@/app/_lib/types";
import type { EditLinkInput } from "./AppDataContext";

type EditLinkModalProps = {
  link: LinkItem;
  folders: Folder[];
  onClose: () => void;
  onSave: (updates: EditLinkInput) => void;
};

export default function EditLinkModal({ link, folders, onClose, onSave }: EditLinkModalProps) {
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const [folderId, setFolderId] = useState(link.folderId);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
    titleInputRef.current?.select();
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
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onSave({ title: trimmedTitle, description: description.trim(), folderId });
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
          링크 수정
        </h2>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="link-edit-title"
            className="text-sm font-medium text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]"
          >
            제목
          </label>
          <input
            ref={titleInputRef}
            id="link-edit-title"
            name="link-edit-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="rounded-md border border-[rgba(55,53,47,0.16)] bg-white px-3 py-2 text-sm text-[#37352F] outline-none transition-colors duration-150 ease-in-out placeholder:text-[rgba(55,53,47,0.4)] focus:border-[#2383E2] focus:shadow-[0_0_0_1px_#2383E2] dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525] dark:text-[#E9E9E7] dark:placeholder:text-[rgba(255,255,255,0.4)] dark:focus:border-[#5AA7E4] dark:focus:shadow-[0_0_0_1px_#5AA7E4]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="link-edit-description"
            className="text-sm font-medium text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]"
          >
            설명
          </label>
          <textarea
            id="link-edit-description"
            name="link-edit-description"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="min-h-20 resize-none rounded-md border border-[rgba(55,53,47,0.16)] bg-white px-3 py-2 text-sm leading-relaxed text-[#37352F] outline-none transition-colors duration-150 ease-in-out placeholder:text-[rgba(55,53,47,0.4)] focus:border-[#2383E2] focus:shadow-[0_0_0_1px_#2383E2] dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525] dark:text-[#E9E9E7] dark:placeholder:text-[rgba(255,255,255,0.4)] dark:focus:border-[#5AA7E4] dark:focus:shadow-[0_0_0_1px_#5AA7E4]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="link-edit-folder"
            className="text-sm font-medium text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]"
          >
            폴더
          </label>
          <select
            id="link-edit-folder"
            name="link-edit-folder"
            value={folderId}
            onChange={(event) => setFolderId(event.target.value)}
            className="rounded-md border border-[rgba(55,53,47,0.16)] bg-white px-3 py-2 text-sm text-[#37352F] outline-none transition-colors duration-150 ease-in-out focus:border-[#2383E2] focus:shadow-[0_0_0_1px_#2383E2] dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525] dark:text-[#E9E9E7] dark:focus:border-[#5AA7E4] dark:focus:shadow-[0_0_0_1px_#5AA7E4]"
          >
            <option value="">폴더 선택 안 함</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
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
            disabled={!title.trim()}
            className="rounded-md bg-[#2F3437] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-[#454341] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#E9E9E7] dark:text-[#2F3437] dark:hover:bg-[#c9c9c7]"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
