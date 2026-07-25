import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { folders, links } from "@/app/_lib/mock-data";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const folderLinks = links.filter((link) => link.folderId === folderId);

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} activeFolderId={folderId} />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <LinkGrid links={folderLinks} />
        </main>
      </div>
    </div>
  );
}
