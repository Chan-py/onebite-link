import Link from "next/link";

type SaveActionsProps = {
  isSaving?: boolean;
};

export default function SaveActions({ isSaving = false }: SaveActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-[rgba(55,53,47,0.09)] pt-5 dark:border-[rgba(255,255,255,0.09)]">
      <Link
        href="/"
        className="rounded-md px-4 py-2 text-sm font-medium text-[rgba(55,53,47,0.65)] transition-colors duration-150 ease-in-out hover:bg-[#F1F1EF] dark:text-[rgba(255,255,255,0.6)] dark:hover:bg-[#2A2A2A]"
      >
        취소
      </Link>
      <button
        type="submit"
        disabled={isSaving}
        className="rounded-md bg-[#2F3437] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-[#454341] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#E9E9E7] dark:text-[#2F3437] dark:hover:bg-[#c9c9c7]"
      >
        {isSaving ? "저장 중..." : "저장"}
      </button>
    </div>
  );
}
