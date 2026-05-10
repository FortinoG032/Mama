export function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-12 md:my-16 opacity-80">
      <div className="h-px w-24 md:w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <svg viewBox="0 0 60 24" className="w-16 h-6 text-gold" fill="currentColor" aria-hidden>
        <path d="M30 4c-2 4-6 6-10 6 4 0 8 2 10 6 2-4 6-6 10-6-4 0-8-2-10-6z" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="52" cy="12" r="2" />
      </svg>
      <div className="h-px w-24 md:w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
