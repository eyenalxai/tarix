import type { SceneInsert, SceneSelect } from "@/server/database/schema"
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

const sceneBaseSchema = z.object({
	uuid: z.string().uuid(),
	userId: z.string(),
	storyUuid: z.string().uuid(),
	createdAt: z.date(),
	text: z.string(),
	actions: z.array(z.string()).nullable(),
	selectedAction: z.number().nullable()
})

export const sceneSchema = sceneBaseSchema.required({
	uuid: true,
	userId: true,
	storyUuid: true,
	createdAt: true,
	text: true
}) satisfies z.ZodType<SceneSelect>

export const sceneInsertSchema = sceneBaseSchema
	.pick({
		storyUuid: true,
		text: true
	})
	.extend({
		actions: z.array(z.string()).optional(),
		selectedAction: z.number().optional()
	}) satisfies z.ZodType<Omit<SceneInsert, "userId">>
