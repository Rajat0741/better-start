import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
	return (
		<main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
			<h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
				Start simple, ship quickly.
			</h1>
			<p className="mt-4 max-w-xl text-base text-neutral-600 dark:text-neutral-400 sm:text-lg">
				A minimal starter with type-safe routing and Tailwind CSS.
			</p>
			<Link
				to="/login"
				className="mt-8 inline-flex rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
			>
				Get started
			</Link>
		</main>
	)
}
