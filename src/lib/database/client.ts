import * as authSchema from "@/lib/database/auth-schema"
import * as schema from "@/lib/database/schema"

import { env } from "@/lib/env.mjs"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

const pool = new Pool({
	connectionString: env.DATABASE_URL
})

export const db = drizzle({
	client: pool,
	schema: { ...schema, ...authSchema }
})
