import type { LinkItem } from "@/app/_lib/types";

type LinkCardProps = {
  link: LinkItem;
};

export default function LinkCard({ link }: LinkCardProps) {
  const initial = link.tag.charAt(0).toUpperCase();

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
          {initial}
        </span>
        <span className="truncate text-xs text-zinc-400 dark:text-zinc-600">
          {link.tag}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
          {link.title}
        </h3>
        <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
          {link.description}
        </p>
      </div>
    </a>
  );
}
