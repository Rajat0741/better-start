import { createFileRoute, redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

const getSession = createServerFn({ method: "GET" }).handler(async () => {
	const request = getRequest()
	const session = await auth.api.getSession({
		headers: request.headers,
	})
	return session
})

export const Route = createFileRoute("/login")({
	beforeLoad: async () => {
		const session = await getSession()
		if (session) {
			throw redirect({ to: "/profile" })
		}
	},
	component: LoginPage,
})

function LoginPage() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleGoogleSignIn = async () => {
		setError(null)
		setLoading(true)
		try {
			await authClient.signIn.social({
				provider: "google",
				callbackURL: "/profile",
			})
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to sign in with Google")
			setLoading(false)
		}
	}

	return (
		<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
			<div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
						Welcome back
					</h1>
					<p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
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
					<p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
						{error}
					</p>
				)}

				<p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-500">
					By continuing, you agree to our Terms and Privacy Policy.
				</p>
			</div>
		</main>
	)
}
