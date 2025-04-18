import { db } from "@/lib/database/client"
import { type SceneInsert, scenes } from "@/lib/database/schema"
import { getErrorMessage } from "@/lib/error-message"
import { parseZodSchema } from "@/lib/zod/parse"
import { actionsSchema, selectedActionSchema } from "@/lib/zod/scene"
import { eq } from "drizzle-orm"
import { ResultAsync } from "neverthrow"
import type { z } from "zod"

export const insertScene = (scene: SceneInsert) =>
	ResultAsync.fromPromise(db.insert(scenes).values(scene), (e) =>
		getErrorMessage(e, "Failed to insert scene")
	)

export const setActions = (props: {
	storyId: string
	actions: z.infer<typeof actionsSchema>
}) => {
	const result = parseZodSchema(actionsSchema, props.actions)

	if (result.isErr()) return result.error

	return ResultAsync.fromPromise(
		db
			.update(scenes)
			.set({ actions: result.value })
			.where(eq(scenes.storyUuid, props.storyId)),
		(e) => getErrorMessage(e, "Failed to set actions")
	)
}

export const setSelectedAction = (props: {
	storyId: string
	selectedAction: z.infer<typeof selectedActionSchema>
}) => {
	const result = parseZodSchema(selectedActionSchema, props.selectedAction)

	if (result.isErr()) return result.error

	return ResultAsync.fromPromise(
		db
			.update(scenes)
			.set({ selectedAction: result.value })
			.where(eq(scenes.storyUuid, props.storyId)),
		(e) => getErrorMessage(e, "Failed to set selected action")
	)
}
