import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import { env } from "@/config/env";
import * as schema from "./schema";

neonConfig.webSocketConstructor = ws;

const globalForDb = globalThis as unknown as { neonPool?: Pool };

if (!globalForDb.neonPool) {
	globalForDb.neonPool = new Pool({ connectionString: env.DATABASE_URL });
	globalForDb.neonPool.on("error", (err: unknown) =>
		console.error("[neon-pool] idle client error", err),
	);
}

export const db = drizzle({ client: globalForDb.neonPool, schema });

/** Covers both the root db instance and the tx handle inside db.transaction(). */
export type TransactionScope =
	| typeof db
	| Parameters<Parameters<typeof db.transaction>[0]>[0];
