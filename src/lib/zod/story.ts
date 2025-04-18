import type { StoryInsert, StorySelect } from "@/server/database/schema"
import { z } from "zod"

const storyBaseSchema = z.object({
	uuid: z.string().uuid(),
	userId: z.string(),
	description: z
		.string()
		.min(2, "Description must be at least 2 characters long"),
	createdAt: z.date()
})

export const storySchema = storyBaseSchema.partial().required({
	uuid: true,
	userId: true,
	description: true,
	createdAt: true
}) satisfies z.ZodType<StorySelect>

export const storyInsertSchema = storyBaseSchema.pick({
	description: true
}) satisfies z.ZodType<Omit<StoryInsert, "userId">>

export const storiesSchema = z.array(storySchema)
