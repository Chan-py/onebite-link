import type { Folder } from "@/app/_lib/types";

type FolderSelectProps = {
  folders: Folder[];
};

export default function FolderSelect({ folders }: FolderSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="folder"
        className="text-sm font-medium text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]"
      >
        폴더
      </label>
      <select
        id="folder"
        name="folder"
        defaultValue=""
        className="rounded-md border border-[rgba(55,53,47,0.16)] bg-white px-3 py-2 text-sm text-[#37352F] outline-none transition-colors duration-150 ease-in-out focus:border-[#2383E2] focus:shadow-[0_0_0_1px_#2383E2] dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525] dark:text-[#E9E9E7] dark:focus:border-[#5AA7E4] dark:focus:shadow-[0_0_0_1px_#5AA7E4]"
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
