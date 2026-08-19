import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80 sm:p-12">
        <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          TanStack Start Base Template
        </span>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
          Start simple, ship quickly.
        </h1>
        <p className="mb-8 max-w-2xl text-base text-neutral-600 dark:text-neutral-300 sm:text-lg">
          A lightning-fast starter with type-safe routing, server functions, and Tailwind CSS.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/about"
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
          >
            About Starter
          </a>
          <a
            href="https://tanstack.com/router"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-300 bg-white/50 px-5 py-2.5 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
          >
            Router Docs
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ['File-Based Routing', 'Zero-config routing with automatic code splitting.'],
          ['Server Functions', 'Call backend logic directly from components safely.'],
          ['Tailwind CSS', 'Utility-first styling with built-in dark mode support.'],
          ['TanStack Query', 'Robust server state caching and synchronization.'],
          ['Streaming SSR', 'Progressive rendering for blazing fast page loads.'],
          ['Type Safety', 'End-to-end type inference across routes and APIs.'],
        ].map(([title, desc]) => (
          <article
            key={title}
            className="rounded-2xl border border-neutral-200/80 bg-white/60 p-6 shadow-md backdrop-blur-sm transition hover:-translate-y-1 hover:border-emerald-500/30 dark:border-neutral-800 dark:bg-neutral-900/60"
          >
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-white">
              {title}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
