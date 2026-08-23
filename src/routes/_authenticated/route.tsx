import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthenticatedPending } from "@/features/profile/components/profile-skeleton";
import { getUserSessionFn } from "@/lib/getUser";

export const Route = createFileRoute("/_authenticated")({
	pendingComponent: AuthenticatedPending,
	pendingMs: 0,
	pendingMinMs: 200,
	beforeLoad: async ({ location }) => {
		const session = await getUserSessionFn();
		if (!session) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}
		return { session };
	},
	component: Outlet,
});
