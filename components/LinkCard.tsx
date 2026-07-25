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
      className="group flex flex-col overflow-hidden rounded-lg border border-[rgba(55,53,47,0.09)] bg-white transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:border-[rgba(55,53,47,0.16)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525] dark:hover:border-[rgba(255,255,255,0.16)]"
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
  );
}
