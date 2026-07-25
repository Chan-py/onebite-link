"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Folder } from "@/app/_lib/types";
import { folders as initialFolders } from "@/app/_lib/mock-data";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const pathname = usePathname();

  const activeFolderId = pathname.startsWith("/folder/")
    ? pathname.split("/")[2]
    : "all";

  const handleCreateFolder = (name: string) => {
    setFolders((prev) => [...prev, { id: crypto.randomUUID(), name, count: 0 }]);
  };

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#191919]">
      <Header onCreateFolder={handleCreateFolder} />
      <div className="flex flex-1">
        <Sidebar folders={folders} activeFolderId={activeFolderId} />
        <main
          className={
            pathname === "/new"
              ? "flex flex-1 items-start justify-center overflow-y-auto px-8 py-10"
              : "flex-1 overflow-y-auto px-8 py-8"
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
}
