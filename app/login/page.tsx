import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "로그인",
  description: "한입 링크에 로그인하고 저장한 링크를 확인하세요.",
};

export default function LoginPage() {
  return <LoginForm />;
}
