const KNOWN_SIGNUP_ERRORS: Array<{ match: string; message: string }> = [
  { match: "already registered", message: "이미 가입된 이메일입니다." },
  { match: "already exists", message: "이미 가입된 이메일입니다." },
  { match: "password should be at least", message: "비밀번호는 최소 6자 이상이어야 합니다." },
  { match: "unable to validate email", message: "이메일 형식이 올바르지 않습니다." },
  { match: "invalid email", message: "이메일 형식이 올바르지 않습니다." },
];

export function getSignupErrorMessage(error: { message: string }): string {
  const lowered = error.message.toLowerCase();
  const known = KNOWN_SIGNUP_ERRORS.find(({ match }) => lowered.includes(match));
  return known?.message ?? "회원가입에 실패했어요. 잠시 후 다시 시도해주세요.";
}

const KNOWN_LOGIN_ERRORS: Array<{ match: string; message: string }> = [
  { match: "invalid login credentials", message: "이메일 또는 비밀번호가 올바르지 않습니다." },
  { match: "email not confirmed", message: "이메일 인증을 완료한 후 로그인해주세요." },
  { match: "unable to validate email", message: "이메일 형식이 올바르지 않습니다." },
  { match: "invalid email", message: "이메일 형식이 올바르지 않습니다." },
];

export function getLoginErrorMessage(error: { message: string }): string {
  const lowered = error.message.toLowerCase();
  const known = KNOWN_LOGIN_ERRORS.find(({ match }) => lowered.includes(match));
  return known?.message ?? "로그인에 실패했어요. 잠시 후 다시 시도해주세요.";
}
