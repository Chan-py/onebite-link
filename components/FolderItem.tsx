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
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
        isActive
          ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
      }`}
    >
      <span className="flex items-center gap-2">
        <FolderIcon isActive={isActive} />
        {folder.name}
      </span>
      <span
        className={`text-xs ${
          isActive
            ? "text-zinc-300 dark:text-zinc-600"
            : "text-zinc-400 dark:text-zinc-600"
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
        isActive ? "text-white dark:text-zinc-900" : "text-zinc-400 dark:text-zinc-600"
      }`}
      aria-hidden="true"
    >
      <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h3.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 10.62 6H16.5A1.5 1.5 0 0 1 18 7.5v7A1.5 1.5 0 0 1 16.5 16h-13A1.5 1.5 0 0 1 2 14.5v-9Z" />
    </svg>
  );
}
