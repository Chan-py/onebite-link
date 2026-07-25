"use client";

import { use } from "react";
import LinkGrid from "@/components/LinkGrid";
import { useAppData } from "@/components/AppDataContext";

export default function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = use(params);
  const { links } = useAppData();
  const folderLinks = links.filter((link) => link.folderId === folderId);

  return <LinkGrid links={folderLinks} />;
}
