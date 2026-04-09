/**
 * SaaS-style issue / alert card (Linear / Vercel-inspired).
 * Slate surfaces, orange only for the status dot — not as a full background.
 */
export default function DashboardIssueCard({
  title = 'Deployment failed in production cluster',
  description = 'The last deploy exited with code 1. Logs are available for the last 15 minutes.',
  statusLabel = 'Serious',
  categoryLabel = 'Technical Category',
  onConfirm,
  onDismiss,
  onFixed,
  className = '',
}) {
  return (
    <article
      className={[
        'rounded-xl border border-slate-200/80 bg-white p-8 shadow-sm',
        'dark:border-slate-800 dark:bg-slate-950',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex flex-col gap-6">
        <header className="min-w-0">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {title}
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-500 dark:text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-orange-500 shadow-[0_0_0_3px_rgba(249,115,22,0.2)]"
                aria-hidden
              />
              <span>{statusLabel}</span>
            </span>
            <span className="text-slate-300 dark:text-slate-600" aria-hidden>
              ·
            </span>
            <span className="text-slate-500 dark:text-slate-500">{categoryLabel}</span>
          </div>
        </header>

        <footer className="flex flex-col gap-4 border-t border-slate-100 pt-8 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:focus-visible:outline-slate-200"
            >
              Confirm
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:justify-end">
            <button
              type="button"
              onClick={onDismiss}
              className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 dark:text-slate-400 dark:hover:bg-slate-900"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={onFixed}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-red-200 bg-white px-4 text-sm font-medium text-red-700 transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 dark:border-red-900/50 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-950/40"
            >
              Fixed
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
}
