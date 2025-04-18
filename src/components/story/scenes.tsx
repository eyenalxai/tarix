"use client"

import type { sceneSchema } from "@/lib/zod/scene"
import { useChat } from "@ai-sdk/react"
import { useEffect } from "react"
import type { z } from "zod"

export const Scene = (props: {
	description: string
	scene?: z.infer<typeof sceneSchema>
	onFinish?: (message: string) => void
}) => {
	const { messages, handleSubmit } = useChat({
		api: "/api/generate/scene",
		initialMessages: [
			{
				id: "1",
				role: "system",
				content: `Generate a scene for the following description: ${props.description}`
			}
		],
		initialInput: `I want to generate a scene for the following description: ${props.description}`,
		onFinish(message) {
			if (props.onFinish) props.onFinish(message.content)
		}
	})

	useEffect(() => {
		if (props.scene) return
		handleSubmit()
	}, [handleSubmit, props.scene])

	if (props.scene) return <div>{props.scene.text}</div>

	const lastMessageContent = messages[messages.length - 1].content ?? ""

	return <div>{lastMessageContent}ss</div>
}
