import type { Folder } from "@/app/_lib/types";
import UrlInput from "./UrlInput";
import FolderSelect from "./FolderSelect";
import SaveActions from "./SaveActions";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  return (
    <form className="flex w-full max-w-xl flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      <UrlInput />
      <FolderSelect folders={folders} />
      <SaveActions />
    </form>
  );
}
