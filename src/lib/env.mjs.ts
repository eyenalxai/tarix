import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		BETTER_AUTH_SECRET: z.string().min(10),
		OPENAI_API_KEY: z
			.string()
			.min(10)
			.refine((val) => val.startsWith("sk-"), {
				message: "OPENAI_API_KEY must start with 'sk-'"
			}),
		GITHUB_CLIENT_ID: z.string().min(10),
		GITHUB_CLIENT_SECRET: z.string().min(10)
	},
	client: {
		NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url()
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
	},
	skipValidation: process.env.BUILD_TIME?.toLowerCase() === "true"
})
