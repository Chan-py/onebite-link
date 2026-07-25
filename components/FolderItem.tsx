import Link from "next/link";
import type { Folder } from "@/app/_lib/types";

type FolderItemProps = {
  folder: Folder;
  isActive?: boolean;
  onDeleteClick?: (folder: Folder) => void;
};

export default function FolderItem({ folder, isActive = false, onDeleteClick }: FolderItemProps) {
  return (
    <div
      className={`group flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors duration-150 ease-in-out ${
        isActive
          ? "bg-[#2F3437] text-white dark:bg-[#E9E9E7] dark:text-[#2F3437]"
          : "text-[rgba(55,53,47,0.65)] hover:bg-[#EDEDEB] dark:text-[rgba(255,255,255,0.6)] dark:hover:bg-[#2A2A2A]"
      }`}
    >
      <Link
        href={`/folder/${folder.id}`}
        className="flex min-w-0 flex-1 items-center gap-2 text-left font-medium"
      >
        <FolderIcon isActive={isActive} />
        <span className="truncate">{folder.name}</span>
      </Link>
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <span
          className={`text-xs transition-opacity duration-150 ease-in-out group-hover:opacity-0 ${
            isActive
              ? "text-white/60 dark:text-[#2F3437]/60"
              : "text-[rgba(55,53,47,0.4)] dark:text-[rgba(255,255,255,0.4)]"
          }`}
        >
          {folder.count}
        </span>
        <button
          type="button"
          onClick={() => onDeleteClick?.(folder)}
          aria-label={`${folder.name} 폴더 삭제`}
          className={`absolute inset-0 hidden items-center justify-center rounded opacity-0 transition-opacity duration-150 ease-in-out group-hover:flex group-hover:opacity-100 ${
            isActive
              ? "text-white hover:bg-white/20"
              : "text-[rgba(55,53,47,0.5)] hover:bg-[rgba(55,53,47,0.12)] dark:text-[rgba(255,255,255,0.5)] dark:hover:bg-[rgba(255,255,255,0.12)]"
          }`}
        >
          <TrashIcon />
        </button>
      </span>
    </div>
  );
}

function FolderIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-4 w-4 shrink-0 ${
        isActive
          ? "text-white dark:text-[#2F3437]"
          : "text-[rgba(55,53,47,0.4)] dark:text-[rgba(255,255,255,0.4)]"
      }`}
      aria-hidden="true"
    >
      <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h3.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 10.62 6H16.5A1.5 1.5 0 0 1 18 7.5v7A1.5 1.5 0 0 1 16.5 16h-13A1.5 1.5 0 0 1 2 14.5v-9Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M8.5 2.5a1 1 0 0 0-1 1V4h-3a.75.75 0 0 0 0 1.5h.325l.62 9.293A2 2 0 0 0 7.44 16.5h5.12a2 2 0 0 0 1.995-1.707l.62-9.293h.325a.75.75 0 0 0 0-1.5h-3v-.5a1 1 0 0 0-1-1h-3Zm.5 1.5v-.5h2V4h-2Zm-1.573 2 .596 8.943a.5.5 0 0 0 .499.457h5.12a.5.5 0 0 0 .499-.457L14.573 6H7.427Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
