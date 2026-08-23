import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import {
	ErrorComponent,
	NotFoundComponent,
} from "./components/custom/route-errors";
import { getContext } from "./lib/tanstack-query/root-provider";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const context = getContext();

	const router = createTanStackRouter({
		routeTree,
		context,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultErrorComponent: ErrorComponent,
		defaultNotFoundComponent: NotFoundComponent,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: context.queryClient,
		hydrateOptions: {
			defaultOptions: {
				queries: {
					gcTime: 5 * 60 * 1000,
				},
			},
		},
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
