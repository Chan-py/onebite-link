"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppData } from "./AppDataContext";
import UrlInput from "./UrlInput";
import FolderSelect from "./FolderSelect";
import SaveActions from "./SaveActions";

export default function NewLinkForm() {
  const { folders, createLink } = useAppData();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = String(formData.get("url") ?? "").trim();
    const folderId = String(formData.get("folder") ?? "");

    if (!url) {
      setError("링크 주소를 입력해주세요.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch link info");
      }
      const og = await response.json();

      createLink({
        url: og.url,
        title: og.title,
        description: og.description,
        thumbnail: og.thumbnail,
        tag: og.tag,
        folderId,
      });

      router.push("/");
    } catch {
      setError("링크 정보를 가져오지 못했어요. 주소를 확인해주세요.");
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-5 rounded-lg border border-[rgba(55,53,47,0.09)] bg-white p-6 dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525]"
    >
      <UrlInput />
      <FolderSelect folders={folders} />
      {error && <p className="text-xs text-[#EB5757] dark:text-[#E06060]">{error}</p>}
      <SaveActions isSaving={isSaving} />
    </form>
  );
}
