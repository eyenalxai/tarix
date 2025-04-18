import { getErrorMessage } from "@/lib/error-message"
import { parseZodSchema } from "@/lib/zod/parse"
import { actionsSchema, selectedActionSchema } from "@/lib/zod/scene"
import type { Transaction } from "@/server/database/client"
import { type SceneInsert, scenes } from "@/server/database/schema"
import { eq } from "drizzle-orm"
import { ResultAsync, errAsync } from "neverthrow"
import type { z } from "zod"

export const insertScene = (tx: Transaction, scene: SceneInsert) =>
	ResultAsync.fromPromise(tx.insert(scenes).values(scene), (e) =>
		getErrorMessage(e, "Failed to insert scene")
	)

export const setActions = (
	tx: Transaction,
	props: {
		storyId: string
		actions: z.infer<typeof actionsSchema>
	}
) => {
	const result = parseZodSchema(actionsSchema, props.actions)

	if (result.isErr()) return errAsync(result.error)

	return ResultAsync.fromPromise(
		tx
			.update(scenes)
			.set({ actions: result.value })
			.where(eq(scenes.storyUuid, props.storyId)),
		(e) => getErrorMessage(e, "Failed to set actions")
	)
}

export const setSelectedAction = (
	tx: Transaction,
	props: {
		storyId: string
		selectedAction: z.infer<typeof selectedActionSchema>
	}
) => {
	const result = parseZodSchema(selectedActionSchema, props.selectedAction)

	if (result.isErr()) return errAsync(result.error)

	return ResultAsync.fromPromise(
		tx
			.update(scenes)
			.set({ selectedAction: result.value })
			.where(eq(scenes.storyUuid, props.storyId)),
		(e) => getErrorMessage(e, "Failed to set selected action")
	)
}
