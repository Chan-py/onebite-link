import type { Folder } from "@/app/_lib/types";
import UrlInput from "./UrlInput";
import FolderSelect from "./FolderSelect";
import SaveActions from "./SaveActions";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  return (
    <form className="flex w-full max-w-xl flex-col gap-5 rounded-lg border border-[rgba(55,53,47,0.09)] bg-white p-6 dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525]">
      <UrlInput />
      <FolderSelect folders={folders} />
      <SaveActions />
    </form>
  );
}
