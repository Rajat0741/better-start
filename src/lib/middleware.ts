import { createMiddleware } from "@tanstack/react-start";
import { getUserSessionFn } from "@/lib/getUser";
import { AppError } from "@/utils/app-error";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const user = await getUserSessionFn();
	if (!user) throw new AppError("Unauthorized", 401);
	return next({ context: { user } });
});

export const errorHandlerMiddleware = createMiddleware().server(
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
