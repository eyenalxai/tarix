"use client"

import { api } from "@/components/trpc-provider"

export const Story = (props: { uuid: string }) => {
	const { data, isPending, error } = api.story.getStoryByUuid.useQuery({
		uuid: props.uuid
	})

	if (isPending) return <div>Loading...</div>
	if (error) return <div>Errors: {error.data?.code}</div>

	return <div>Story</div>
}
