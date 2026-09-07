import { createStart } from "@tanstack/react-start";
import { csrfMiddleware, errorHandlerMiddleware } from "@/lib/middleware";

export const startInstance = createStart(() => ({
	requestMiddleware: [csrfMiddleware],
	functionMiddleware: [errorHandlerMiddleware],
}));
