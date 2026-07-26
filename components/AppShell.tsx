"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder, LinkItem } from "@/app/_lib/types";
import { supabase } from "@/app/_lib/supabase";
import { AppDataProvider, type CreateLinkInput, type EditLinkInput } from "./AppDataContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

function hostnameTag(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const activeFolderId = pathname.startsWith("/folder/")
    ? pathname.split("/")[2]
    : "all";

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("folders")
      .select("id, name")
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setFolders(data.map((row) => ({ id: String(row.id), name: row.name, count: 0 })));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setLinks(
          data.map((row) => ({
            id: String(row.id),
            url: row.url,
            title: row.title ?? "",
            description: row.description ?? "",
            thumbnail: row.thumbnail_url,
            folderId: row.folder_id ? String(row.folder_id) : "",
            tag: hostnameTag(row.url),
          })),
        );
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateFolder = async (name: string) => {
    const { data, error } = await supabase
      .from("folders")
      .insert({ name })
      .select("id, name")
      .single();

    if (error || !data) throw error;

    setFolders((prev) => [...prev, { id: String(data.id), name: data.name, count: 0 }]);
  };

  const handleDeleteFolder = async (folderId: string) => {
    const { error } = await supabase.from("folders").delete().eq("id", folderId);

    if (error) {
      console.error(error);
      return;
    }

    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    if (folderId === activeFolderId) router.push("/");
  };

  const handleEditFolder = async (folderId: string, name: string) => {
    const { error } = await supabase
      .from("folders")
      .update({ name })
      .eq("id", folderId);

    if (error) {
      console.error(error);
      return;
    }

    setFolders((prev) =>
      prev.map((folder) => (folder.id === folderId ? { ...folder, name } : folder)),
    );
  };

  const handleCreateLink = async (input: CreateLinkInput) => {
    const { data, error } = await supabase
      .from("links")
      .insert({
        url: input.url,
        title: input.title || null,
        description: input.description || null,
        thumbnail_url: input.thumbnail,
        folder_id: input.folderId ? Number(input.folderId) : null,
      })
      .select("id")
      .single();

    if (error || !data) throw error;

    setLinks((prev) => [{ id: String(data.id), ...input }, ...prev]);
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

  const handleEditLink = (linkId: string, updates: EditLinkInput) => {
    const target = links.find((link) => link.id === linkId);
    setLinks((prev) => prev.map((link) => (link.id === linkId ? { ...link, ...updates } : link)));

    if (target && target.folderId !== updates.folderId) {
      setFolders((prev) =>
        prev.map((folder) => {
          if (folder.id === target.folderId) return { ...folder, count: Math.max(0, folder.count - 1) };
          if (folder.id === updates.folderId) return { ...folder, count: folder.count + 1 };
          return folder;
        }),
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
            value={{
              folders,
              links,
              createLink: handleCreateLink,
              deleteLink: handleDeleteLink,
              editLink: handleEditLink,
            }}
          >
            {children}
          </AppDataProvider>
        </main>
      </div>
    </div>
  );
}
