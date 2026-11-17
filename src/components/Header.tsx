export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[oklch(0.135_0.018_150/0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#top" className="group inline-flex items-center gap-3 rounded-sm no-underline">
          <span
            aria-hidden="true"
            className="relative grid size-8 place-items-center rounded-[10px] border border-[var(--accent)]/35 bg-[var(--accent)]/[0.09]"
          >
            <span className="size-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_14px_oklch(0.88_0.22_133/0.65)]" />
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.035em] text-[var(--ink)]">
            Gradient <span className="text-[var(--ink-muted)]">Library</span>
          </span>
        </a>
        <span className="hidden text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--ink-subtle)] sm:block">
          Color, ready to use
        </span>
      </div>
    </header>
  )
}
