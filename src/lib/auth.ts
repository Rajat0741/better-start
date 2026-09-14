import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "@/db";

if (
	!process.env.BETTER_AUTH_SECRET ||
	!process.env.BETTER_AUTH_URL ||
	!process.env.GOOGLE_CLIENT_ID ||
	!process.env.GOOGLE_CLIENT_SECRET
) {
	throw new Error("env var missing");
}

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg" }),
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
