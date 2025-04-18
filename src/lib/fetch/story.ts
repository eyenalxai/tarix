import { getErrorMessage } from "@/lib/error-message"
import { api } from "@/lib/fetch/fetcher"
import { storySchema } from "@/lib/zod/story"
import { ResultAsync } from "neverthrow"

export const fetchStory = (uuid: string) =>
	ResultAsync.fromPromise(
		api("/api/story", {
			method: "get",
			schema: storySchema,
			searchParams: { uuid }
		}),
		(e) => getErrorMessage(e, "Failed to fetch story")
	)
