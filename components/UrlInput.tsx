export default function UrlInput() {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="url"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        링크 주소
      </label>
      <input
        id="url"
        name="url"
        type="url"
        placeholder="https://example.com"
        className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
      />
    </div>
  );
}
