import {
	IconBrandGithub,
	IconDatabase,
	IconLock,
	IconPalette,
	IconRoute,
	IconSparkles,
	IconStack2,
} from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

const integrations = [
	{
		icon: IconLock,
		title: "better-auth",
		desc: "Google OAuth + email/password baked in. Sessions via tanstackStartCookies().",
		badge: "Auth",
	},
	{
		icon: IconRoute,
		title: "TanStack Router",
		desc: "Type-safe file routes, loaders, beforeLoad guards. No config hell.",
		badge: "Routing",
	},
	{
		icon: IconStack2,
		title: "TanStack Query",
		desc: "SSR query integration, devtools, gcTime tuned. Ready for data.",
		badge: "Data",
	},
	{
		icon: IconDatabase,
		title: "Drizzle + Neon",
		desc: "Postgres via Neon serverless + drizzle-orm. Schema generated via CLI.",
		badge: "DB",
	},
	{
		icon: IconPalette,
		title: "Tailwind + shadcn",
		desc: "Base UI primitives, CVA, tailwind-merge. Dark mode included.",
		badge: "UI",
	},
	{
		icon: IconSparkles,
		title: "Vite + Nitro",
		desc: "Vite 8, React 19, React Compiler. Nitro preset for any host.",
		badge: "Build",
	},
];

function App() {
	return (
		<main className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
			{/* Hero */}
			<div className="mx-auto max-w-3xl text-center">
				<div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium">
					<span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
					TanStack Start + better-auth — quickstart template
				</div>
				<h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
					Skip scaffolding,
					<br />
					<span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
						start shipping.
					</span>
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
					better-start helps you quickstart TanStack Start projects with{" "}
					<span className="font-medium text-foreground">better-auth</span>{" "}
					already wired — Google OAuth, sessions, Drizzle schema and protected
					routes. Clone, set env, push.
				</p>

				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<Link
						to="/login"
						className="inline-flex items-center rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition hover:bg-foreground/90"
					>
						Get started
					</Link>
					<a
						href="https://github.com/Rajat0741/better-start"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-full border bg-background px-6 py-2.5 text-sm font-semibold transition hover:bg-muted"
					>
						<IconBrandGithub className="size-4" />
						View on GitHub
					</a>
				</div>

				<div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
					<span className="rounded-full border px-2.5 py-1">
						pnpm dev → localhost:3000
					</span>
					<span className="rounded-full border px-2.5 py-1">
						pnpm build → Nitro server
					</span>
					<span className="rounded-full border px-2.5 py-1">
						pnpm auth:generate → schema
					</span>
				</div>
			</div>

			{/* Integrations grid */}
			<div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{integrations.map((item) => (
					<div
						key={item.title}
						className="rounded-2xl border bg-card p-5 shadow-sm"
					>
						<div className="flex items-center justify-between">
							<div className="flex size-9 items-center justify-center rounded-xl border bg-muted/50">
								<item.icon className="size-4" />
							</div>
							<span className="rounded-full border bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
								{item.badge}
							</span>
						</div>
						<h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
						<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
							{item.desc}
						</p>
					</div>
				))}
			</div>

			{/* How it works */}
			<div className="mx-auto mt-14 max-w-5xl rounded-2xl border bg-muted/30 p-6 sm:p-8">
				<h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
					How it works
				</h2>
				<div className="mt-6 grid gap-6 sm:grid-cols-3">
					<div className="text-center">
						<div className="mx-auto flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
							1
						</div>
						<h3 className="mt-3 text-sm font-semibold">Clone & install</h3>
						<p className="mt-1 text-xs leading-relaxed text-muted-foreground">
							<code className="rounded bg-background px-1.5 py-0.5">
								pnpm install
							</code>{" "}
							— TanStack Start, Router, Query ready.
						</p>
					</div>
					<div className="text-center">
						<div className="mx-auto flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
							2
						</div>
						<h3 className="mt-3 text-sm font-semibold">Set env & DB</h3>
						<p className="mt-1 text-xs leading-relaxed text-muted-foreground">
							Copy{" "}
							<code className="rounded bg-background px-1.5 py-0.5">
								.env.example
							</code>
							, add Google creds, run{" "}
							<code className="rounded bg-background px-1.5 py-0.5">
								pnpm auth:generate
							</code>{" "}
							+
							<code className="rounded bg-background px-1.5 py-0.5">
								pnpm db:push
							</code>
						</p>
					</div>
					<div className="text-center">
						<div className="mx-auto flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
							3
						</div>
						<h3 className="mt-3 text-sm font-semibold">Ship</h3>
						<p className="mt-1 text-xs leading-relaxed text-muted-foreground">
							<code className="rounded bg-background px-1.5 py-0.5">
								pnpm build
							</code>{" "}
							→{" "}
							<code className="rounded bg-background px-1.5 py-0.5">
								pnpm start
							</code>{" "}
							on any Nitro host. Protected{" "}
							<code className="rounded bg-background px-1.5 py-0.5">
								/profile
							</code>{" "}
							included.
						</p>
					</div>
				</div>
			</div>

			<p className="mt-10 text-center text-xs text-muted-foreground">
				MIT · Built with TanStack Start · Feedback via{" "}
				<a
					href="https://github.com/Rajat0741/better-start/issues/new"
					className="underline underline-offset-4 hover:text-foreground"
					target="_blank"
					rel="noreferrer"
				>
					GitHub issues
				</a>
			</p>
		</main>
	);
}
