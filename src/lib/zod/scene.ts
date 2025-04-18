import type { SceneInsert } from "@/server/database/schema"
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

export const actionsSchema = z.array(
	z.string().min(1, "Action cannot be empty")
)

export const selectedActionSchema = z
	.number()
	.int()
	.nonnegative()
	.refine((n) => n >= 0 && n <= 3, "Selected action must be between 0 and 3")

export const sceneSchema = z.object({
	uuid: z.string().uuid().optional(),
	userId: z.string().min(1, "User ID is required"),
	storyUuid: z.string().uuid("Invalid story UUID"),
	createdAt: z.date().optional(),
	text: z.string().min(1, "Scene text is required"),
	actions: actionsSchema.optional(),
	selectedAction: selectedActionSchema.optional()
}) satisfies z.ZodType<SceneInsert>

export const sceneInsertSchema = z.object({
	uuid: z.string().uuid().optional(),
	userId: z.string(),
	storyUuid: z.string().uuid(),
	createdAt: z.date().optional(),
	text: z.string(),
	actions: z.array(z.string()).optional(),
	selectedAction: z.number().optional()
}) satisfies z.ZodType<SceneInsert>