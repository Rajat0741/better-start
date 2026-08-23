import { IconArrowLeft } from "@tabler/icons-react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
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

const loginSearchSchema = z.object({
	redirect: z
		.string()
		.regex(/^\/(?!\/)/)
		.optional()
		.catch(undefined),
});

export const Route = createFileRoute("/login")({
	validateSearch: loginSearchSchema,
	beforeLoad: async ({ search }) => {
		const session = await getSession();
		if (session) {
			throw redirect({ to: search.redirect ?? "/profile" });
		}
	},
	component: LoginPage,
});

function LoginPage() {
	const search = Route.useSearch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleGoogleSignIn = async () => {
		setError(null);
		setLoading(true);
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: search.redirect ?? "/profile",
			});
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to sign in with Google",
			);
			setLoading(false);
		}
	};

	return (
		<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
			<div className="w-full max-w-sm">
				<Link
					to="/"
					className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
				>
					<IconArrowLeft className="size-4" />
					Back to home
				</Link>
				<div className="rounded-2xl border bg-card p-8 shadow-sm">
					<div className="mb-8 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Welcome back
						</h1>
						<p className="mt-2 text-sm text-muted-foreground">
							Sign in to your account to continue
						</p>
					</div>

					<Button
						variant="outline"
						size="lg"
						className="w-full justify-center gap-2"
						onClick={handleGoogleSignIn}
						disabled={loading}
					>
						<FcGoogle className="size-4" />
						{loading ? "Redirecting..." : "Continue with Google"}
					</Button>

					{error && (
						<p className="mt-4 text-center text-sm text-destructive">{error}</p>
					)}

					<p className="mt-6 text-center text-xs text-muted-foreground">
						By continuing, you agree to our Terms and Privacy Policy.
					</p>
				</div>
			</div>
		</main>
	);
}
