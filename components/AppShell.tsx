"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder, LinkItem } from "@/app/_lib/types";
import { folders as initialFolders, links as initialLinks } from "@/app/_lib/mock-data";
import { AppDataProvider, type CreateLinkInput } from "./AppDataContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const pathname = usePathname();
  const router = useRouter();

  const activeFolderId = pathname.startsWith("/folder/")
    ? pathname.split("/")[2]
    : "all";

  const handleCreateFolder = (name: string) => {
    setFolders((prev) => [...prev, { id: crypto.randomUUID(), name, count: 0 }]);
  };

  const handleDeleteFolder = (folderId: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    if (folderId === activeFolderId) router.push("/");
  };

  const handleEditFolder = (folderId: string, name: string) => {
    setFolders((prev) =>
      prev.map((folder) => (folder.id === folderId ? { ...folder, name } : folder)),
    );
  };

  const handleCreateLink = (input: CreateLinkInput) => {
    setLinks((prev) => [{ id: crypto.randomUUID(), ...input }, ...prev]);
    if (input.folderId) {
      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === input.folderId ? { ...folder, count: folder.count + 1 } : folder,
        ),
      );
    }
  };

  const handleDeleteLink = (linkId: string) => {
    const target = links.find((link) => link.id === linkId);
    setLinks((prev) => prev.filter((link) => link.id !== linkId));
    if (target?.folderId) {
      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === target.folderId ? { ...folder, count: Math.max(0, folder.count - 1) } : folder,
        ),
      );
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#191919]">
      <Header onCreateFolder={handleCreateFolder} />
      <div className="flex flex-1">
        <Sidebar
          folders={folders}
          activeFolderId={activeFolderId}
          onDeleteFolder={handleDeleteFolder}
          onEditFolder={handleEditFolder}
        />
        <main
          className={
            pathname === "/new"
              ? "flex flex-1 items-start justify-center overflow-y-auto px-8 py-10"
              : "flex-1 overflow-y-auto px-8 py-8"
          }
        >
          <AppDataProvider
            value={{ folders, links, createLink: handleCreateLink, deleteLink: handleDeleteLink }}
          >
            {children}
          </AppDataProvider>
        </main>
      </div>
    </div>
  );
}
