import Link from "next/link";
import type { Folder } from "@/app/_lib/types";

type FolderItemProps = {
  folder: Folder;
  isActive?: boolean;
};

export default function FolderItem({ folder, isActive = false }: FolderItemProps) {
  return (
    <Link
      href={`/folder/${folder.id}`}
      className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-sm transition-colors duration-150 ease-in-out ${
        isActive
          ? "bg-[#2F3437] text-white dark:bg-[#E9E9E7] dark:text-[#2F3437]"
          : "text-[rgba(55,53,47,0.65)] hover:bg-[#EDEDEB] dark:text-[rgba(255,255,255,0.6)] dark:hover:bg-[#2A2A2A]"
      }`}
    >
      <span className="flex items-center gap-2">
        <FolderIcon isActive={isActive} />
        {folder.name}
      </span>
      <span
        className={`text-xs ${
          isActive
            ? "text-white/60 dark:text-[#2F3437]/60"
            : "text-[rgba(55,53,47,0.4)] dark:text-[rgba(255,255,255,0.4)]"
        }`}
      >
        {folder.count}
      </span>
    </Link>
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
