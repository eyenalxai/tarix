import { sceneSchema } from "@/lib/zod/scene"
import type { StoryInsert } from "@/server/database/schema"
import { z } from "zod"

export const storySchema = z.object({
	uuid: z.string().uuid().optional(),
	userId: z.string().min(1, "User ID is required"),
	createdAt: z.date().optional(),
	scenes: z.array(sceneSchema).optional()
}) satisfies z.ZodType<StoryInsert>

export const storiesSchema = z.array(storySchema)
