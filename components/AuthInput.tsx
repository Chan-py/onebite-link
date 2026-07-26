type AuthInputProps = {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthInput({
  id,
  name,
  type,
  label,
  placeholder,
  autoComplete,
  value,
  onChange,
}: AuthInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[rgba(55,53,47,0.65)] dark:text-[rgba(255,255,255,0.6)]"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className="rounded-md border border-[rgba(55,53,47,0.16)] bg-white px-3 py-2 text-sm text-[#37352F] outline-none transition-colors duration-150 ease-in-out placeholder:text-[rgba(55,53,47,0.4)] focus:border-[#2383E2] focus:shadow-[0_0_0_1px_#2383E2] dark:border-[rgba(255,255,255,0.09)] dark:bg-[#252525] dark:text-[#E9E9E7] dark:placeholder:text-[rgba(255,255,255,0.4)] dark:focus:border-[#5AA7E4] dark:focus:shadow-[0_0_0_1px_#5AA7E4]"
      />
    </div>
  );
}
