"use client";

import { useState } from "react";
import type { LinkItem } from "@/app/_lib/types";
import LinkCard from "./LinkCard";
import DeleteLinkModal from "./DeleteLinkModal";
import EditLinkModal from "./EditLinkModal";
import { useAppData, type EditLinkInput } from "./AppDataContext";

type LinkGridProps = {
  links: LinkItem[];
};

export default function LinkGrid({ links }: LinkGridProps) {
  const { folders, deleteLink, editLink } = useAppData();
  const [linkToDelete, setLinkToDelete] = useState<LinkItem | null>(null);
  const [linkToEdit, setLinkToEdit] = useState<LinkItem | null>(null);

  const handleConfirmDelete = () => {
    if (linkToDelete) deleteLink(linkToDelete.id);
    setLinkToDelete(null);
  };

  const handleSaveEdit = (updates: EditLinkInput) => {
    if (linkToEdit) editLink(linkToEdit.id, updates);
    setLinkToEdit(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onEditClick={setLinkToEdit}
            onDeleteClick={setLinkToDelete}
          />
        ))}
      </div>
      {linkToDelete && (
        <DeleteLinkModal
          link={linkToDelete}
          onClose={() => setLinkToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
      {linkToEdit && (
        <EditLinkModal
          link={linkToEdit}
          folders={folders}
          onClose={() => setLinkToEdit(null)}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
}
