import { createFileRoute, redirect, useRouter } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
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

export const Route = createFileRoute("/profile")({
	beforeLoad: async () => {
		const session = await getSession()
		if (!session) {
			throw redirect({ to: "/login" })
		}
		return { session }
	},
	component: ProfilePage,
})

function ProfilePage() {
	const router = useRouter()
	const { data: session, isPending, error } = authClient.useSession()

	if (isPending) {
		return (
			<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">Loading...</p>
			</main>
		)
	}

	if (error) {
		return (
			<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
				<p className="text-sm text-red-600 dark:text-red-400">Failed to load session</p>
			</main>
		)
	}

	if (!session) {
		return (
			<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">Redirecting to login...</p>
			</main>
		)
	}

	const user = session.user

	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.navigate({ to: "/login" })
				},
			},
		})
	}

	return (
		<main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
			<div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
				<div className="flex flex-col items-center text-center">
					{user.image ? (
						<img
							src={user.image}
							alt={user.name ?? "User"}
							className="size-20 rounded-full object-cover"
							referrerPolicy="no-referrer"
						/>
					) : (
						<div className="flex size-20 items-center justify-center rounded-full bg-neutral-100 text-xl font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
							{(user.name ?? user.email ?? "?").charAt(0).toUpperCase()}
						</div>
					)}
					<h1 className="mt-4 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
						{user.name ?? "User"}
					</h1>
					<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{user.email}</p>
					<p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
						ID: {user.id}
					</p>
					{user.emailVerified && (
						<span className="mt-3 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
							Verified
						</span>
					)}
				</div>

				<div className="mt-8 grid gap-3">
					<Button variant="outline" size="lg" className="w-full" onClick={handleSignOut}>
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
		</main>
	)
}
