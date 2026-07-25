import Link from "next/link";

export default function SaveActions() {
  return (
    <div className="flex items-center justify-end gap-2 border-t border-zinc-200 pt-5 dark:border-zinc-800">
      <Link
        href="/"
        className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
      >
        취소
      </Link>
      <button
        type="submit"
        className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        저장
      </button>
    </div>
  );
}
