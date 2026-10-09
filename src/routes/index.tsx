import { IconBrandGithub, IconDatabase, IconLock, IconSparkles } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

const integrations = [
  {
    icon: IconSparkles,
    title: "TanStack Start",
    desc: "Full-stack React framework — SSR, type-safe file routes, server functions.",
    badge: "Framework",
  },
  {
    icon: IconLock,
    title: "better-auth",
    desc: "Google OAuth + email/password baked in. Sessions via tanstackStartCookies().",
    badge: "Auth",
  },
  {
    icon: IconDatabase,
    title: "Drizzle + Neon",
    desc: "Postgres via Neon serverless + drizzle-orm. Schema generated via CLI.",
    badge: "DB",
  },
];

function App() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="bg-muted/50 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
          <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
          TanStack Start + better-auth — quickstart template
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          Skip scaffolding,
          <br />
          <span className="from-foreground to-foreground/60 bg-linear-to-r bg-clip-text text-transparent">
            start shipping.
          </span>
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base text-pretty sm:text-lg">
          better-start helps you quickstart TanStack Start projects with{" "}
          <span className="text-foreground font-medium">better-auth</span> already wired — Google
          OAuth, sessions, Drizzle schema and protected routes. Clone, set env, push.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/login"
            className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold transition"
          >
            Get started
          </Link>
          <a
            href="https://github.com/Rajat0741/better-start"
            target="_blank"
            rel="noreferrer"
            className="bg-background hover:bg-muted inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition"
          >
            <IconBrandGithub className="size-4" />
            View on GitHub
          </a>
        </div>

        <div className="text-muted-foreground mt-4 flex flex-wrap justify-center gap-2 text-xs">
          <span className="rounded-full border px-2.5 py-1">pnpm dev → localhost:3000</span>
          <span className="rounded-full border px-2.5 py-1">pnpm build → production bundle</span>
          <span className="rounded-full border px-2.5 py-1">pnpm auth:generate → schema</span>
        </div>
      </div>

      {/* Integrations grid */}
      <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((item) => (
          <div key={item.title} className="bg-card rounded-2xl border p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="bg-muted/50 flex size-9 items-center justify-center rounded-xl border">
                <item.icon className="size-4" />
              </div>
              <span className="bg-muted text-muted-foreground rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase">
                {item.badge}
              </span>
            </div>
            <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="bg-muted/30 mx-auto mt-14 max-w-5xl rounded-2xl border p-6 sm:p-8">
        <h2 className="text-muted-foreground text-center text-sm font-semibold tracking-widest uppercase">
          How it works
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="text-center">
            <div className="bg-foreground text-background mx-auto flex size-8 items-center justify-center rounded-full text-xs font-bold">
              1
            </div>
            <h3 className="mt-3 text-sm font-semibold">Clone & install</h3>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              <code className="bg-background rounded px-1.5 py-0.5">pnpm install</code> — TanStack
              Start, Router, Query ready.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-foreground text-background mx-auto flex size-8 items-center justify-center rounded-full text-xs font-bold">
              2
            </div>
            <h3 className="mt-3 text-sm font-semibold">Set env & DB</h3>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              Copy <code className="bg-background rounded px-1.5 py-0.5">.env.example</code>, add
              Google creds, run{" "}
              <code className="bg-background rounded px-1.5 py-0.5">pnpm auth:generate</code> +
              <code className="bg-background rounded px-1.5 py-0.5">pnpm db:push</code>
            </p>
          </div>
          <div className="text-center">
            <div className="bg-foreground text-background mx-auto flex size-8 items-center justify-center rounded-full text-xs font-bold">
              3
            </div>
            <h3 className="mt-3 text-sm font-semibold">Ship</h3>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              <code className="bg-background rounded px-1.5 py-0.5">pnpm build</code> → deploy to
              any host. Protected{" "}
              <code className="bg-background rounded px-1.5 py-0.5">/profile</code> included.
            </p>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mt-10 text-center text-xs">
        MIT · Built with TanStack Start · Feedback via{" "}
        <a
          href="https://github.com/Rajat0741/better-start/issues/new"
          className="hover:text-foreground underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          GitHub issues
        </a>
      </p>
    </main>
  );
}
