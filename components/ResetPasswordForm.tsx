"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/_lib/supabase";
import { getResetPasswordErrorMessage } from "@/app/_lib/authErrors";
import AuthInput from "./AuthInput";
import Toast from "./Toast";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isFormFilled = password.trim() !== "" && passwordConfirm.trim() !== "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setToastMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setToastMessage(getResetPasswordErrorMessage(error));
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

        <p className="text-center text-sm text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]">
          새로운 비밀번호를 입력해주세요.
        </p>

        <div className="flex flex-col gap-4">
          <AuthInput
            id="password"
            name="password"
            type="password"
            label="새 비밀번호"
            placeholder="새 비밀번호를 입력하세요"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <AuthInput
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            label="새 비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
            autoComplete="new-password"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!isFormFilled || isSubmitting}
          className="rounded-md bg-[#2F3437] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-[#454341] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#E9E9E7] dark:text-[#2F3437] dark:hover:bg-[#c9c9c7]"
        >
          {isSubmitting ? "변경 중..." : "비밀번호 변경"}
        </button>
      </form>
    </>
  );
}
