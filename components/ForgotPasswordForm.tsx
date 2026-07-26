"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/_lib/supabase";
import { getForgotPasswordErrorMessage } from "@/app/_lib/authErrors";
import AuthInput from "./AuthInput";
import Toast from "./Toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: "error" | "success" } | null>(
    null,
  );

  const isFormFilled = email.trim() !== "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsSubmitting(false);

    if (error) {
      setToast({ message: getForgotPasswordErrorMessage(error), variant: "error" });
      return;
    }

    setToast({
      message: "비밀번호 재설정 링크를 이메일로 보냈어요. 받은 편지함을 확인해주세요.",
      variant: "success",
    });
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-6 rounded-lg border border-[rgba(55,53,47,0.09)] bg-white p-8 dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525]"
      >
        <h1 className="flex items-center justify-center gap-1.5 text-[20px] font-semibold tracking-tight text-[#37352F] dark:text-[#E9E9E7]">
          <span aria-hidden="true">📎</span>
          한입 링크
        </h1>

        <p className="text-center text-sm text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]">
          가입하신 이메일로 비밀번호 재설정 링크를 보내드릴게요.
        </p>

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

        <button
          type="submit"
          disabled={!isFormFilled || isSubmitting}
          className="rounded-md bg-[#2F3437] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-[#454341] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#E9E9E7] dark:text-[#2F3437] dark:hover:bg-[#c9c9c7]"
        >
          {isSubmitting ? "발송 중..." : "재설정 링크 발송"}
        </button>

        <p className="text-center text-sm text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]">
          <Link
            href="/login"
            className="font-medium text-[#2383E2] transition-colors duration-150 ease-in-out hover:text-[#0B6FCA] dark:text-[#5AA7E4] dark:hover:text-[#7FBBEA]"
          >
            로그인으로 돌아가기
          </Link>
        </p>
      </form>
    </>
  );
}
