"use client";

import LinkGrid from "@/components/LinkGrid";
import { useAppData } from "@/components/AppDataContext";

export default function Home() {
  const { links } = useAppData();
  return <LinkGrid links={links} />;
}
