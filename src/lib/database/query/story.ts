import { db } from "@/lib/database/client"
import { stories } from "@/lib/database/schema"
import { getErrorMessage } from "@/lib/error-message"
import { and, eq } from "drizzle-orm"
import { ResultAsync, errAsync, okAsync } from "neverthrow"

export const storyNotFoundError = "STORY_NOT_FOUND"

export const getStoryByUuid = (props: {
	uuid: string
	userId: string
}) =>
	ResultAsync.fromPromise(
		db.query.stories.findFirst({
			where: and(
				eq(stories.uuid, props.uuid),
				eq(stories.userId, props.userId)
			),
			with: {
				scenes: true
			}
		}),
		(e) => getErrorMessage(e, "Failed to get story")
	).andThen((story) => {
		if (!story) return errAsync(storyNotFoundError)
		return okAsync(story)
	})
