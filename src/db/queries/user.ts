import { eq } from "drizzle-orm";
import { db, type TransactionScope } from "@/db";
import { user } from "@/db/schema";

// Pass `db` normally, or a `tx` inside db.transaction().
export async function updateUserProfile(
	userId: string,
	input: { name: string },
	executor: TransactionScope = db,
) {
	const [updated] = await executor
		.update(user)
		.set(input)
		.where(eq(user.id, userId))
		.returning();
	return updated;
}
