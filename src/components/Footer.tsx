export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left lg:px-12">
        <p className="text-xs text-[var(--ink-subtle)]">
          Gradient Library <span className="mx-1.5 text-white/20">/</span> Open source
        </p>
        <p className="text-[11px] text-[var(--ink-subtle)]">
          Thoughtful color for the web.
        </p>
      </div>
    </footer>
  )
}
