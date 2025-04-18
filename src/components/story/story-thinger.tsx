"use client"

import { api } from "@/components/trpc-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { storySchema } from "@/lib/zod/story"
import { useState } from "react"
import type { z } from "zod"

export const StoryTinker = (props: {
	uuid: string
	story?: z.infer<typeof storySchema>
}) => {
	const [description, setDescription] = useState("")
	const utils = api.useUtils()

	const { mutate: insertStory, isPending } = api.story.insertStory.useMutation({
		onSuccess: () => {
			utils.story.getStoryByUuid.invalidate()
		},
		onError: (error) => {
			console.error(error)
		}
	})

	if (!props.story) {
		return (
			<div>
				<Input
					placeholder="asdasd"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Button
					disabled={isPending}
					onClick={() => {
						insertStory({ description, uuid: props.uuid })
					}}
				>
					Create
				</Button>
			</div>
		)
	}

	return <div>Story Tinker</div>
}
