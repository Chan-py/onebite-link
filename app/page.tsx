import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";
import { folders, links } from "./_lib/mock-data";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#191919]">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} />
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <LinkGrid links={links} />
        </main>
      </div>
    </div>
  );
}
