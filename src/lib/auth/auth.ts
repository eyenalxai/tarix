import * as authSchema from "@/lib/database/auth-schema"
import { db } from "@/lib/database/client"
import * as schema from "@/lib/database/schema"
import { env } from "@/lib/env.mjs"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

export const auth = betterAuth({
	appName: "Replenish",
	session: {
		freshAge: 7 * 24 * 60 * 60 // 7 days
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: { ...schema, ...authSchema },
		usePlural: true
	}),
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET
		}
	},
	trustedOrigins: [env.NEXT_PUBLIC_BETTER_AUTH_URL]
})
