import { IconBug, IconBulb } from "@tabler/icons-react";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

const getSession = createServerFn({ method: "GET" }).handler(async () => {
	const request = getRequest();
	const session = await auth.api.getSession({
		headers: request.headers,
	});
	return session;
});

export const Route = createFileRoute("/profile")({
	beforeLoad: async () => {
		const session = await getSession();
		if (!session) {
			throw redirect({ to: "/login" });
		}
		return { session };
	},
	component: ProfilePage,
});

function ProfilePage() {
	const router = useRouter();
	const { data: session, isPending, error } = authClient.useSession();

	if (isPending) {
		return (
			<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
				<p className="text-sm text-muted-foreground">Loading...</p>
			</main>
		);
	}

	if (error) {
		return (
			<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
				<p className="text-sm text-destructive">Failed to load session</p>
			</main>
		);
	}

	if (!session) {
		return (
			<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
				<p className="text-sm text-muted-foreground">Redirecting to login...</p>
			</main>
		);
	}

	const user = session.user;

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.navigate({ to: "/login" });
				},
			},
		});
	};

	return (
		<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
			<div className="w-full max-w-md space-y-6">
				{/* Profile card */}
				<div className="rounded-2xl border bg-card p-8 shadow-sm">
					<div className="flex flex-col items-center text-center">
						{user.image ? (
							<img
								src={user.image}
								alt={user.name ?? "User"}
								className="size-20 rounded-full object-cover"
								referrerPolicy="no-referrer"
							/>
						) : (
							<div className="flex size-20 items-center justify-center rounded-full bg-muted text-xl font-semibold text-muted-foreground">
								{(user.name ?? user.email ?? "?").charAt(0).toUpperCase()}
							</div>
						)}
						<h1 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
							{user.name ?? "User"}
						</h1>
						<p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
						<p className="mt-1 font-mono text-xs text-muted-foreground/70">
							ID: {user.id}
						</p>
						{user.emailVerified && (
							<span className="mt-3 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
								Verified
							</span>
						)}
					</div>

					<div className="mt-8 grid gap-3">
						<Button
							variant="outline"
							size="lg"
							className="w-full"
							onClick={handleSignOut}
						>
							Sign out
						</Button>
						<Button
							variant="ghost"
							size="lg"
							className="w-full"
							onClick={() => router.navigate({ to: "/" })}
						>
							Back to home
						</Button>
					</div>
				</div>

				{/* Feedback */}
				<div className="rounded-2xl border border-dashed bg-muted/30 p-5">
					<div className="flex items-start gap-3">
						<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background border">
							<IconBulb className="size-4 text-muted-foreground" />
						</div>
						<div className="min-w-0 flex-1">
							<h2 className="text-sm font-semibold leading-none">
								Help make better-start better
							</h2>
							<p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
								Spotted a bug or have an idea? Open an issue — it takes 30
								seconds and helps everyone.
							</p>
						</div>
					</div>

					<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
						<Button
							variant="outline"
							size="default"
						>
							<a
								href="https://github.com/Rajat0741/better-start/issues/new?labels=enhancement&title=%F0%9F%92%A1+%5BIdea%5D+&template=feature_request.md"
								target="_blank"
								rel="noreferrer"
								className="flex flex-row items-center gap-2"
							>
								<IconBulb className="size-4 shrink-0" />
								Suggest improvement
							</a>
						</Button>
						<Button
							variant="outline"
							size="default"
							className="flex flex-row"
						>
							<a
								href="https://github.com/Rajat0741/better-start/issues/new?labels=bug&title=%F0%9F%90%9B+%5BBug%5D+&template=bug_report.md"
								target="_blank"
								rel="noreferrer"
								className="flex flex-row items-center gap-2"
							>
								<IconBug className="size-4 shrink-0" />
								Report bug
							</a>
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
