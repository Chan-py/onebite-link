import type { Folder } from "@/app/_lib/types";

type FolderSelectProps = {
  folders: Folder[];
};

export default function FolderSelect({ folders }: FolderSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="folder"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        폴더
      </label>
      <select
        id="folder"
        name="folder"
        defaultValue=""
        className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
      >
        <option value="">폴더 선택 안 함</option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </div>
  );
}
