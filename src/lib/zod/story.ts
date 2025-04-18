import type { SceneInsert, StoryInsert } from "@/lib/database/schema"
import { z } from "zod"

export const choiceSchema = z.object({
	first_choice: z.string().min(1),
	second_choice: z.string().min(1),
	third_choice: z.string().min(1),
	fourth_choice: z.string().min(1)
})

export const generatedSceneSchema = z.object({
	text: z.string().min(1),
	choices: choiceSchema
})

export const sceneSchema = z.object({
	uuid: z.string().uuid().optional(),
	userId: z.string().min(1, "User ID is required"),
	storyUuid: z.string().uuid("Invalid story UUID"),
	createdAt: z.date().optional(),
	text: z.string().min(1, "Scene text is required"),
	actions: z
		.array(z.string().min(1, "Action cannot be empty"))
		.min(1, "At least one action is required"),
	selectedActionIndex: z.number().int().nonnegative().optional()
}) satisfies z.ZodType<SceneInsert>

export const storySchema = z.object({
	uuid: z.string().uuid().optional(),
	userId: z.string().min(1, "User ID is required"),
	createdAt: z.date().optional(),
	scenes: z.array(sceneSchema).optional()
}) satisfies z.ZodType<StoryInsert>
