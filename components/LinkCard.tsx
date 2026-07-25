import type { LinkItem } from "@/app/_lib/types";

type LinkCardProps = {
  link: LinkItem;
  onDeleteClick?: (link: LinkItem) => void;
};

export default function LinkCard({ link, onDeleteClick }: LinkCardProps) {
  const initial = link.tag.charAt(0).toUpperCase();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-[rgba(55,53,47,0.09)] bg-white transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:border-[rgba(55,53,47,0.16)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525] dark:hover:border-[rgba(255,255,255,0.16)]">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col"
      >
        {link.thumbnail && (
          <div className="aspect-[16/9] w-full shrink-0 overflow-hidden bg-[#F1F1EF] dark:bg-[#2A2A2A]">
            {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail hosts are arbitrary user-submitted domains */}
            <img
              src={link.thumbnail}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2F3437] text-sm font-semibold text-white dark:bg-[#E9E9E7] dark:text-[#2F3437]">
              {initial}
            </span>
            <span className="truncate text-xs text-[rgba(55,53,47,0.4)] dark:text-[rgba(255,255,255,0.4)]">
              {link.tag}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="line-clamp-1 text-sm font-semibold text-[#37352F] group-hover:underline dark:text-[#E9E9E7]">
              {link.title}
            </h3>
            <p className="line-clamp-2 text-xs text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]">
              {link.description}
            </p>
          </div>
        </div>
      </a>
      <button
        type="button"
        onClick={() => onDeleteClick?.(link)}
        aria-label={`${link.title} 링크 삭제`}
        className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-[rgba(55,53,47,0.09)] bg-white text-[rgba(55,53,47,0.5)] opacity-0 shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-opacity duration-150 ease-in-out pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-[#F1F1EF] hover:text-[#37352F] dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525] dark:text-[rgba(255,255,255,0.5)] dark:hover:bg-[#2A2A2A] dark:hover:text-[#E9E9E7]"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M8.5 2.5a1 1 0 0 0-1 1V4h-3a.75.75 0 0 0 0 1.5h.325l.62 9.293A2 2 0 0 0 7.44 16.5h5.12a2 2 0 0 0 1.995-1.707l.62-9.293h.325a.75.75 0 0 0 0-1.5h-3v-.5a1 1 0 0 0-1-1h-3Zm.5 1.5v-.5h2V4h-2Zm-1.573 2 .596 8.943a.5.5 0 0 0 .499.457h5.12a.5.5 0 0 0 .499-.457L14.573 6H7.427Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
