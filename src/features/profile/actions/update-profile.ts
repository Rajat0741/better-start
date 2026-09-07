import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/db";
import { updateUserProfile } from "@/db/queries/user";
import { authMiddleware } from "@/lib/middleware";
import { AppError } from "@/utils/app-error";

export const updateProfileFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator(z.object({ name: z.string().trim().min(1).max(50) }))
	.handler(async ({ data, context }) => {
		const updated = await updateUserProfile(context.user.id, data, db);
		if (!updated) throw new AppError("User not found", 404);
		return updated;
	});
