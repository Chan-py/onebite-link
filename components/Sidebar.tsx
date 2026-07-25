import Link from "next/link";
import type { Folder } from "@/app/_lib/types";
import FolderItem from "./FolderItem";

type SidebarProps = {
  folders: Folder[];
  activeFolderId?: string;
};

export default function Sidebar({ folders, activeFolderId = "all" }: SidebarProps) {
  const isAllActive = activeFolderId === "all";

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-zinc-200 px-3 py-6 dark:border-zinc-800">
      <Link
        href="/"
        className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
          isAllActive
            ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
            : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
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
          />
        ))}
      </div>
    </aside>
  );
}
