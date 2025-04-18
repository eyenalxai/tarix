import * as authSchema from "@/lib/database/auth-schema"
import * as schema from "@/lib/database/schema"

import { env } from "@/lib/env.mjs"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

const sql = neon(env.DATABASE_URL)

export const db = drizzle({
	client: sql,
	schema: { ...schema, ...authSchema }
})
