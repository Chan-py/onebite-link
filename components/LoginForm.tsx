"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/app/_lib/supabase";
import { getLoginErrorMessage } from "@/app/_lib/authErrors";
import AuthInput from "./AuthInput";
import Toast from "./Toast";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isFormFilled = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setToastMessage(getLoginErrorMessage(error));
      setIsSubmitting(false);
      return;
    }

    router.push("/");
  };

  return (
    <>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-6 rounded-lg border border-[rgba(55,53,47,0.09)] bg-white p-8 dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525]"
      >
        <h1 className="flex items-center justify-center gap-1.5 text-[20px] font-semibold tracking-tight text-[#37352F] dark:text-[#E9E9E7]">
          <span aria-hidden="true">📎</span>
          한입 링크
        </h1>

        <div className="flex flex-col gap-4">
          <AuthInput
            id="email"
            name="email"
            type="email"
            label="이메일"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <AuthInput
            id="password"
            name="password"
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!isFormFilled || isSubmitting}
          className="rounded-md bg-[#2F3437] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-[#454341] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#E9E9E7] dark:text-[#2F3437] dark:hover:bg-[#c9c9c7]"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>

        <p className="text-center text-sm text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]">
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#2383E2] transition-colors duration-150 ease-in-out hover:text-[#0B6FCA] dark:text-[#5AA7E4] dark:hover:text-[#7FBBEA]"
          >
            회원가입
          </Link>
        </p>
      </form>
    </>
  );
}
