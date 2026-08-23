import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { env } from "@/config/env";
import { db } from "@/db";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg" }),
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
			strategy: "jwe",
		},
	},
	plugins: [tanstackStartCookies()],
});
