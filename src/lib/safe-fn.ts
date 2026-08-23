import { createServerFn } from "@tanstack/react-start";
import { authMiddleware, errorHandlerMiddleware } from "./middleware";

export function safeServerFn(...args: Parameters<typeof createServerFn>) {
	return createServerFn(...args).middleware([errorHandlerMiddleware]);
}

export function authServerFn(...args: Parameters<typeof createServerFn>) {
	return createServerFn(...args).middleware([
		errorHandlerMiddleware,
		authMiddleware,
	]);
}
