"use client";

import { useState } from "react";
import type { LinkItem } from "@/app/_lib/types";
import LinkCard from "./LinkCard";
import DeleteLinkModal from "./DeleteLinkModal";
import { useAppData } from "./AppDataContext";

type LinkGridProps = {
  links: LinkItem[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  const { deleteLink } = useAppData();
  const [linkToDelete, setLinkToDelete] = useState<LinkItem | null>(null);

  const handleConfirmDelete = () => {
    if (linkToDelete) deleteLink(linkToDelete.id);
    setLinkToDelete(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {links.map((link) => (
          <LinkCard key={link.id} link={link} onDeleteClick={setLinkToDelete} />
        ))}
      </div>
      {linkToDelete && (
        <DeleteLinkModal
          link={linkToDelete}
          onClose={() => setLinkToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
