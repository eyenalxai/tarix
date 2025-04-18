import { users } from "@/lib/database/auth-schema"
import { sql } from "drizzle-orm"
import { pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core"

export const configs = pgTable(
	"configs",
	{
		uuid: uuid("uuid").default(sql`gen_random_uuid()`).primaryKey(),
		createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		userId: text("userId")
			.notNull()
			.references(() => users.id),
		locale: text("locale").notNull()
	},
	(table) => [unique("unique_config_userId").on(table.userId)]
)

export type ConfigSelect = typeof configs.$inferSelect
export type ConfigInsert = typeof configs.$inferInsert
