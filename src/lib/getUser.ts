import { getRequest } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";
import { AppError } from "@/utils/app-error";

type Session = typeof auth.$Infer.Session;

export const getUserSession = async (): Promise<Session> => {
	const userSession = await auth.api.getSession({
		headers: getRequest().headers,
	});
	if (!userSession || !userSession.user) {
		throw new AppError("Unauthorized", 401);
	}
	return userSession;
};
