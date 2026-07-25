"use client";

import { createContext, useContext } from "react";
import type { Folder, LinkItem } from "@/app/_lib/types";

export type CreateLinkInput = {
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
  tag: string;
  folderId: string;
};

export type EditLinkInput = {
  title: string;
  description: string;
  folderId: string;
};

type AppDataContextValue = {
  folders: Folder[];
  links: LinkItem[];
  createLink: (input: CreateLinkInput) => void;
  deleteLink: (linkId: string) => void;
  editLink: (linkId: string, updates: EditLinkInput) => void;
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({
  value,
  children,
}: {
  value: AppDataContextValue;
  children: React.ReactNode;
}) {
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
}
