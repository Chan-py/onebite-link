import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "회원가입",
  description: "한입 링크에 가입하고 링크를 저장, 정리해보세요.",
};

export default function SignupPage() {
  return <SignupForm />;
}
