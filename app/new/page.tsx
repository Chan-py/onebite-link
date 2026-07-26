import type { Metadata } from "next";
import NewLinkForm from "@/components/NewLinkForm";

export const metadata: Metadata = {
  title: "새 링크 추가",
  description: "새로운 링크를 한입 크기로 저장하세요.",
};

export default function NewLinkPage() {
  return <NewLinkForm />;
}
