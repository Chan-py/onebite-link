import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "폴더",
  description: "폴더에 저장한 링크를 모아보세요.",
};

export default function FolderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
