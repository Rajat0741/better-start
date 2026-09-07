import { createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import { AppError } from "@/utils/app-error";

export const csrfMiddleware = createCsrfMiddleware({
	filter: (ctx) => ctx.handlerType === "serverFn",
});

export const authMiddleware = createMiddleware<"function">().server(
	async ({ next }) => {
		const data = await auth.api.getSession({
			headers: getRequest().headers,
		});
		const user = data?.user;
		if (!user) throw new AppError("Unauthorized", 401);
		return next({ context: { user } });
	},
);

export const errorHandlerMiddleware = createMiddleware<"function">().server(
	async ({ next }) => {
		try {
			return await next();
		} catch (error) {
			if (error instanceof AppError) {
				throw error;
			}
			console.error(error);
			throw new AppError(
				"An unexpected error occurred. Please try again.",
				500,
			);
		}
	},
);
