"use client"

import { Scene } from "@/components/story/scenes"
import { api } from "@/components/trpc-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { storyWithScenesSchema } from "@/lib/zod/story"
import { useState } from "react"
import type { z } from "zod"

export const StoryTinker = (props: {
	uuid: string
	story?: z.infer<typeof storyWithScenesSchema>
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

	const { mutate: insertScene } = api.scene.insert.useMutation({
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
				22
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

	if (!props.story.scenes)
		return (
			<Scene
				description={props.story.description}
				scene={props.story.scenes[0]}
				onFinish={(message) => {
					insertScene({
						storyUuid: props.uuid,
						text: message
					})
				}}
			/>
		)

	return (
		<Scene
			description={props.story.description}
			scene={props.story.scenes[0]}
			onFinish={(message) => {
				insertScene({
					storyUuid: props.uuid,
					text: message
				})
			}}
		/>
	)
}
