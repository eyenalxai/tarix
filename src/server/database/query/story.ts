import { getErrorMessage } from "@/lib/error-message"
import type { Transaction } from "@/server/database/client"
import { stories } from "@/server/database/schema"
import { and, eq } from "drizzle-orm"
import { ResultAsync } from "neverthrow"

export const storyNotFoundError = "STORY_NOT_FOUND"

export const getStoryByUuid = (
	tx: Transaction,
	props: {
		uuid: string
		userId: string
	}
) =>
	ResultAsync.fromPromise(
		tx.query.stories.findFirst({
			where: and(
				eq(stories.uuid, props.uuid),
				eq(stories.userId, props.userId)
			),
			with: {
				scenes: true
			}
		}),
		(e) => getErrorMessage(e, "Failed to get story")
	)

export const getStories = (tx: Transaction, props: { userId: string }) =>
	ResultAsync.fromPromise(
		tx.query.stories.findMany({ where: eq(stories.userId, props.userId) }),
		(e) => getErrorMessage(e, "Failed to get stories")
	)
