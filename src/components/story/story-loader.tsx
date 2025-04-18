"use client"

import { StoryTinker } from "@/components/story/story-thinger"
import { api } from "@/components/trpc-provider"
import { NOT_FOUND_ERROR } from "@/lib/error-message"

export const StoryLoader = (props: { uuid: string }) => {
	const { data, isPending, error } = api.story.getStoryByUuid.useQuery(
		{
			uuid: props.uuid
		},
		{
			retry: (failureCount, error) => {
				if (error.data?.code === NOT_FOUND_ERROR) return false
				return failureCount < 3
			}
		}
	)

	if (isPending) return <div>Loading...</div>
	if (error) {
		if (error.data?.code === NOT_FOUND_ERROR) {
			return <StoryTinker uuid={props.uuid} />
		}
		return <div>Errors: {error.data?.code}</div>
	}

	return <StoryTinker uuid={props.uuid} story={data} />
}
