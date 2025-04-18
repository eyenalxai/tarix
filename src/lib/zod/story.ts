import type { StoryInsert } from "@/lib/database/schema"
import { sceneSchema } from "@/lib/zod/scene"
import { z } from "zod"

export const storySchema = z.object({
	uuid: z.string().uuid().optional(),
	userId: z.string().min(1, "User ID is required"),
	createdAt: z.date().optional(),
	scenes: z.array(sceneSchema).optional()
}) satisfies z.ZodType<StoryInsert>

export const storiesSchema = z.array(storySchema)
