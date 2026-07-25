import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewLinkForm from "@/components/NewLinkForm";
import { folders } from "../_lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#191919]">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} />
        <main className="flex flex-1 items-start justify-center overflow-y-auto px-8 py-10">
          <NewLinkForm folders={folders} />
        </main>
      </div>
    </div>
  );
}
